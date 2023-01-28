+++

title = "Linear Schedules"
date = "2017-02-15T07:24:38-05:00"
toc = true

weight = 9
next = "/introduction/derivation"
prev = "/introduction/freeschedule"


webglrendertarget = true
LinearScheduleVisualization = true
RenderTargetName = "linearschedule_animation"

tags = [ "domain flow algorithm", "matrix-multiply", "linear-schedule" ]
categories = [ "domain flow", "schedule" ]
series = [ "introduction" ]

+++

<canvas id="c"></canvas>

In the previous section, we saw what the computational evolution of an unconstrained parallel algorithm looks like.
However, an actual physical system would have finite resources, and certainly limited operand bandwidth.

*The free schedule of a parallel algorithm tends to be unrealizable as the size of the problem grows.*

Let's go through the thought experiment what the free schedule demands from a physical system.
In the free schedule animation, the propagation recurrences distributing the $A$ and $B$ matrix elements
throughout the 3D lattice run 'ahead' of the actual computational recurrence calculating the $C$ matrix
elements.

The *A* and *B* matrix elements arrive at their destination earlier than when they are consumed. 
A physical system would need to have memory to hold these operands until
all of the operands are present and the computation can commence. The extra memory required to hold
these operands is consuming space and energy; 
attributes an algorithm designer would want to optimize.

Looking more closely at the wavefront that expresses the evolution of the *C* matrix elements, we
can observe that the wavefront evolves as a two-dimensional plane with normal $[1 1 1]^T$.
This implies that if we _constrain_ the *A* and *B* propagation to evolve along this same wavefront
then all memory requirements would disappear as we deliver the matrix elements just in time
to participate in the computational event:
 
 $$c: c[i,j,k-1] + a[i,j-1,k] * b[i-1, j,k]$$.

This constrained, _linear_ schedule is shown in the next animation.

<div id="linearschedule_animation">_</div>

This particular schedule is called _memoryless_, that is, no memory is required to execute along this
evolution. Another way to look at this is that the memory function is provided by the network and the act of
communicating operands between locations in the lattice. From an energy perspective, this is attractive as
no additional energy is required to read or write from scratch memories that are needed just to align operand
timing. As mentioned before, the operands are delivered to the computation when they can be consumed.

Another observation we can make is that this memoryless, linear schedule exhibits $O(N^2)$
concurrency. The index space is $O(N^3)$, but the concurrency of the algorithm is just
$O(N^2)$. This implies that we can create a custom execution engine for
this execution pattern that only uses $O(N^2)$ resources and still would be unconstrained.

If we compare the concurrency requirements of the free schedule with our memoryless, linear schedule we
see that the free schedule exhibits resource requirements of the order of $O(N^3)$:
the $a$ and $b$ recurrences race ahead of the computation and occupy resources as they are waiting for the
computation to consume them. The free schedule is interesting from a theoretical perspective as it
shows us the unconstrained evolution, or inherent concurrency, of the algorithm. But for building an
actual, efficient computational engine, the free schedule tends to be too expensive. The exception, of course,
is when the size of the problem matches the number of hardware resources available. In these cases, 
we can instantiate the complete computational graph in hardware. This is not uncommon for signal processing
applications, and clever pipelining of multiple problems on the same hardware can improve utilization.
