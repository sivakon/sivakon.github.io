---
title: Gaussian process and Bayesian optimization
summary: Optimization, sampling and gaussian processes
date: 2020-04-15
---

This should be pasted in [upmath](https://upmath.me) to get all the latex equations in SVG format for posting on svbtle blog. I use mathpix notes because it syncs all my snips and I can insert raw images served from Mathpix CDN.

## Motivation behind these optimization techniques

For many optimization problems, function evaluations can be quite expensive. For example, deep learning parameters may require a week of GPU training. A common approach to build a _surrogate model_, which is a model of the optimization problem that can be efficiently optimized in lieu of the true objective function. Further evaluations of the true objective function can be used to improve the model. Fitting such models requires an initial set of points

## Sampling plans

These are sampling plans for covering the search space when we have limited resources. 

### Full factorial

The _full factorial_ sampling plan places a grid of evenly spaced points over the search space. This approach is easy to implement, does not rely on randomness, and covers the space, but it uses a large number of points. Sampling grid is bounded as shown in the picture

![image](https://cdn.mathpix.com/snip/images/0vpLGVPhZB1DnjFeZUd7XPn03bpK17u0ZbIMdYpBuPM.original.fullsize.png)

**Exponentially increase design points when the dimensionality high.**

### Random sampling 

Draw m random samples over the design space.


A uniform projection plan is a sampling plan over a discrete grid where the dis- tribution over each dimension is uniform.

![image](https://cdn.mathpix.com/snip/images/o_0tCEn2Rb6fSu52cE72G_lRFSC69D1wjyN1d1vE_M0.original.fullsize.png)

### Stratified sampling

An $m \times m$ grid could miss important information due to systematic regularities. Cells are sampled at a point chosen uni- formly at random from within the cell rather than at the cell’s center

![image](https://cdn.mathpix.com/snip/images/hchZo2Qlz8EyP5bTXzv3vrly-u_VYjYSio_LuyLoPw0.original.fullsize.png)

There are several other sampling plans. We skip for now.
