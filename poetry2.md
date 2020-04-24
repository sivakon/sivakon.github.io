@def hascode = true
@def title = "Packaging python using Poetry on Google Cloud"

Intended workflow

- Create/edit code
- Write tests
- Commit changes
- Cloud build trigger (automated testing step)

Preferred way of creating packages

- Step 1: Create docker image with poetry and the app code. Look at the sample dockerfile in the repo

```
FROM python:3.7-alpine3.7

ENV PIP_DISABLE_PIP_VERSION_CHECK=on

RUN pip install poetry

WORKDIR /app
COPY . /app

RUN poetry config settings.virtualenvs.create false && \
    poetry install -v --no-interaction --no-ansi

RUN python -m poetry_tutorial
```

- You can push this image to Google Container Registry for futher use. But in this example, we don't need to. We will only use this image for creating the package
- Step 2: Use this created image to create the package. All this does is to run `poetry build` inside the container in the working directory. Look at `Dockerfile WORKDIR`. This creates two files, `tar.gz` and `whl` files in the `dist` directory
- We can upload these files directly to Cloud Storage bucket for distribution. Look at the `artifacts` section in the build file.
```
    steps:
    - name: 'docker'
      args: ["build", "-t", "gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest", "."] #step1
    - name: 'gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest'
      args: ['poetry', 'build'] #step2
    artifacts:
      # images: ['gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest']
      objects:
        location: 'gs://your-bucket/python_packages/'
        paths: ['dist/*']
```
- Create an additional step (step 2) that only builds when all the tests have passed like this

```
...
    - name: 'gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest'
      args: ['poetry', 'run', 'pytest','tests/'] #testing before building
...
```

## For deploying python app in a Kubernetes cluster

- Add an extra step at the end of cloud build file
```
...
    - name: 'gcr.io/cloud-builders/gke-deploy'
      args:
      - run
      - --filename=gke_deployment.yaml
      - --image=gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest
      - --location=<region>
      - --cluster=<cluster-name>
...
```

## Publishing to Private PyPI
- Create a private PyPI hosted on Google App Engine using [this](https://github.com/ml2grow/GAEPyPI)
- In the build step, add several commands that should run in the same container (or use a bash script). This is required for using Poetry to upload your built package to private PyPI

```
    poetry config settings.virtualenvs.create false
    poetry config repositories.gcp https://<PROJECT_ID>.appspot.com/
    poetry config http-basic.gcp <USERNAME> <PASSWORD>
    poetry publish -r gcp --build
```
- Put this in bash file and run this as an extra step, to publish to PyPI instead of Kubernetes deployment

```
...
    - name: 'gcr.io/travelmlog/poetry-tutorial-publisher:latest' #publish step
      args: ['sh', 'publish.sh']
...
```

- Username, password of your PyPI should be setup accordingly. Refer to [this](https://github.com/ml2grow/GAEPyPI/blob/master/config.json) link. Remember to use `sha1` hashed password [here](https://github.com/ml2grow/GAEPyPI/blob/master/config.json#L9)


## Caveats:
- If you setup Cloud build trigger on commit, make sure to always run `poetry version` to bump the version up. Otherwise, private PyPI does not accept same version package twice.

Intended workflow

- Create/edit code
- Write tests
- Commit changes
- Cloud build trigger (automated testing step)

Preferred way of creating packages

- Step 1: Create docker image with poetry and the app code. Look at the sample dockerfile in the repo

```
FROM python:3.7-alpine3.7

ENV PIP_DISABLE_PIP_VERSION_CHECK=on

RUN pip install poetry

WORKDIR /app
COPY . /app

RUN poetry config settings.virtualenvs.create false && \
    poetry install -v --no-interaction --no-ansi

RUN python -m poetry_tutorial
```

- You can push this image to Google Container Registry for futher use. But in this example, we don't need to. We will only use this image for creating the package
- Step 2: Use this created image to create the package. All this does is to run `poetry build` inside the container in the working directory. Look at `Dockerfile WORKDIR`. This creates two files, `tar.gz` and `whl` files in the `dist` directory
- We can upload these files directly to Cloud Storage bucket for distribution. Look at the `artifacts` section in the build file.
```
    steps:
    - name: 'docker'
      args: ["build", "-t", "gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest", "."] #step1
    - name: 'gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest'
      args: ['poetry', 'build'] #step2
    artifacts:
      # images: ['gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest']
      objects:
        location: 'gs://your-bucket/python_packages/'
        paths: ['dist/*']
```
- Create an additional step (step 2) that only builds when all the tests have passed like this

```
...
    - name: 'gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest'
      args: ['poetry', 'run', 'pytest','tests/'] #testing before building
...
```

## For deploying python app in a Kubernetes cluster

- Add an extra step at the end of cloud build file
```
...
    - name: 'gcr.io/cloud-builders/gke-deploy'
      args:
      - run
      - --filename=gke_deployment.yaml
      - --image=gcr.io/<PROJECT_ID>/poetry_tutorial_builder:latest
      - --location=<region>
      - --cluster=<cluster-name>
...
```

## Publishing to Private PyPI
- Create a private PyPI hosted on Google App Engine using [this](https://github.com/ml2grow/GAEPyPI)
- In the build step, add several commands that should run in the same container (or use a bash script). This is required for using Poetry to upload your built package to private PyPI

```
    poetry config settings.virtualenvs.create false
    poetry config repositories.gcp https://<PROJECT_ID>.appspot.com/
    poetry config http-basic.gcp <USERNAME> <PASSWORD>
    poetry publish -r gcp --build
```
- Put this in bash file and run this as an extra step, to publish to PyPI instead of Kubernetes deployment

```
...
    - name: 'gcr.io/travelmlog/poetry-tutorial-publisher:latest' #publish step
      args: ['sh', 'publish.sh']
...
```

- Username, password of your PyPI should be setup accordingly. Refer to [this](https://github.com/ml2grow/GAEPyPI/blob/master/config.json) link. Remember to use `sha1` hashed password [here](https://github.com/ml2grow/GAEPyPI/blob/master/config.json#L9)


## Caveats:
- If you setup Cloud build trigger on commit, make sure to always run `poetry version` to bump the version up. Otherwise, private PyPI does not accept same version package twice.
