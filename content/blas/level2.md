+++
weight = 10
title = "BLAS Level 2"
date = "2017-02-15T07:55:18-05:00"
toc = true
next = "/blas/level3"
prev = "/blas/level1"

+++

BLAS Level 2 are $\mathcal{O}(N^2)$ class operators, typically still very much operand access limited as we
need to fetch multiple operands per operation without any reuse. The core operator is the matrix-vector multiplication
in all its different forms specialized for matrix shape, such as triangular, banded, symmetric,
and matrix type integer, real, complex, conjugate, or Hermitian.

Let $A \in \Bbb{R^{mxn}}$, the matrix-vector product is defined as:
$$z = Ax, \space where \space x \in \Bbb{R^n}$$

The typical approach is to evaluate the dot products:
$$z\_i = \sum\_{j=1}^n a\_{ij}x\_i$$
And in a parallel environment, all these dot products are independent and conceivably could be evaluated at the same time.
However, the distribution of the vector $x$ is not instantaneous, and in a balanced computation/communication
architecture, we can use a propagation recurrence to distribute the vector across the matrix $A$.

# Matrix-vector multiplication

``` 
compute ( (i,j,k) | 1 <= i,j <= N, k = 1 ) {
    x: x[i,j-1,k]
    z: a[i,j,k-1] * x[i,j-1,k]
}
```

Banded, symmetric, and triangular versions simply alter the constraint set of the domains of computation: the 
fundamental dependencies do not change.