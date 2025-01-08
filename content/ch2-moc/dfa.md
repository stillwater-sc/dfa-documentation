+++

weight = 5
title = "Domain Flow Architecture"
toc = true

date = "2024-01-06T16:46:11-05:00"

+++

With the advent of Very Large Scale Integration (VLSI), it became apparent 
that the control mechanism of the Stored Program Machine (SPM) to manage
resource contention was not well-suited to the characteristics of VLSI <sup>[1](#vlsi)</sup>.
VLSI offers large amount of hardware at very low cost, but interconnections
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

This simple observation created effectively a VLSI Model of Computation. 
Features of algorithms had to be related to the constraints of VLSI technology.
Moldovan <sup>[3](#moldovan)</sup> suggested to separate the design of the
interconnect from the design of the processing cells, and provided a 
methodology to parallelize and pipeline algorithms so that they adhered
to the constraints of VLSI: area, time, and energy. This methodology was
very successfully used to create demonstrations of hundreds of different
processor arrays.

Moldovan's systolic array mapping methodology successfully solved the resource
contention management problem for the special case of fully articulated arrays.
But when the size of the problem was bigger than the available VLSI resources.
the methodology broke down. Any approach that uses a divide-and-conquer approach
to aggregate activity, will need a control mechanism to reuse the processing
element, and that mechanism will not be able to follow the constraints of VLSI
as spatial relationships will have been destroyed. The solution to this problem
was offered by Omtzigt <sup>[4](#omtzigt)</sup> in the form of infinite, but
bounded network architectures using spatial data flow tags to control resource contention.  



**footnotes**

<a name="vlsi">[1]</a> Mead, C.A. and Conway, L.A., _Introduction to VLSI Systems_, 1978

<a name="systolic">[2]</a> Kung, H.T. and Leiserson, C.E., _Systolic Arrays for VLSI_, CMU-CS-79-103, 1978

<a name="moldovan">[3]</a>  Dan I. Moldovan, _On the Design of Algorithms for VLSI Systolic Arrays_, Proceedings of the IEEE, Volume 71, Number 1, January 1983

<a name="omtzigt">[4]</a> Omtzigt, E.T.L., _Domain Flow and streaming architectures_, Proceedings of the International Conference on Application Specific Array Processors, 1990 [conference paper](https://ieeexplore.ieee.org/document/145479)
