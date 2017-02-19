+++
weight = 3
title = "Domain Flow"
date = "2017-02-15T06:58:22-05:00"
toc = true
next = "/introduction/freeschedule"
prev = "/introduction/example"
WebGLRenderTarget = true
IndexSpaceVisualization = true
RenderTargetName = "index_space_view"
+++

To appreciate domain flow algorithms and what they enable, you need to think about the physical
form a 'program evaluator', or processor, could take. In the days when a processor occupied the volume
of a small room, any physical computational machine was limited to a single computational element.
This implied that the execution of any algorithm had to be specified as a complete order in time.
At each step of the execution, the computational element would need to read the input operands, execute
an instruction, and write the results back. The reading and writing of operands was from and to a
Random Access Memory.

This sequential approach has been very successful, as it is a general purpose mechanism to execute
any algorithm. But it is not the most energy efficient approach to execute all algorithms. This is
the niche that domain flow fills: algorithms that exhibit complex, inherently parallel, but geometrically
constrained concurrency patterns offer the opportunity to be evaluated in a more energy efficient manner.
The venerable matrix multiply is a good introduction to this class of algorithms,
more formally defined by the term _systems of affine recurrence equations_.

To arrive at the underlying execution model of domain flow algorithms, we take the other extreme compared
to fully sequential execution.

Remember, nodes in the graph represent computational events, and links in the graph represent information exchanges.
Imagine that we have as many computational resources as there are nodes in the single assignment form
computational graph. In that case, we can simple 'embed' the computational graph in 3D space.
However, since a physical machine that would be able to evaluate a node in the graph will have
some physical extent, a collection of physical nodes will fill 3D space in some 'regular', crystalline
pattern. Or if we are conceptualizing the space presented by a VLSI chip's surface, it will be a 2D space.
These crystalline patterns are typically referred to as a _lattice_, and thus
the design of a domain flow algorithm is the act of finding space, time, and energy efficient embeddings
of some computational graph in N-dimensional space.

Back to our matrix multiply; we can now reinterpret the domain flow algorithm as a physical embedding.
Each index range, that is, the $i$, $j$, and $k$ in the constraint set, can be seen as a dimension in 3D space.
The index tag, such as $[i,j,k]$, is a location in 3D space, more accurately,
a location in the 3D Cartesian lattice, $\mathbb{N}^3$.

This is what the lattice for matmul looks like for a given N:

<canvas id="c"></canvas>

<div id="index_space_view"></div>

