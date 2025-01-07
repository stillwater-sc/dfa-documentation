+++
weight = 5
title = "Control: the how"
toc = true
date = "2025-01-07T15:31:27-05:00"

+++

Fundamentally, the Stored Program Machine (SPM) relies on a request/reply protocol 
to get information to and from memory. 
Otherwise stated, the resource contention mechanism deployed by a SPM uses a random
access memory to store inputs, intermediate, and output values. 

We have seen the Data Flow Machine (DFM) use a different mechanism. Here instructions
fire when all their input data is available. When they fire, an instruction token is
injected into a network of processing units to be executed. The result of that execution
is encapsulated into a data token, which is send back to the central Content Addressable
Memory where the token is matched with all the instructions it is part of.

The DFM can maintain fine-grain parallelism, but the basic operation 
is less efficient than the SPM. Furthermore, the DFM has no
mechanism to cater to the spatial relationships among a collection of operations.
Structured parallelism is treated the same as unstructured parallelism, and incurs
an unnecessary penalty. But the DFM does provide a hint of how to maintain fine-grain
parallelism: its pipeline is a ring, which is an infinite, but bounded structure.

The Domain Flow Architecture (DFA) builds upon this observation and supports and 
maintains a local fine-grain spatial structure while offering an infinite computational
fabric with finite resources. DFA is to DFM what PIM is to SPM.


