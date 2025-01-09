+++

weight = 5
title = "Domain Flow Architecture"
toc = true

date = "2025-01-06T16:46:11-05:00"

+++

With the advent of Very Large Scale Integration (VLSI), it became apparent 
that the control mechanism of the Stored Program Machine (SPM) to manage
resource contention was not well-suited to the characteristics of VLSI <sup>[1](#vlsi)</sup>.
VLSI technology offers large amount of hardware at very low cost, but interconnections
between the logic devices are as expensive as the logic devices themselves
for all three metrics: area, propagation delays, and energy. Effective
use of VLSI technology is only achieved when the computational resource
organization is constructed with local interconnections.

In 1978, H.T. Kung and Charles Leiserson introduced systolic arrays <sup>[2](#systolic)</sup>
with the following definition:

> A systolic system is a network of processors which rhythmically compute and pass
> data through the system. Physiologists use the word "systole" to refer to the
> rhythmically recurrent contraction of the heart and arteries which pulses bload
> through the body. In a systolic computing system, the function of the processor is
> analogous to that of the heart. Every processor regularly pumps data in and out,
> each time performing some short computation, so that a regular flow of data is kept
> up in the network.

This simple observation effectively created a VLSI Model of Computation. 
Features of algorithms had to be related to the constraints of VLSI technology.
Moldovan <sup>[3](#moldovan)</sup> suggested to separate the design of the
interconnect from the design of the processing cells, and provided a 
methodology to parallelize and pipeline algorithms so that they adhered
to the constraints of VLSI: area, time, and energy. This methodology was
successfully used to create demonstrations of hundreds of processor arrays
for a broad range of algorithms for digital filtering, signal processing,
image processing, basic linear algebra, matrix factorization, solving systems 
of constraints, and optimization.

Moldovan's VLSI array mapping methodology successfully solved the resource
contention management problem for the special case of fully articulated 
processor arrays.
But when the problem size grows larger than the available VLSI resources.
the methodology brakes down. Approaches that use a divide-and-conquer approach
to aggregate processing elements, will not be able to follow the constraints of VLSI
as the control mechanism to reuse the processing element will destroy the
spatial relationships that separated computational activities in the original array. 
One solution to this problem was offered by Omtzigt <sup>[4](#omtzigt)</sup> in the 
form of Domain Flow Architectures (DFA): infinite, but bounded network topologies 
using spatial data flow tags to control resource contention <sup>[5](#domain-flow)</sup>. 
Domain flow architectures provide local neighborhoods with the same fine-grained 
communication as the fully articulated array, while offering infinite extent
at the algorithm level. 



**footnotes**

<a id="vlsi">[1]</a> Mead, C.A. and Conway, L.A., _Introduction to VLSI Systems_, 1978

<a id="systolic">[2]</a> Kung, H.T. and Leiserson, C.E., _Systolic Arrays for VLSI_, CMU-CS-79-103, 1978

<a id="moldovan">[3]</a>  Dan I. Moldovan, _On the Design of Algorithms for VLSI Systolic Arrays_, Proceedings of the IEEE, Volume 71, Number 1, January 1983

<a id="omtzigt">[4]</a> Omtzigt, E.T.L., _Domain Flow and streaming architectures_, Proceedings of the International Conference on Application Specific Array Processors, 1990 [conference paper](https://ieeexplore.ieee.org/document/145479)

<a id="domain-flow">[5]</a> Omtzigt, E.T.L., _Domain Flow and Streaming Architectures_, Ph.D. Thesis, Yale University, 1993
