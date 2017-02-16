+++
prev = "/design/"
weight = 1
title = "Elements of Design"
date = "2017-02-15T07:43:18-05:00"
toc = true
next = "/design/time"

+++

# Attributes of Good Domain Flow Algorithms

We can summarize the attributes of good parallel algorithm design as
1. low operation count, where operation count is defined as the sum of operators and operand accesses
2. minimal operand movement in space
3. minimal operator contention in space

Item #1 is well-known by theoretical computer scientists.
Item #2 is well-known among high-performance algorithm designers. 
And, item #3 is well-known among hardware designers and computer engineers.

When designing domain flow algorithms, we are looking for an energy efficient embedding
of a computational graph is space, and it is thus logical that we need to combine
all three attributes. The complexity of #3 is what makes hardware design so much more
complex and slow as validation of the actual execution is taking a disproportional amount
of time.

But the complexity of operator contention can be mitigated by clever resource contention
management. The Stored Program Machine is an example of a specific resource contention 
management mechanism, and that is one, central processing unit, can be shared by the
complete computational graph. The execution protocol to make that possible is
 1. read an instruction from memory, 
 2. decode the instruction, 
 3. fetch the input operands from memory, 
 4. execute the instruction using the input operands
 5. write back the result to memory
That is the fundamental resource contention management machine for a Stored Program Machine.

A Data Flow Machine uses a different resource contention management mechanism:
 1. write an operand to an instruction slot of an instruction token stored in a Content Addressable Memory
 2. check if all operands are present to start the execution cycle
 3. if instruction is ready extract it from the CAM and inject it into a fabric of computational elements
 4. deliver instruction to an execute unit
 5. execute the instruction and write the result into an instruction slot in the CAM
 
The strength of the resource management of the Data Flow Machine is that the machine can
execute along the free schedule, or inherent parallelism, of the algorithm. Any physical
implementation however, is constrained by the energy efficiency of the CAM and the network
that connects the CAM to the fabric of computational elements. As concurrency demands grow
the efficiency of both the CAM and the fabric decreases making large data flow machines
unattractive. However, small data flow machines don't have this problem and are thus
very attractive to deliver energy-efficient, low-latency resource management. All high-performance
microprocessors today have a data flow machine at its core. 

The Domain Flow Architecture are the class of machines that execute using the domain flow
execution model. The fundamental problem limiting the energy efficiency of the data flow
machine is the size of the CAM and fabric. As they are managed as two separate clusters
of resources, they grow together. The domain flow execution model recognizes that for an
important class of algorithms, we can distribute the CAM across the computational elements
in the fabric, and we can scale the machine without negatively impacting the cycle time
of execution. 

The Domain Flow execution model solves the complexity of minimizing operator contention. 
As long as the domain flow algorithm does not map computational events on the same location
in space, the physical relationships between the computational events are kept invariant
in the physical execution realm. This translates into the requirement for good domain
flow algorithms to design parallel algorithms that exhibit partial orders that are
regular and are separated in space. That is a mouthful, but we can make this more tangible
when we discuss in more detail the temporal behavior of a domain flow program in the
next section about time.


