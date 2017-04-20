+++
date = "2017-02-15T07:55:08-05:00"
toc = true
next = "/blas/level2"
prev = "/blas/"
weight = 5
title = "BLAS Level 1"

+++

BLAS Level 1 are $\mathcal{O}(N)$ class operators. This makes these operators operand access limited 
and thus require careful distribution in a parallel environment.

There are four basic vector operations, and a fifth convenience operators.
Let $ \alpha \in \Bbb{R}, x \in \Bbb{R^n}, y \in \Bbb{R^n}$ then:

 1. scalar-vector multiplication: $z = \alpha x \space (z\_i = \alpha x\_i)$
 2. vector addition: $z = x + y \space (z\_i = x\_i + y\_i)$
 3. dot product: $c = x^Ty \space ( c = \sum\_{i = 1}^n x\_i y\_i ) $, aka inner-product
 4. vector multiply: $z = x .* y \space (z\_i = x\_i * y\_i)$
 5. $saxpy$, or _scalar alpha x plus y_, $z = \alpha x + y \implies z\_i = \alpha x\_i + y\_i $
 
The fifth operator, while technically redundant, makes the expressions of linear algebra algorithms more productive.

One class of domain flow programs for these operators assumes a linear distribution of the vectors, and propagation
recurrences for scalar entities. For the dot product, we also use a propagation recurrence to produce the scalar
result.

# scalar-vector multiplication

``` 
compute ( (i,j,k) | 1 <= i <= N, j = 1, k = 1 ) {
    alpha: alpha[i-1,j,k)
    z: alpha[i-1,j,k] + z[i,j-1,k)    
}
```

# vector addition

``` 
compute ( (i,j,k) | 1 <= i <= N, j = 1, k = 1 ) {
    z: x[i,j-1,k] + y[i,j,k-1)    
}
```

# dot product

``` 
compute ( (i,j,k) | 1 <= i <= N, j = 1, k = 1 ) {
    x: x[i,j-1,k]
    y: y[i,j,k-1]
    z: x[i,j,k] + y[i,j,k)    
}
```

# vector multiplication

``` 
compute ( (i,j,k) | 1 <= i <= N, j = 1, k = 1 ) {
    alpha: alpha[i-1,j,k)
    z: alpha[i-1,j,k] * x[i,j-1,k)  
}
```

# SAXPY

``` 
compute ( (i,j,k) | 1 <= i <= N, j = 1, k = 1 ) {
    alpha: alpha[i-1,j,k)
    z: alpha[i-1,j,k] * x[i,j-1,k) + y[i,j,k-1)    
}
```
