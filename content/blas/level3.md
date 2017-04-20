+++
prev = "/blas/level2"
weight = 15
title = "BLAS Level 3"
date = "2017-02-15T07:55:23-05:00"
toc = true
next = "/factorization"

+++

BLAS Level 3 are $\mathcal{O}(N^3)$ operators, and finally compute bound creating many opportunities to optimize
operand resuse.

In addition to matrix-matrix multiply there are the Rank-k update operators, which are outer products and matrix additions.
Here is a Hermitian Rank-k update:

$$ C = \alpha A A^T + \beta C, \space where \space C \space is \space Hermitian. $$

A Hermitian matrix is defined as a matrix that is equal to its Hermitian conjugate. In other words, 
the matrix C is Hermitian if and only if $C = C^H$. Obviously a Hermitian matrix must be square. Hermitian matrices
can be understood as the complex extension of real _symmetric_ matrices.

# Matrix-matrix multiply

We have seen this algorithm in the introduction:

```

compute ( (i,j,k) | 1 <= i,j,k <= N ) {
    a: a[i,j-1,k]
    b: b[i-1,j,k]
    c: c[i,j,k-1] + a[i,j-1,k] * b[i-1,j,k]
}
    
```

# Hermitian Rank-k update

Starting from a single matrix, generating the transpose is a very expensive operator. For simplicity, let's start
with the computational phase $\alpha A A^T$.

```

compute ( (i,j,k) | 1 <= i,j,k <= N ) {
    a: a[i,j-1,k]
    at: at[i-1,j,k]
    if k = 1 {
        c: beta[i,j,k-1] * c[i,j,k-1] + a[i,j-1,k] * b[i-1,j,k]
    } else {
        c: c[i,j,k-1] + a[i,j-1,k] * b[i-1,j,k]
    }
}
    
```

Here we introduce a conditional constraint that impacts the domain of computation for a set of equations.

