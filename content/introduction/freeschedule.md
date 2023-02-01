+++
weight = 8
title = "Free Schedule"
date = "2017-02-15T07:24:38-05:00"

WebGLRenderTarget = true
FreeScheduleVisualization = true
RenderTargetName = "freeschedule_animation"

tags = [ "domain-flow", "matrix-multiply", "free-schedule" ]
categories = [ "domain-flow", "schedule" ]
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
the parallel algorithm is better off using a different mathematical basis for its solution to reduce operand
movement. These are so-called communication-avoiding parallel algorithms [(Hoemmen)](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2010/EECS-2010-37.pdf).
Other approaches, such as, Iso Geometric Analysis (IGA) in next generation finite element and finite volume methods
use higher-order methods to increase the computation to operand bandwidth ratio of the compute kernels thus
reducing the data movement requirements of the execution [(G+SMO)](https://github.com/gismo/gismo/wiki/About--G-Smo).

Instead, the domain flow specification only specifies the data dependencies inherent to the algorithm: 
the partial order will _*evolve*_ from these constraints. In other words, it is an emergent behavior.
If we present a domain flow algorithm with infinite resources and instantaneous access to its inputs, 
then the computational activity of the specification would evolve in what is called the _free schedule_.

The free schedule for our matrix multiply is visualized in the following, interactive, simulation:

<div id="freeschedule_animation">_</div>

We see the activity wavefront of the {{< math >}}$a${{< /math >}} recurrence (blue), the 
{{< math >}}$b${{< /math >}} recurrence (purple), and the {{< math >}}$c${{< /math >}} recurrence (red) 
evolve through space and time.

The {{< math >}}$a${{< /math >}} recurrence is defined by the recurrence equation: 
{{< math >}}$a: a[i,j-1,k]${{< /math >}} 
is independent of both {{< math >}}$b${{< /math >}} and {{< math >}}$c${{< /math >}}. The computational 
wavefront represents the computational event set: {{< math >}}$a[i,j,k] = a[i,j-1,k]${{< /math >}}
and will evolve along the {{< math >}}$[0,1,0]${{< /math >}} direction.

Similarly, the {{< math >}}$b${{< /math >}} recurrence, defined by the equation: 
{{< math >}}$b: b[i-1,j,k]${{< /math >}} 
is independent of {{< math >}}$a${{< /math >}} and {{< math >}}$c${{< /math >}} and the
computational wavefront evolves along the {{< math >}}$[1,0,0]${{< /math >}} direction.

The {{< math >}}$c${{< /math >}} recurrence, however, does depend on both {{< math >}}$a${{< /math >}} and
{{< math >}}$b${{< /math >}}, as well as on its own previous values. The _free_ schedule
that the {{< math >}}$c${{< /math >}} recurrence evolves into is a wavefront that moves along the 
{{< math >}}$[1,1,1]${{< /math >}} direction. The {{< math >}}$a${{< /math >}} and {{< math >}}$b${{< /math >}} values
will arrive 'early' at a {{< math >}}$[i,j,k]${{< /math >}} lattice location, and as the {{< math >}}$c${{< /math >}} values arrive, 
the recurrence equation for {{< math >}}$c${{< /math >}}, shown below, will trigger: 

{{< math >}}$c: c[i,j,k-1] + a[i,j-1,k] * b[i-1, j, k]${{< /math >}}


