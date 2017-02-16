+++
weight = 1
title = "An Example"
date = "2017-02-15T07:00:21-05:00"
toc = true
next = "/introduction/physical"
prev = "/introduction/introduction"

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
computational dependencies that implicitly define a partial order. 

For example, we can't execute the result for c[i,j,k] until we have computed the result for c[i,j,k-1].

From an algorithm design perspective, an explicit dependency allows us to 'order' the
computational graph. This can be done in time, as is customary in sequential programming, where
we treat the dependency as an opportunity to sequence computations so that they can be executed
by a single computational unit that is reused over and over again. But for parallel algorithms, we can also
use this dependency to order the computational events in space. From the parallel design perspective,
we are looking for (partial) orders where independent computational events are physically separated
in space.

If we look back again at the domain flow algorithm of matrix multiply, we observe that all results
are assigned to a unique variable. This is called Single Assignment Form, and this yields a
computational graph that makes all computational dependencies explicit.

The second observation is that the computational events are made unique with a variable name and
an index tag, such as [i,j,k]. Thirdly, dependencies between computational events are specified
by an index expression, such as [i,j-1,k].
