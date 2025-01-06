+++
prev = "/ch3-design/space"
weight = 5
title = "Energy: the how"
toc = true
next = "/ch3-design/switching-energy"
date = "2025-01-05T13:39:38-05:00"

+++

Table 1 shows switching energy estimates of key computational events by process node.
Data movement operations (reads and writes) have started to dominate energy consumption
in modern processors. This makes a Stored Program Machine (SPM) less and less efficient.
To counter this, all CPUs, GPUs, and DSPs have started to add instructions that amortize
instruction processing among more computational intensity: they have all become **SIMD**
machines. 

Fundamentally, the SPM relies on a request/reply protocol to get information from a memory. 
Otherwise stated, the resource contention mechanism deployed by a SPM uses a random
access memory to store inputs, intermediate, and output values. And all this memory 
management uses this request/reply cycle. Which we now know is becoming less and less
energy efficient compared to the actual computational event the algorithm requires.
The sequential processing model is becoming less and less energy efficient.

We see that the further the memory is from the ALUs the worse the energy imbalance is.
This has spawn Processor-In-Memory (PIM) and In-Memory-Compute (IMC) structures where
the processing elements are multiplied and pushed into the memory. This improves the
energy efficiency of the request/reply cycle, but it complicates the data distribution
problem.

Fine-grained data paths so common in real-time designs are more energy efficient than
their SPM counterparts because they do not rely on the request/reply cycle. Instead, they
operate in a pipeline fashion with parallel operational units directly writing results
to the next stage, removing the reliance on random access memory to orchestrate
computational schedules.

We have seen the Data Flow Machine (DFM) maintaining fine-grain parallelism using a finite
number of processing elements. Unfortunately, the basic operation of the DFM
is less efficient than the basic operation of the SPM. Furthermore, the DFM has no
mechanism to cater to the spatial relationships among a collection of operations.
Structured parallelism is treated the same as unstructured parallelism, and incurs
an unnecessary penalty. But the DFM does provide a hint of how to maintain fine-grain
parallelism: its pipeline is a ring, which is an infinite, but bounded structure.

The Domain Flow Architecture (DFA) builds upon this observation and supports and 
maintains a local fine-grain spatial structure while offering an infinite computational
fabric with finite resources. DFA is to DFM as PIM is to SPM.

## Values in picojoules (pJ) per operation

| Operation Type            | 28/22nm  | 16/14/12nm | 7/6/5nm | 3nm     | 2nm     |
|---------------------------|----------|-----------|----------|---------|---------|
| 32-bit Register Read      | 0.040    | 0.025     | 0.012    | 0.008   | 0.006   |
| 32-bit Register Write     | 0.045    | 0.028     | 0.014    | 0.009   | 0.007   |
| 32-bit ALU Operation      | 0.100    | 0.060     | 0.030    | 0.020   | 0.015   |
| 32-bit FPU Add            | 0.400    | 0.250     | 0.120    | 0.080   | 0.060   |
| 32-bit FPU Multiply       | 0.800    | 0.500     | 0.250    | 0.170   | 0.130   |
| 32-bit FPU FMA            | 1.000    | 0.600     | 0.300    | 0.200   | 0.150   |
| 32-bit Word Read L1       | 0.625    | 0.375     | 0.1875   | 0.125   | 0.09375 |
| 32-bit Word Read L2       | 1.875    | 1.125     | 0.5625   | 0.375   | 0.28125 |
| 32-bit Word Read DDR5     | 6.25     | 5.000     | 3.750    | 3.125   | 2.8125  |
| 64-byte L1 Cache Read     | 10.000   | 6.000     | 3.000    | 2.000   | 1.500   |
| 64-byte L2 Cache Read     | 30.000   | 18.000    | 9.000    | 6.000   | 4.500   |
| 64-byte DDR5 Memory Read  | 100.000  | 80.000    | 60.000   | 50.000  | 45.000  |

Table 1: Switching Energy Estimate by Process Node

**note** 
 1. 32-bit cache and memory operations are derived from 64byte read energy
 2. Smaller process nodes generally reduces switching energy by roughly 40-50% per major node transition



