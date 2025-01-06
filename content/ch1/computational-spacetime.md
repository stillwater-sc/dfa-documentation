+++
weight = 6
title = "Computational Spacetime"
date = "2017-02-15T06:58:22-05:00"

WebGLRenderTarget = true
ExpandingWavefrontViz = true

tags = [ "domain-flow", "matrix-multiply", "index-space", "lattice", "computational-spacetime" ]
categories = [ "domain-flow", "introduction" ]
series = [ "introduction" ]

+++
<style>
#c {
    float: bottom;
    padding: 5px;
    width: 800px;
    height: 600px;
}
</style>

Data movement in a parallel machine is constrained by propagation delay. The propagation delay
in a communication channel acts similarly as the constraint on the speed of light in spacetime. 
Think back to the model of a physical parallel machine being a fixed graph in space with communication 
channels connecting computational nodes. The channels of communication constrain the propagation directions 
for information exchange. To enable fine-grain parallelism assume that computation and communication 
are separate steps in a computational event. By doing so, we have created an efficient pipeline
that hides the latency of the communication phase. We can now leverage the mental model of spacetime 
to argue about partial orders of computational events that might be able to effect each other. 

We call this the _computational spacetime_ of the machine. An operand cannot be delivered to a
remote destination unless it falls inside the future cone of the computational spacetime outlined 
by the distance an operand can travel along the communication channels in some unit of time.

This constraint is shown in the following animation: a computational event can trigger dependent 
computations at a distance only through time. Just like traditional spacetime we call the 
edge of that wavefront the time horizon.

<div id="spacetime_view" style="text-align:center">
    <canvas id="c" style="border:5px solid #000;">browser doesn't support canvas tags</canvas>
</div>


As designers, we have the option to try to compute more, thus taking more time and 
broaden the computational spacetime light cone and enable the exchange of information 
to nodes that are farther away. Increasing the computational complexity of the
operation, for example by introducing a vector scale, or a matrix multiplication
instruction. These coarse operators provide more time to send input operands. 
This will _coarsen_ the computational graph and _shorten_ the communication links. 

Alternatively, we can also compute less, and organize the operands in space 
in such a way that they fall in the future cone of the computational event. 
That is the foundation of designing domain flow algorithms, and building fine-grain 
computational fabrics. The benefit of this approach is that communication bandwidth
is distributed across the fabric and matches the computational throughput by design.
Many signal processing and linear algebra operators can take advantage of this
approach to remove the memory access bottleneck.

The traditional Single Program Multiple Data (SPMD) execution model is an example
of the coarse approach, and real-time signal processing pipelines are an example
of the fine-grain approach. Coarse-grain computational models provides scalability
whereas fine-grain computational models provide low latency and energy-efficiency. 

Neither of these approaches is a panacea for parallel computation for the simple reason 
that different algorithms have different bottlenecks. Some are compute-bound, in which 
case the efficiency of computation will govern the optimal algorithm. And others are 
communication-bound, in which case the efficiency of information exchange is the deciding 
factor. Examples of communication-bound algorithms are matrix-vector multiply, sorting, 
and similar full information exchanges, such as, min/max and normalize. Sometimes, a 
few big compute nodes with big communication pipes is the best organization, and sometimes, 
a network of tightly-coupled fused multiply accumulate units is better. When you 
are looking for low-latency, energy-efficiency, smaller and parallel tends to be better.

