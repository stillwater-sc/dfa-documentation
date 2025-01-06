+++
prev = "/ch3-design/time"
weight = 4
title = "Space: the where"
toc = true
next = "/ch3-design/energy"
date = "2025-01-05T13:39:38-05:00"

+++

Space is a scarce resource, with a direct cost associated to it. A computational engine,
such as a Stored Program Machine,
needs to allocate area for ALUs and register files, and to make these work well, even
more space is required to surround these resources with cache hierarchies and memory
controllers. But even if space was freely available, it still presents a cost from a 
parallel computational perspective, since it takes energy to get information across
space, as it takes time to do so.

What would be the best way to build scalable, parallel execution engines? In 1966,
Michael J. Flynn, proposed a taxonmy based on two dimensions, the parallelism of
data and instructions <sup>[1](#flynn)</sup>. A purely sequential machine has a
single instruction stream and a single data stream and the acronym **SISD**. A machine
that applies the same instruction on multiple data elements is a **SIMD** machine, 
short for Single Instruction Multiple Data. Machines that have multiple instruction
streams operating on a single data element as used in fault-tolerant and redundant
system designs, and carry the designation **MISD**, Multiple Instruction Single Data.
The Multiple Instruction Multiple Data machine, or **MIMD**, consists of many processing
elements simultaneously operating on different data.

The diagram below shows the Flynn Taxonomy <sup>[2](#wikipedia)</sup>:

{{< figure src="/images/flynn-taxonomy.png" title="Flynn's Parallel Computer Taxonomy" >}}

The availability of inexpensive microprocessors has made it possible to create cost-effective
parallel *MIMD* machines. A parallel program running on such a distributed architecture
consists of a collection of sequential programs. A parallel algorithm for these distributed
memory architectures requires designing a data structure decomposition that can be stored
in the memory of the different processing nodes, a program decomposition that transforms these
_blocks_ of the data structure, and an exchange phase to communicate dependent data among
the nodes.

For these algorithms to work well, the computation phase and the data exchange phase need
to be coordinated such that the program does not need to wait. Distributed Memory Machine (DMM)
algorithms have been studied to categorize them as a function of this constraint. This
categorization has become known as the Seven Dwarfs <sup>[3](#dwarfs)</sup>. Later refinement
has expanded that to thirteen dwarfs. 

The algorithms that work well for this parallel model of computation all share the same 
information exchange dynamic. Either, the computation does not depend on remote data, 
the so-called _embarrasingly parallel_ algorithms, or when there is a dependency, the 
computational complexity of the node execution scales faster than the data exchange
complexity, yielding so-called _weak scaling_ algorithms that can be made efficient 
by scaling up the data structure size. Any other information exchange will diminish
the compute efficiency of the distributed machine.

Supercomputers that are purpose-build for capability have been constructed as DMMs since
the early '90s, attesting to the success of the Distributed Memory Machine model. 
And thirty years of empirical evidence has shown that designing these DMM algorithms is 
difficult, due to the fact that the dynamic behavior of the actual execution requires
careful design and benchmarking to maximize resource efficiency.

The **MIMD** approach, however, is not isolated to just the Distributed Memory Machine.
Real-time data acquisition, signal processing, and control systems also demand parallel
execution, but systems for these use cases tend to be constructed very differently. 
Instead of _blocking_ the computation to create subprograms that can be executed 
on a Stored Program Machine, real-time system tend to favor distributed and balanced 
data paths designed to never require dynamic reconfiguration.

Whereas Distributed Memory Machines require coarse-grain parallelism to work, 
real-time systems tend to favor fine-grain parallelism. Fine-grain parallel systems
offer lower latencies, and an increasingly important benefit, energy efficiency.
In the next chapter, we'll discuss the techniques used to design spatial mappings
for fine-grained parallel machines.


**Footnotes**

<a name="flynn">1:</a> Flynn, Michael J. (December 1966), [Very high-speed computing systems](https://ieeexplore.ieee.org/document/1447203)

<a name="wikipedia">2:</a> Flynn's taxonomy [Wikipedia](https://en.wikipedia.org/wiki/Flynn's_taxonomy)

<a name="dwarfs">3:</a> The Landscape of Parallel Computing Research: A View from Berkeley [The Seven Dwarfs](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2006/EECS-2006-183.pdf)
