+++
weight = 6
title = "Computational Spacetime"
date = "2017-02-15T06:58:22-05:00"

WebGLRenderTarget = true
SpacetimeVisualization = true
RenderTargetName = "spacetime_view"

tags = [ "domain-flow", "matrix-multiply", "index-space", "lattice", "computational-spacetime" ]
categories = [ "domain-flow", "introduction" ]
series = [ "introduction" ]

+++

# Computational Spacetime

Data movement in a parallel machine experiences the constraints of spacetime and more. The propagation delay
in a communication channel acts similarly as the constraint on the speed of light in spacetime. Let's bring back
the mental model of a parallel machine being a fixed graph in space with communication channels connecting a set
of nodes. The channels of communication constrain the propagation directions for information exchange. If we make
the assumption that computation and communication are separate steps and that they can be overlapped to hide 
the latency of the communication phase, then we can leverage the mental model of spacetime to argue about 
partial orders of computational events that might be able to effect each other. We call this the
_computational spacetime_ of the machine. An operand cannot be delivered to remote destination unless 
it falls inside the future cone of the computational spacetime outlined by the distance an operand 
can travel along the communication channels in some unit of time.

This dynamic is shown in the following animation: the expanding time horizon of a computational event 
will be able to trigger dependent computations at a distance.

<div id="spacetime_view" style="text-align:center">
    <canvas id="c" width="800" hight="800" style="border:1px solid #000000;">browser doesn't support canvas tags</canvas>
</div>


As designers, we have the option to try to compute more, and thus take more time, to broaden the computational 
spacetime cone and be able to exchange information to nodes that are farther away. 
This is the act of blocking algorithms if you are an algorithm designer,
and it is the act of building big processors with lots of storage if you are a computer designer. But we also
have the option to compute less, and organize the operands in space so that they fall in the future cone of
the computational event. That is the foundation of designing domain flow algorithms, and building fine-grain 
computational fabrics. 

Neither of these approaches is a panacea for parallel computation for the simple reason that different algorithms
have different bottlenecks. Some are compute-bound, in which case the efficiency of computation will govern the
optimal algorithm. And others are communication-bound, in which case the efficiency of information exchange is
the deciding factor. Examples of communication-bound algorithms are sorting, and similar complete information
exchanges such as min/max and normalize. Sometimes, a few big nodes with big communication pipes
is the best organization, and sometimes, a network of tightly-coupled multiply-add functional units is better.
However, if you are looking for energy efficiency, smaller tends to be better.

