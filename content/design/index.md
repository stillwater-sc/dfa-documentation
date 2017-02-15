+++
weight = 0
title = "Elements of Good Design"
date = "2017-02-15T07:42:59-05:00"
icon = "<b>2. </b>"
chapter = true
next = "/design/elements"
prev = "/introduction/nextsteps"

+++

### Chapter 2

# Elements of Good Design

For sixty years, we have been optimizing for sequential computation. The best algorithms
for sequential execution are those that minimize the number of operations to yield the
result. Computational complexity theory is well-aligned with this quest, but any
performance-minded algorithm designer knows that the best theoretical algorithms are 
not necessarily the fastest when executed on actual hardware. The difference is typically
caused by the trade-off sequential algorithms have to make between computation and
accessing memory. 

A memory access in a physical machine can be very complex:
for example, think about what happens when a program accesses an operand located
at an address that is not in physical memory. This is referred to as a page miss.
The performance difference between an access from the local L1 cache versus a page miss
can be 8 orders of magnitude. An L1 cache hit is serviced in the order of 500pico-seconds,
whereas a page miss can be as slow as 15 milli-seconds if it has to come from rotational
storage. 

For web applications, the elements of good design mandate that the algorithm can service
all requests from memory. For high-performance computing, the mandate is even strong.
In addition of requiring that all requests are serviced by memory, it is also paramount
that the algorithm keeps all the processors busy by correct load balancing and overlapping 
operand accesses with computation. This is particularly important when operands need
to traverse the weakest link in a parallel computation: the network. 

Thus good algorithms, sequential or parallel, take into account where, and how, operands
need to be accessed. The trick in sequential algorithm is to be aware of the memory
hierarchy. But the trick for parallel algorithms is to be aware where in space the
operands are, and to avoid having to access remote operands. 

Variability is another attribute that parallel algorithms are sensitive to. As thousands
of processors are working together, when the initial division of labor has generated
a workload for each processor that is balanced, any variability, which can be caused 
by poor operand access locality, networking contention, or clock frequency modulation 
due to power constraints, causes the collective to have to wait for the slowest process.
As the number of processors grows, so does the variability, and with it the utilization
drops.
