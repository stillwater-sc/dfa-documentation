+++
prev = "/ch2/"
weight = 1
title = "Computational Dynamics"
date = "2017-02-17T08:59:30-05:00"
toc = true
next = "/ch3-design/elements"

+++

A memory access in a physical machine can be very complex. For example, 
when a program accesses an operand located at an address that is not in
physical memory, the processor registers a page miss. The performance 
difference between an access from the local L1 cache versus a page miss 
can be 8 orders of magnitude, that is, ten million times slower. 
An L1 cache hit is serviced in the order of 500pico-seconds, whereas a 
page miss can be as slow as 15 milli-seconds if it has to come from 
rotational storage. 

For web applications, the elements of good design mandate that the 
response time of the application is less than 100msec. Anything longer, 
and the customer will experience a disassociation between input and action.  
This constraint forces web applications to service all requests from memory. 

For high-performance computing, the mandate is even stronger. A typical
HPC application will use tens of thousands of processors in a synchronized
manner, and one slow process can impede the progress of tens of
thousands other processes, destroying the performance of the parallel
application. It is paramount for parallel algorithms to distribute the
data structures on which to compute in such a way that the working set
is in memory across all processing nodes.

In addition to requiring that all requests are serviced from
memory, the algorithm should aim to keeps all the processors
busy by balancing the computational intensity. When information
must be exchanged among the processors, it is beneficial if 
communication overlaps computation. The communication network
tends to be the weakest link in parallel computation with latencies
that are 5 to 6 orders of magnitude slower than ALU operations.

Good algorithm desigms, sequential or parallel, take into account where, 
and how, operands need to be accessed. The key insight for sequential
algorithm optimization is to be aware of the memory hierarchy. The 
insight for parallel algorithms is to be aware where in space the 
operands reside, and avoid accessing remote operands. Instead, the
algorithm designer must orchestrate a global memory allocation and 
use as to hide the latency of communicating state among processors.

Variability is another attribute that parallel algorithms are sensitive to. 
As tens of thousands of processors are working together, when the initial 
division of labor has generated a balanced workload, any variability 
caused by poor operand locality, network contention, or clock frequency
modulation due to power constraints, causes the collective to wait for 
the slowest process. As the number of processors grows, so does 
variability. And unfortunately, when variability rises processor 
utilization drops and algorithmic performance suffers.
