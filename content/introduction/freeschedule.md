+++
next = "/introduction/linearschedule"
prev = "/introduction/domain-flow"
weight = 5
title = "Free Schedule"
date = "2017-02-15T07:24:38-05:00"
toc = true
WebGLRenderTarget = true
FreeScheduleVisualization = true
RenderTargetName = "freeschedule_animation"

tags = [ "domain flow algorithm", "matrix-multiply", "free-schedule" ]
categories = [ "domain flow", "schedule" ]
series = [ "introduction" ]

+++

<canvas id="c"></canvas>

We alluded to the fact that inherently-parallel algorithms exhibit some partial order, and not a total order,
because the instructions that can execute independently do not have any explicit order among each other.
This extra degree of freedom is another benefit domain flow algorithms exhibit over sequential algorithms.
It allows the execution engine to organize any resource contention in a more energy, space, or time efficient way,
as long the machine does not violate the dependency	relationships specified in the algorithm.

Typically, the complete order defined by sequential algorithms over-constrains the execution order, and
parallelizing compilers can't recover the inherent dependency structure of the mathematics behind the algorithm,
leading to disappointing speed-ups. This is a fundamental limitation to trying to generate parallel
execution models from sequential specifications. Secondly, as we'll see shortly, the best parallel algorithms
may organize their computation differently as compared to a sequential algorithm. There are even cases where
a parallel algorithm is better off using a different mathematical basis for its solution to reduce operand
movement [communication-avoiding linear algebra](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2010/EECS-2010-37.pdf),
or higher-order methods in finite element and finite volume methods to increase the computation to operand bandwidth ratio
of the kernels.

Instead, the domain flow specification only specifies the data dependencies
inherent to the algorithm: the partial order will simply _*evolve*_ from these constraints.
If we would present a domain flow algorithm with infinite resources and instantaneous access to its inputs, 
then the computational activity of the specification would evolve in what is called the _free schedule_.

The free schedule for our matrix multiply is visualized in the following, interactive, simulation:

<div id="freeschedule_animation">_</div>

We see the activity wavefronts of the $a$ recurrence (blue), the $b$ recurrence (purple), and the $c$ recurrence (red)
evolve through space and time.

The $a$ recurrence was defined by the recurrence equation: $$a: a[i,j-1,k]$$
It is independent of either $b$ or $c$ and the computational wavefront represents the computational event: $$a[i,j,k] = a[i,j-1,k]$$
and will evolve along the $[0,1,0]$ direction.

Similarly, the $b$ recurrence, defined by the equation: $$b: b[i-1,j,k]$$ is also independent of $a$ or $c$ and the
computational wavefront evolves along the $[1,0,0]$ direction.

The $c$ recurrence, however, does depend on both $a$ and $b$, as well as on its own previous values. The _free_ schedule
that the $c$ recurrence evolves into is a wavefront that moves along the $[1,1,1]$ direction. The $a$ and $b$ values
will arrive 'early' at a $[i,j,k]$ lattice location, and as the $c$ values arrive, the recurrence equation:
$$c: c[i,j,k-1] + a[i,j-1,k] * b[i-1, j, k]$$
will trigger. 

