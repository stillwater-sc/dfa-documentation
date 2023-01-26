+++
weight = 1
title = "An Example"
date = "2017-02-15T07:00:21-05:00"
toc = true
next = "/introduction/parallel-programming"
prev = "/introduction/"

tags = [ "domain flow algorithm", "matrix-multiply" ]
categories = [ "domain flow", "introduction" ]
series = [ "introduction" ]

+++

Let's look at an example of a simple, but frequently used operator: dense matrix multiplication. A Domain Flow program is shown below:

```

compute ( (i,j,k) | 1 <= i,j,k <= N ) {
    a: a[i,j-1,k]
    b: b[i-1,j,k]
    c: c[i,j,k-1] + a[i,j-1,k] * b[i-1,j,k]
}
    
```	

The underlying algorithm requires a domain of computation governed by a set of constraints, and a set of
computational dependencies that implicitly define a partial order across all the operations in the computation. 
The partial order is readily visible in the need to have computed the result for $c[i,j,k-1]$ before the computation
of $c[i,j,k]$ can commence, whereas the $a$ and $b$ recurrences are independent of each other.

From a design perspective, an explicit dependency enables us to 'order' the nodes in a computational graph. 
This can be done in time, as is customary in sequential programming: the sequence of
instructions is a constraint to order the operations in time and enable an unambiguious semantic interpretation
of the value of a variable even though that variable may be reused.
Parallel algorithms offer more degrees of freedom to order the computational events. In addition to sequential
order, we can also disambiguate variables in space. For high-performant parallel computation,
we are looking for partial orders, or $posets$, where independent computational events are spatially separated
in space, and where dependent events are spatially 'close'. 

If we look back again at the domain flow code of matrix multiply, we observe that all results
are assigned to a unique variable. This is called *Single Assignment Form* (SAF), and this yields a
computational graph that makes all computational dependencies explicit.

The second observation is that the computational events are made unique with a variable name and an index tag, 
represented by $[i,j,k]$. 
The constraint set $$compute ( (i,j,k) | 1 <= i,j,k <= N )$$ carves out a subset in the lattice $\mathbb{N}^3$, 
and the body defines the computational events at each of the lattice points $[i,j,k]$ contained in the subset.

Thirdly, dependencies between computational events are specified by an index expression.
The statement $a: a[i,j-1,k]$ is a shorthand for $$a: a[i,j,k] => a[i,j,k] = a[i,j-1,k]$$
defining a dependency to the value at $[i,j-1,k]$ for each lattice point where the variable $a$ is defined.

The concepts of partial and total orders are essential for finding optimal domain flow algorithms. 
[Poset](https://en.wikipedia.org/wiki/Partially_ordered_set) are the
source of potentially interesting solutions to high-performance, low-power execution patterns. 

