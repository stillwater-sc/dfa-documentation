+++
weight = 7
title = "Domain Flow"
date = "2017-02-15T06:58:22-05:00"

WebGLRenderTarget = true
IndexSpaceVisualization = true
RenderTargetName = "index_space_view"

tags = [ "domain-flow", "matrix-multiply", "index-space", "lattice" ]
categories = [ "domain-flow", "introduction" ]
series = [ "introduction" ]

+++

# Domain Flow

Domain flow is an abstract parallel programming model that is invariant to technology changes.

An equation {{< math >}}$c = a \oplus b${{< /math >}} is comprised of a computation phase, 
the {{< math >}}$\oplus${{< /math >}},
and a communication phase, the {{< math >}}$=${{< /math >}}.

Implementation technology will impact these phases differently, and we are seeking a programming model 
that is invariant to the difference. A thought experiment will shed light on the desired properties of such a model. 

In the extreme, if the two delays are very different, then the physical execution will either be computation-bound,
or communication-bound. In either case, there is limited concurrency.
If our technology delivers a ten-fold improvement in computation time, any dependent computational event needs 
to come ten times closer to maintain the same balance. If the communication phase does not improve, 
the computation resource will now be 90% idle as it is waiting for operands to be delivered. 
Our 10x technology improvement in computational performance would deliver only a 2x system-level improvement.

Maximum concurrency emerges when the two delays are similar and can overlap each other. 
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

One such computational spacetime that is uniform in all directions is the Cartesian lattice, 
{{< math >}}$\mathbb{N}^3${{< /math >}}.
And the design of a domain flow algorithm is the act of finding an efficient embedding of the 
computational graph of the single assignment form in the Cartesian lattice, {{< math >}}$\mathbb{N}^c${{< /math >}}.

Back to our matrix multiply; we can now reinterpret the domain flow algorithm as an embedding.
Each index range, that is, the {{< math >}}$i, j, k${{< /math >}} in the constraint set, can be seen as a dimension in 
the Cartesian lattice. The index tag, such as {{< math >}}$[i,j,k]${{< /math >}}, is a location in the lattice.

This is what the lattice for matmul looks like for a given N:

<canvas id="c"></canvas>

<div id="index_space_view"></div>

