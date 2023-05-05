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
    alpha: alpha[i-1,j,k]
    z: alpha[i-1,j,k] * x[i,j-1,k]  
}
```
Here the vector _x_ being scaled is presented in space at the location _[i,0,1]_. 
The scalar factor _alpha_ is presented in space at _[0,1,1]_ and is the propagated across 
the vector elements in the _+i_ direction.

Assume for the moment that we only have nearest neighbor communications, then the
broadcast of the scale factor _alpha_ can be implemented in the form of a propagation.
It is the schedule of the broadcast that will determine the available concurrency
of this operator. In the description above, we have a completely sequential execution
schedule due to the propagation broadcast of the scaling factor.

# vector addition

``` 
compute ( (i,j,k) | 1 <= i <= N, j = 1, k = 1 ) {
    z: x[i,j-1,k] + y[i,j,k-1]    
}
```
In this articulation, the _x_ vector is presented in space at location _[i,0,1]_, and
the _y_ vector at location _[i,1,0]_. In this layout, there is no contention nor any
dependency between input elements, and this operator would be fully concurrent, and
would complete in a single step. The trick of course is that getting both vectors
distributed to that location to enable that concurrency. This speaks to the problem
of 'chaining' operators together in such a way that the output of a vector generating
operator would deposit a vector spatially aligned for the next operator. 

This is the first incling of the concept of _domain flow_. Vectors, matrices, and tensors
are all aggregate data structures that typically _move_ through the machine as a
structured entity under the constraints of some _domain_ specification: defined
by the _compute()_ clause in the examples shown so far.

# vector multiplication

``` 
compute ( (i,j,k) | 1 <= i <= N, j = 1, k = 1 ) {
    z: x[i,j-1,k] * y[i,j,k-1]    
}
```
Element-wise vector multiplication follows the same domain structure as vector addition,
only the arithmetic operator switches from addition to multiplication.

# dot product

``` 
compute ( (i,j,k) | 1 <= i <= N, j = 1, k = 1 ) {
    x: x[i,j-1,k]
    y: y[i,j,k-1]
    z: x[i,j-1,k] * y[i,j,k-1] + z[i-1,j,k]    
}
```
Using the same domain and vector layout as the element-wise vector addition described
previously, we can now construct a _dot_, or inner-product, operator. The _x_ and _y_
vector elements come in from the _-j_ and _-k_ direction, and the starting or previous
partial result _z0_ comes in from _[0,1,1]_.

Here we observe that even though the input vectors domain flow is entirely unconstrained,
the evolution of the _dot_ product execution is completely sequential, caused by 
the _z_ partial sum propagating in the _+i_ direction.

For the scale vector operator, we observe a similar serialization dynamic as the
inner-product operator, but in that operator the serialization is caused by having 
to 'broadcast' the scalar value across the spatial domain of the _x_ vector. 


# SAXPY

``` 
compute ( (i,j,k) | 1 <= i <= N, j = 1, k = 1 ) {
    alpha: alpha[i-1,j,k]
    z: alpha[i-1,j,k] * x[i,j-1,k] + y[i,j,k-1]    
}
```

The final _scalar alpha x plus y_, or _saxpy_ operator is combining the vector scale
and vector addition operators, and will show the same constraint as the vector scale
operator due to the required propagation broadcast of the scaling factor.
