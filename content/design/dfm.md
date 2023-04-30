+++
prev = "/design/currentstate"
weight = 3
title = "Data Flow Machine"
toc = true
next = "/design/time"
date = "2017-02-17T09:20:57-05:00"

+++

In the late 60's and 70's when computer scientists were exploring parallel
computation by building the first parallel machines and developing the
parallel algorithm complexity theory, folk realized that this
over-constrained specification was a real problem for concurrency. 
One proposal to rectify this was a natively parallel execution
model called the Data Flow Machine (DFM). A Data Flow Machine uses a 
different resource contention management mechanism:

 1. write an operand into an appropriate operand slot in an instruction token stored in a Content Addressable Memory (CAM) by an instruction tag
 2. check if all operands are present to start the execution cycle of the instruction
 3. if an instruction is ready then extract it from the CAM and inject it into a fabric of computational elements
 4. deliver the instruction to an available execution unit
 5. execute the instruction, and finally
 6. write the result back into an operand slot in target instruction token stored in the CAM
 
The strength of the resource contention management of the Data Flow Machine
is that the machine can execute along the free schedule, that is, the 
inherent parallelism of the algorithm. Any physical implementation, however,
is constrained by the energy-efficiency of the CAM and the network 
that connects the CAM to the fabric of computational elements. As 
concurrency demands grow the efficiency of both the CAM and the fabric
decreases making large data flow machines unattractive. However, small data
flow machines don't have this problem and are able to deliver energy-efficient, 
low-latency resource management. Today, all high-performance microprocessors 
have a data flow machine at their core. 

The Domain Flow Architecture are the class of machines that execute 
using the domain flow execution model. The fundamental problem limiting 
the energy efficiency of the data flow machine is the size of the CAM 
and fabric. As they are managed as two separate clusters of resources, 
they grow together. The domain flow execution model recognizes that for 
an important class of algorithms, we can distribute the CAM across the
computational elements in the fabric, and we can scale the machine 
without negatively impacting the cycle time of execution. 

The Domain Flow execution model solves the complexity of minimizing 
operator contention. As long as the domain flow algorithm does not map
computational events on the same location in space, the physical 
relationships between the computational events are kept invariant
in the physical execution realm. This translates into the requirement 
for good domain flow algorithms to design parallel algorithms that 
exhibit partial orders that are regular and are separated in space. 
That is a mouthful, but we can make this more tangible when we discuss 
in more detail the temporal behavior of a domain flow program in the
next section about time.
