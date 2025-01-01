+++
prev = "/design/dfm"
weight = 4
title = "Domain Flow Architecture"
toc = true
next = "/design/time"
date = "2017-02-17T09:20:57-05:00"

+++

Domain Flow Architecture (DFA) machines are the class of machines that execute 
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
