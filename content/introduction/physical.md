+++
next = "/introduction/nextsteps"
prev = "/introduction/example"
weight = 3
title = "Physical Execution"
date = "2017-02-15T07:24:38-05:00"
toc = true

+++

We alluded to the fact that inherently-parallel algorithms exhibit some partial order and not a total order
because the instructions that can execute independently do not have any explicit order among each other.
This extra degree of freedom is another benefit domain flow algorithms exhibit over sequential algorithms.
It allows the execution engine to organize any resource contention in a more energy, space, or time efficient way,
as long the machine does not violate the dependency	relationships specified in the algorithm.

Typically, the complete order defined by sequential algorithms over-constrains the execution order, and
parallelizing compilers can't recover the inherent dependency structure of the mathematics behind the algorithm,
leading to disappointing speed-ups. This is a fundamental limitation to trying to generate parallel
execution models from sequential specifications.

Instead, the domain flow specification removes this over-constraint and only expresses the data dependencies.
If we would present the algorithm with instantaneous access to its inputs, then the
data dependencies inherent to the algorithm would evolve in what is called the free schedule.

The free schedule for our matrix multiply is visualized in the following simulation:

<div id="wavefront_view_1">_</div>

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
can observe that the wavefront evolves as a 2D plane with normal <i>[1 1 1]<sup>T</sup></i>.
This implies that if we <i>constrain</i> the A and B propagations to evolve along this same wavefront
then all memory requirements would disappear as we deliver the A and B matrix elements just in time
to participate in the computational event c: c[i,j,k] + a[i,j-1,k] * b[i-1, j,k].

This constrained, <i>linear</i> schedule is shown in the next animation.

<div id="wavefront_view_2">_</div>

This particular schedule is called <i>memoryless</i>, that is, no memory is required to execute along this
evolution. Another way to look at this is that the memory function is provided by the network and the act of
communicating operands between locations in the lattice. From an energy perspective, this is attractive as
no additional energy is required to read or write from scratch memories that are needed just to align operand
timing. As mentioned before, the operands are delivered to the computation in a just-in-time manner.

Another observation we can make is that this _memoryless_, linear schedule exhibits <i>O(N<sup>2</sup>)</i>
concurrency. The index space is <i>O(N<sup>3</sup>)</i>, but the concurrency of the algorithm is just
<i>O(N<sup>2</sup>)</i>. This implies that we can create a custom execution engine for
this execution pattern that only uses <i>O(N<sup>2</sup>)</i> resources and still would be unconstrained.

If we compare the concurrency requirements of the free schedule with our memoryless, linear schedule we
see that the free schedule exhibits resource requirements of the order of <i>O(N<sup>3</sup>)</i>:
the A and B recurrences race ahead of the computation and occupy resources as they are waiting for the
computation to consume them. The free schedule is interesting from a theoretical perspective as it
shows us the unconstrained evolution, or inherent concurrency, of the algorithm. But for building an
actual, efficient computational engine, the free schedule tends to be too expensive.