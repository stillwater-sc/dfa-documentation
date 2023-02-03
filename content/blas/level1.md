+++

weight = 5
title = "BLAS Level 1"
date = "2017-02-15T07:55:08-05:00"

+++

BLAS Level 1 are {{< math >}}$\mathcal{O}(N)${{< /math >}} class operators. This makes these operators operand access limited 
and thus require careful distribution in a parallel environment.

There are four basic vector operations, and a fifth convenience operators.
Let {{< math >}}$ \alpha \in \Bbb{R}, x \in \Bbb{R^n}, y \in \Bbb{R^n}, z \in \Bbb{R^n}$${{< /math >}} then:

 1. _*vector scale*_: scalar-vector multiplication: {{< math >}}$z = \alpha x \implies (z_i = \alpha x_i)${{< /math >}}
 2. _*vector element addition*_: {{< math >}}$z = x + y \implies (z_i = x_i + y_i)${{< /math >}}
 3. _*vector element multiply*_: {{< math >}}$z = x * y \implies (z_i = x_i * y_i)${{< /math >}}
 4. _*vector dot product*_: {{< math >}}$c = x^Ty \implies ( c = \sum_{i = 1}^n x_i y_i ) ${{< /math >}}, aka inner-product
 5. _*saxpy*_, or _scalar alpha x plus y_, {{< math >}}$z = \alpha x + y \implies z_i = \alpha x_i + y_i ${{< /math >}}
 
The fifth operator, while technically redundant, makes the expressions of linear algebra algorithms 
more concise.

One class of domain flow programs for these operators assumes a linear distribution of the vectors, 
and propagation recurrences for scalar entities. For the dot product, we also use a propagation 
recurrence to produce the scalar result.

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
