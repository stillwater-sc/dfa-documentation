+++
prev = "/design/dfa"
weight = 4
title = "Time: the when"
next = "/design/space"
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
equations. And we can bring the class of algorithms described by systems
of affine recurrence equations into this new framework by transforming
the affine transformations into propagations. The affine maps typically
represent gathers (reductions) and scatters (broadcasts), and these
affine transformations can be made uniform by using uniform dependencies
to propagate the values through the index space.
