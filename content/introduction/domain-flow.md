+++
weight = 3
title = "Parallel Programming"
date = "2017-02-15T06:58:22-05:00"
toc = true
next = "/introduction/computational-spacetime"
prev = "/introduction/example"
WebGLRenderTarget = true
IndexSpaceVisualization = true
RenderTargetName = "index_space_view"

tags = [ "domain flow algorithm", "matrix-multiply", "index-space", "lattice" ]
categories = [ "domain flow", "introduction" ]
series = [ "introduction" ]

+++

To appreciate the domain flow programming model and what it enables, you need to think about the physical
form a 'program evaluator' could take. In the days when a processor occupied the volume
of a small room, any physical computational machine was limited to a single computational element.
This implied that the execution of any algorithm had to be specified as a complete order in time.
At each step of the execution, the computational element would read input operands, execute
an instruction, and write a result. The reading and writing of operands was from and to some storage mechanism.

This sequential approach has been very successful, as it is a general purpose mechanism to execute
_any_ algorithm. But it is not the most efficient approach to execute _all_ algorithms. This is
the niche that domain flow fills: algorithms that exhibit complex, inherently parallel, but geometrically
constrained concurrency patterns. These algorithms offer the opportunity to be evaluated more efficiently 
by taking advantage of the regularity of movement of collections of data elements, dubbed _domains_.
The venerable matrix multiply (matmul) is a good introduction to this class of algorithms,
more formally defined by the term _systems of affine recurrence equations_. Matmul is so regular that the affine
index transformation is the identity matrix: matmul can be expressed as a system of regular recurrence equations.

The Domain Flow programming model was invented in the late 80's to solve the problem of parallel algorithm
dependence on the structure of the underlying hardware. This period generated many new and wonderful parallel
machines:

  1. [Transputer](https://en.wikipedia.org/wiki/Transputer)
  2. Hypercubes from [nCUBE](https://en.wikipedia.org/wiki/NCUBE) and Intel
  3. the first SMPs of [Sequent](https://en.wikipedia.org/wiki/Sequent_Computer_Systems) and NUMA innovations,
  4. the first massively parallel machines, CM-1 and CM-2 from [Thinking Machines](https://en.wikipedia.org/wiki/Thinking_Machines_Corporation)

The software engineers tasked to write high-performance libraries for these machines discovered the inconvenient
truth about programming for high-performance: the characteristics of the hardware drive the structure of the optimal
algorithm. The best algorithm for our matrix multiply example has four completely different incarnations for the
machines mentioned above. Furthermore, the optimal algorithm even changes when the same machine architecture introduces
a new, typically faster, implementation. And we are not just talking about simple algorithmic changes, such as 
loop order or blocking, sometimes even the underlying mathematics needs to change. Given the complexity of 
writing parallel algorithms, this one-off nature of parallel algorithm design begged the question: is there a 
parallel programming model that is invariant to the implementation technology of the machine?

