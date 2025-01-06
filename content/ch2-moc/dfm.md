+++

weight = 3
title = "Data Flow Machine"
toc = true

date = "2024-01-06T16:44:37-05:00"

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

