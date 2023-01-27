+++
weight = 7
title = "Domain Flow"
date = "2017-02-15T06:58:22-05:00"
toc = true
next = "/introduction/freeschedule"
prev = "/introduction/computational-spacetime"
WebGLRenderTarget = true
IndexSpaceVisualization = true
RenderTargetName = "index_space_view"

tags = [ "domain flow algorithm", "matrix-multiply", "index-space", "lattice", "domain flow" ]
categories = [ "domain flow", "introduction" ]
series = [ "introduction" ]

+++

The goal of domain flow was to create an abstract programming model that is invariant to technology changes.
We discussed the fact that an equation $c = a + b$ is comprised of a computation phase and a communication phase.
Implementation technology will impact these phases differently, and we want a programming model that is invariant
to the actual delays. Again, a thought experiment will shed light on the progression and ultimate state of such a system. 
Because we know that technology impacts computation delay and communicate delay differently, we have decided to think of 
computational progressions as alternating computation and communication phases, and to overlap these two phases as
to improve performance and utilization of the resources. If our technology delivers
a ten-fold improvement in computation time, this would imply that any dependent computational event needs to come ten times 
closer to maintain the same balance. If that technology change leaves the communication
phase the same, all we would have accomplished is that the computation resource is now 90% idle, as it is waiting for
the results to be delivered. Our ten-fold technology bump in computational performance would deliver just a 
$(2.0-1.1)/2.0 = 45\%$ system-level improvement. 

This thought experiment should elucidate the fact that making the computation, or the communication phase, faster
independent of each other leads to low utilization of one of the resources, and is thus unattractive from an engineering perspective. 
When the computation and communication phases are balanced we can deliver 100% resource
utilization and maximum concurrency: all the electrons in the system are wiggling to affect some result. 

Now, imagine that we have as many computational resources as there are nodes in the computational graph. 
In that case, we could simply embed the computational graph in free space.
However, a physical machine will have some physical extent, and a collection of manufactured computational nodes will 
fill free space in some 'regular', crystalline pattern.
These crystalline patterns are typically referred to as a _lattice_. When engineering these structures, we can
balance the computation and communication delays through simple area-time trade-offs. This presents the invariance
we are seeking. Independent of technology, we can always engineer a machine that offers balance between 
computation and communication delays, and that offers connectivity among nodes that fall within the future cone of the 
computational spacetime.
One such computational spacetime that is uniform in all directions is the Cartesian lattice, $\mathbb{N}^3$.
 
The design of a domain flow algorithm is the act of finding an efficient embedding of the computational graph of
the single assignment form in the Cartesian lattice, $\mathbb{N}^c$.

Back to our matrix multiply; we can now reinterpret the domain flow algorithm as an embedding.
Each index range, that is, the $i$, $j$, and $k$ in the constraint set, can be seen as a dimension in the Cartesian lattice.
The index tag, such as $[i,j,k]$, is a location in the lattice.

This is what the lattice for matmul looks like for a given N:

<canvas id="c"></canvas>

<div id="index_space_view"></div>

