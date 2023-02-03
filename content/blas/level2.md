+++
weight = 10
title = "BLAS Level 2"
date = "2017-02-15T07:55:18-05:00"
toc = true
next = "/blas/level3"
prev = "/blas/level1"

+++

BLAS Level 2 are {{< math >}}$\mathcal{O}(N^2)${{< /math >}} class operators, still operand access
limited as we need to fetch multiple operands per operation without any reuse. 
The core operator is the matrix-vector multiplication in all its different forms specialized for 
matrix shape --- triangular, banded, symmetric ---, and matrix type --- integer, real, complex, 
conjugate, or Hermitian ---.

Let {{< math >}}$A \in \Bbb{R^{mxn}}${{< /math >}}, the matrix-vector product is defined as:
{{< math >}}$$z = Ax, \space where \space x \in \Bbb{R^n}$${{< /math >}}

The typical approach is to evaluate the dot products:

{{< math >}}$$z_i = \sum_{j=1}^n a_{ij}x_i$${{< /math >}}

And in a parallel environment, all these dot products are independent and conceivably could be 
evaluated at the same time. However, the distribution of the vector {{< math >}}$x${{< /math >}} 
is not instantaneous, and in a balanced computation/communication architecture, we can use a 
propagation recurrence to distribute the vector across the rows of the matrix {{< math >}}$A${{< /math >}}.

# Matrix-vector multiplication

``` 
compute ( (i,j,k) | 1 <= i,j <= N, k = 1 ) {
    x: x[i,j-1,k]
    z: a[i,j,k-1] * x[i,j-1,k]
}
```

Banded, symmetric, and triangular versions simply alter the constraint set of the domains of 
computation: the fundamental dependencies do not change.