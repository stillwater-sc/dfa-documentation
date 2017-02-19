+++
next = "/introduction/nextsteps"
prev = "/introduction/example"
weight = 3
title = "Physical Execution"
date = "2017-02-15T07:24:38-05:00"
toc = true

+++

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
or higher-order methods in finite element and finite volume methods to increase the computation to communication ratio
of the kernels.

Instead, the domain flow specification only specifies the data dependencies
inherent to the algorithm: the partial order will simply _*evolve*_ from these constraints.
If we would present a domain flow algorithm with infinite resources and instantaneous access to its inputs, 
then the computational activity of the specification would evolve in what is called the _free schedule_.

The free schedule for our matrix multiply is visualized in the following simulation:

<div id="wavefront_view_1">_</div>

What we see here are the activity wavefronts of the $a$ recurrence (blue), the $b$ recurrence (purple), and the $c$ recurrence (red).
The $a$ recurrence was defined by the recurrence equation: $$a: a[i,j-1,k]$$.
It is independent of either $b$ or $c$ and the computational wavefront represents the computational event: $$a[i,j,k] = a[i,j-1,k]$$
and will evolve along the $[0,1,0]$ direction.

Similarly, the $b$ recurrence, defined by the equation: $$b: b[i-1,j,k]$$, is also independent of $a$ or $c$ and the
computational wavefront evolves along the $[1,0,0]$ direction.

The $c$ recurrence, however, does depend on both $a$ and $b$, as well as on its own previous values. The _free_ schedule
that the $c$ recurrence evolves into is a wavefront that moves along the $[1,1,1]$ direction. The $a$ and $b$ values
will arrive 'early' at a $[i,j,k]$ lattice location, and as the $c$ values arrive, the recurrence equation:
$$c: c[i,j,k-1] + a[i,j-1,k] * b[i-1, j, k]$$
will execute. 

But a physical system wouldn't have infinite resources, and certainly not infinite bandwidth.
The free schedule of a parallel algorithm tends to be unrealizable.
Let's go through the thought experiment what the free schedule requires of a physical system.
In the free schedule animation, the propagation recurrences distributing the A and B matrix elements
throughout the 3D lattice run 'ahead' of the actual computational recurrence calculating the C matrix
elements.
The A and B elements arrive at their destination earlier than the time they are consumed by a
computational event. A physical system would need to have memory to hold these early operands until
all of the operands are present and the computation can commence. The extra memory required to hold
these operands is consuming area and energy and thus an attribute that an algorithm designer
would want to optimize out of the system.

Looking more closely at the wavefront that expresses the evolution of the C matrix elements, we
can observe that the wavefront evolves as a 2D plane with normal $[1 1 1]^T$.
This implies that if we <i>constrain</i> the A and B propagations to evolve along this same wavefront
then all memory requirements would disappear as we deliver the A and B matrix elements just in time
to participate in the computational event:
 
 $$c: c[i,j,k-1] + a[i,j-1,k] * b[i-1, j,k]$$.

This constrained, _linear_ schedule is shown in the next animation.

<div id="wavefront_view_2">_</div>

This particular schedule is called _memoryless_, that is, no memory is required to execute along this
evolution. Another way to look at this is that the memory function is provided by the network and the act of
communicating operands between locations in the lattice. From an energy perspective, this is attractive as
no additional energy is required to read or write from scratch memories that are needed just to align operand
timing. As mentioned before, the operands are delivered to the computation in a just-in-time manner.

Another observation we can make is that this memoryless, linear schedule exhibits $O(N^2)$
concurrency. The index space is $O(N^3)$, but the concurrency of the algorithm is just
$O(N^2)$. This implies that we can create a custom execution engine for
this execution pattern that only uses $O(N^2)$ resources and still would be unconstrained.

If we compare the concurrency requirements of the free schedule with our memoryless, linear schedule we
see that the free schedule exhibits resource requirements of the order of $O(N^3)$:
the A and B recurrences race ahead of the computation and occupy resources as they are waiting for the
computation to consume them. The free schedule is interesting from a theoretical perspective as it
shows us the unconstrained evolution, or inherent concurrency, of the algorithm. But for building an
actual, efficient computational engine, the free schedule tends to be too expensive.
