+++
prev = "/design/currentstate"
weight = 2
title = "Elements of Design"
date = "2017-02-15T07:43:18-05:00"
toc = true
next = "/design/dfm"

+++

We can summarize the attributes of good parallel algorithm design as

 1. low operation count, where operation count is defined as the sum of operators and operand accesses
 2. minimal operand movement
 3. minimal resource contention

Item #1 is well-known by theoretical computer scientists.

Item #2 is well-known among high-performance algorithm designers.
 
Item #3 is well-known among hardware designers and computer engineers.

When designing domain flow algorithms, we are looking for an energy efficient embedding
of a computational graph in space, and it is thus logical that we need to combine
all three attributes of minimizing operator count, operand movement, and resource contention. 
The complexity of #3 is what makes hardware design so much more
complex and slow as validation of the actual execution is taking a disproportional amount
of time. But the complexity of operator contention can be mitigated by clever resource contention
management. 

The Stored Program Machine (SPM) is an example of a specific resource contention 
management mechanism designed specifically for one central processing unit shared by the
complete computational graph. The SPM protocol to avoid contention on that one processing
resource is described as follows:

 1. read an instruction from memory, 
 2. decode the instruction, 
 3. fetch the input operands from memory, 
 4. execute the instruction using the input operands
 5. write back the result to memory
 
But the Stored Program Machine isn't particularly energy efficient, and its resource contention
management is over-constrained as it forces a total order on the computation graph. This tasks
of creating the total order falls on the algorithm designer.




