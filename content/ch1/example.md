+++

weight = 2
title = "An Example"
date = "2017-02-15T07:00:21-05:00"
toc = true

tags = [ "domain-flow", "algorithm", "matrix-multiply" ]
categories = [ "domain-flow", "introduction" ]
series = [ "introduction" ]

+++

Let's look at a simple, but frequently used operator in Deep Learning inference: 
dense matrix multiplication. 
A Domain Flow program <sup>[1](#derivation)</sup> for this operator is shown below:

```verbatim
compute ( (i,j,k) | 1 <= i,j,k <= N ) {
    a: a[i,j-1,k]
    b: b[i-1,j,k]
    c: c[i,j,k-1] + a[i,j-1,k] * b[i-1,j,k]
} 
```

The underlying algorithm requires a domain of computation governed by a set of constraints, and a set 
of computational dependencies that implicitly define a partial order across all the operations in the
computation. The partial order is readily visible in the need to have computed the result for 
{{< math >}}$c[i,j,k-1]${{< /math >}} before the computation
of {{< math >}}$c[i,j,k]${{< /math >}} can commence.
In contrast, the {{< math >}}$a${{< /math >}} and {{< math >}}$b${{< /math >}} recurrences are 
independent of each other.

From a design perspective, an explicit dependency enables us to _order_ the nodes in a computational graph. 
This can be done in time, as is customary in sequential programming: the sequence of
instructions is a constraint to order the operations in time and enable an unambiguious semantic 
interpretation of the value of a variable even though that variable may be reused.
Parallel algorithms offer more degrees of freedom to order the computational events. In addition to 
sequential order, we must also disambiguate variables in space as variables that occupy the 
same location represent resource contention. Any physical execution machine would need to provide a
mechanism to sequence that resource contention, increasing complexity and slowing down the execution.

The key design objective for high-performant parallel computation is to find
partial orders, [posets](https://en.wikipedia.org/wiki/Partially_ordered_set), 
where independent computational events are spatially separated, and dependent events are spatially 'close'. 

If we look back at the domain flow code of matrix multiply, we observe that all results
are bound to a unique variable. This is called *Static Single Assignment Form* (SSA). 
Such a graph that makes all computational dependencies explicit.

The second observation is that the computational events are made unique with a variable name and 
an index tag, represented by {{< math >}}$[i,j,k]${{< /math >}}. 
The constraint set: {{< math >}}$compute \; (\quad (i,j,k) \quad | \quad 1 <= i,j,k <= N \;)${{< /math >}}, 
carves out a subset in the lattice {{< math >}}$N^3${{< /math >}}, 
and the body defines the computational events at each of the lattice points 
{{< math >}}$[i,j,k]${{< /math >}} contained in the subset.

Thirdly, dependencies between computational events are specified by an index expression.
The statement {{< math >}}$a: a[i,j-1,k]${{< /math >}} is a shorthand for 
{{< math >}}$a[i,j,k] := a[i,j-1,k]${{< /math >}},
defining a dependency to the value at {{< math >}}$[i,j-1,k]${{< /math >}} for each lattice point 
where the variable {{< math >}}$a${{< /math >}} is defined.

A thorough understanding of the partial and total orders inherent in the
parallel computation is essential for finding optimal domain flow algorithms. 

High-performance, low-power execution patterns frequently involve a partial order that enables 
timely reuse of computational results, or creates flexibility to organize just-in-time arrival 
of input operands to avoid memory elements. 

In the next segment, let's explore these execution patterns.

<a name="derivation">1</a>: [Derivation of Domain Flow Matmul](https://stillwater-sc.github.io/domain-flow/introduction/derivation)</a>
