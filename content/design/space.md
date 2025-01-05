+++
prev = "/design/time"
weight = 7
title = "Space: the where"
toc = true
next = "/design/nextsteps"
date = "2017-02-15T07:49:38-05:00"

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
single instruction stream and a single data stream and the acronym *SISD*. A machine
that applies the same instruction on multiple data elements is a *SIMD* machine, 
short for Single Instruction Multiple Data. Machines that have multiple instruction
streams operating on a single data element as used in fault-tolerant and redundant
system designs, and carry the designation *MISD*, Multiple Instruction Single Data.
The Multiple Instruction Multiple Data machine, or *MIMD*, consists of many processing
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
to be coordinated such that the program does not need to wait. Distributed Memory Machine
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



<a name="flynn">1:</a> Flynn, Michael J. (December 1966), [Very high-speed computing systems](https://ieeexplore.ieee.org/document/1447203)

<a name="wikipedia">2:</a> Flynn's taxonomy [Wikipedia](https://en.wikipedia.org/wiki/Flynn's_taxonomy)

<a name="dwarfs">3:</a> The Landscape of Parallel Computing Research: A View from Berkeley [The Seven Dwarfs](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2006/EECS-2006-183.pdf)
