+++
prev = "/ch3-design/elements"
weight = 3
title = "Time: the when"
next = "/ch3-design/space"
toc = true
date = "2017-02-15T07:48:27-05:00"

+++
The _free schedule_ represents the inherent concurrency of the parallel algorithm, and, under the assumption
of infinite resources, it is the fastest schedule possible.

Let _x_ be a computation that uses _y_ as input, then the _free schedule_ is defined as:
{{< math >}}
\begin{equation}
  T(x) =\begin{cases}
    1, & \text{if y is an external input}\\
    1 + max(T(y)) & \text{otherwise}
  \end{cases}
\end{equation}
{{< /math >}}

The _free schedule_ is defined at the level of the individual operations. 
It does not provide any information about the global data movement or the
global structure of the interactions between data and operation.
Moreover, the above equation describes a logical sequencing of operations,
it does not specify a physical evolution.

It is cumbersome to use the _free schedule_ to derive the global structure
of the computational activity, as you fundamentally need to evaluate the
free schedule equation on the domain of computation. 
In  general, the concurrency inherent to an algorithm as defined by affine
or uniform recurrence equations is _dimensionally_ smaller, that is, if the
embedding of the system of equations requires _N_ dimensions, the concurrency
is typically strictly less than _N_.
This implies that the algorithm could be executed with full concurrency
on a much smaller physical machine that supports the global structure of the
wavefront of activity. 

We need this global structure of the activity to derive and
select effective spatial reductions. 

Karp, Miller, and Winograd related the free schedule of a particular class
of algorithms with a simpler order called a _linear schedule_. This
provides a concise description of the global activity of a single variable
uniform recurrence equation.

We can extend that framework to work with systems of uniform recurrence
equations (SURE). And we can bring the class of algorithms described by systems
of affine recurrence equations into this SURE framework by transforming
the affine transformations into propagations. The affine maps typically
represent gathers (reductions) and scatters (broadcasts), and these
affine transformations can be made uniform by using uniform dependencies
to propagate the values through the index space.

Whereas it is sufficient to solve a single linear program to determine
if a single variable uniform recurrence is explicitly defined, the
procedure to test computability of a system of equations requires an
iterative decomposition of the dependence graph into strongly connected
components. 

A directed graph is called _strongly connected_ if any two distinct
vertices lie in a common cycle. A _strongly connected component_ of a
directed graph is a strongly connected subgraph not properly contained
in any other strongly connected subgraph. A directed graph may contain
several strong components, and each vertex lies in exactly one strongly
connected component.

We can decompose the graph representing the system of uniform recurrence 
equations in a hierarchy of strongly connected components as follows:
create a root node of the tree containing the orginal dependence graph.
Determine the strongly connected components of _G_ and create a child for
the root for each strong component. Then apply a zero-weight cycle
search procedure on each of the strongly connected components and
create children for each of the subgraphs that are produced, adding
new levels to the tree for each new decomposition. At each step
of the decomposition, two or more disjoint cycles are separated.
Obviously, the procedure will terminate as the dependence graph _G_
has a finite number of edges.

The number of vertices in the longest path of the decomposition tree
is called the depth of the tree, and is related to the inherent 
parallelism of the algorithm. Karp, Miller, and Winograd provide
a proof that bounds the free schedule for each of the subgraphs
that reside in the nodes of the decomposition tree. They use
this bound to quantify the amount of parallelism in the algorithm.
Their goal was to create a complexity hierarchy of parallel
algorithms based on inherent concurrency. Unfortunately, this did
not pan out because the computational domain impacts this parallelism
and the theoretical complexity did not relate to any practical
benefits.

However, the derivation of feasible schedules given a system of
recurrence equations has practical application for the design
of optimal computational data paths. The Domain Flow model
uses the Karp, Miller, and Winograd piecewise linear scheduling
construction to sequence activity wavefronts.
