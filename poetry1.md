@def hascode = true
@def title = "How to make a Python package using Poetry"

- Create a `pyproject.toml` file in a directory (with comments)

```
[tool.poetry]
name = "siva-poetry"
version = "2.0.0"
description = "Simple project"
authors = ["siva"]
packages = [
    { include = "siva_poetry", from = "src" },
]
# provide packages from `src` directory

[tool.poetry.dependencies]
python = "^3.7"
pendulum = "^2.0"
pyyaml = "^5.1"
# `poetry add pendulum` to add a dependency to current project

[tool.poetry.dev-dependencies]
pytest = "^3.0"

[tool.poetry.scripts]
# You can directly call the symbol `get_time` because it is exported using __init__.py.
start_pendulum = "siva_poetry:get_time"

[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"

```


- Every python script you write should be ideally a package
- `Poetry` makes it easy to create and distribute packages
- Use `__init__.py` to tell if it's a package or not
- When the module is imported by other packages, `__init__.py` starts first.
- To run the module as a script, create a `__main__.py` file in the root folder of your module
- To publish the package to PyPI, `poetry publish` after authenticating poetry with PyPI credentials

## Directory structure
- Use `src` folder and put packages in that folder
- Put `config` inside the `src/siva_poetry` folder 
- Add `os.chdir(os.path.dirname(__file__))` to package initialization script. Otherwise, `config` files are not read
- Surprisingly, no config change for tests are required. They work as is.

## Installation
- Build using `poetry build`
- `pip install dist/siva_poetry-1.0.0-py3-none-any.whl` to install to your local machine
- Start a new terminal session and execute `python -m siva_poetry`. You can look at the code location and verify that all the required files are present.
- `poetry publish` to publish to PyPI

## Testing
- Install before testing using `poetry install -v`
- Run the tests using `poetry run pytest tests/`
- `poetry run` before any command runs the package in current pyenv environment created by poetry.

## Run the script
- To run the module as a script (before installing), go to the root folder containing `pyproject.toml` and run `python -m siva_poetry`. This is the best way for debugging (before installing)
- Because the `__main__.py` is present in the code files, you can to run the module as a script using `poetry run python -m siva_poetry`


## Additional files in the tarball/whl
- Put all the relevant files into the model folder inside the package, then all the files will be put together.


Directory structure

```
.
├── README.rst
├── dist
│   ├── siva-poetry-2.0.0
│   │   ├── PKG-INFO
│   │   ├── pyproject.toml
│   │   ├── setup.py
│   │   └── src
│   │       └── siva_poetry
│   │           ├── __init__.py
│   │           ├── __main__.py
│   │           ├── config
│   │           │   └── cities.yaml
│   │           ├── model
│   │           │   └── data.pickle
│   │           └── simple.py
│   ├── siva-poetry-2.0.0.tar.gz
│   └── siva_poetry-2.0.0-py3-none-any.whl
├── poetry.lock
├── pyproject.toml
├── siva_poetry.egg-info
│   ├── PKG-INFO
│   ├── SOURCES.txt
│   ├── dependency_links.txt
│   ├── entry_points.txt
│   ├── requires.txt
│   └── top_level.txt
├── src
│   └── siva_poetry
│       ├── __init__.py
│       ├── __main__.py
│       ├── config
│       │   └── cities.yaml
│       ├── model
│       │   └── data.pickle
│       └── simple.py
└── tests
    ├── __init__.py
    └── test_siva_poetry.py
```