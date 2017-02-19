+++
next = "/introduction/nextsteps"
prev = "/introduction/freeschedule"
weight = 7
title = "Linear (Constrained) Schedules"
date = "2017-02-15T07:24:38-05:00"
toc = true
webglrendertarget = true
LinearScheduleVisualization = true
RenderTargetName = "linearschedule_animation"
+++

<canvas id="c"></canvas>

In the previous section, we saw what the computational evolution of an unconstrained domain flow algorithm looks like.
However, an actual physical system wouldn't have infinite resources, and certainly not infinite bandwidth.

The free schedule of a parallel algorithm tends to be unrealizable.

Let's go through the thought experiment what the free schedule demands from a physical system.
In the free schedule animation, the propagation recurrences distributing the $A$ and $B$ matrix elements
throughout the 3D lattice run 'ahead' of the actual computational recurrence calculating the $C$ matrix
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

<div id="linearschedule_animation">_</div>

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
