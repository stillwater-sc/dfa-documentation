+++
weight = 1
title = "An Example"
date = "2017-02-15T07:00:21-05:00"
toc = true
next = "/introduction/domain-flow"
prev = "/introduction/"

tags = [ "domain flow algorithm", "matrix-multiply" ]
categories = [ "domain flow", "introduction" ]
series = [ "introduction" ]

+++

Let's look at an example of a simple, but valuable operator: dense matrix multiplication.

A Domain Flow Algorithm for matrix multiply is shown here:

```

compute ( (i,j,k) | 1 <= i,j,k <= N ) {
    a: a[i,j-1,k]
    b: b[i-1,j,k]
    c: c[i,j,k-1] + a[i,j-1,k] * b[i-1,j,k]
}
    
```	

This algorithm defines a domain of computation governed by a set of constraints, and a set of
computational dependencies that implicitly define a partial order across all the operations in the computation. 

For example, we can't execute the result for $c[i,j,k]$ until we have computed the result for $c[i,j,k-1]$.

From a design perspective, an explicit dependency allows us to 'order' the nodes in a
computational graph. This can be done in time, as is customary in sequential programming. Here, the dependency 
is a constraint so that all operations can be executed by a single computational unit that is reused over and over again. 
Parallel algorithms also offer the opportunity to order the computational events in space. For high-performant 
and energy efficient parallel computation,
we are looking for partial orders, or $posets$, where independent computational events are physically separated
in space.

{{% notice note %}}
The concepts of partial and total orders are essential for finding optimal domain flow algorithms. 
[Poset](https://en.wikipedia.org/wiki/Partially_ordered_set) are the
source of potentially interesting solutions to high-performance, low-power execution patterns. 
{{% /notice %}}

If we look back again at the domain flow code of matrix multiply, we observe that all results
are assigned to a unique variable. This is called *Single Assignment Form* (SAF), and this yields a
computational graph that makes all computational dependencies explicit.

The second observation is that the computational events are made unique with a variable name and an index tag, 
such as $[i,j,k]$. 
The constraint set $$compute ( (i,j,k) | 1 <= i,j,k <= N )$$ carves out a subset in the lattice $\mathbb{N}^3$, 
and the body defines the computational events at each of the lattice points $[i,j,k]$ contained inthe subset.

Thirdly, dependencies between computational events are specified by an index expression.
 The statement $a: a[i,j-1,k]$ 
is a shorthand for $$a: a[i,j,k] => a[i,j,k] = a[i,j-1,k]$$
defining a dependency to the value at $[i,j-1,k]$ for each lattice point where the variable $a$ is defined.


