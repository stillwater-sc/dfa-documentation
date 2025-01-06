+++

archetype = "chapter"
weight = 3
title = "Elements of Good Design"
date = "2017-02-15T07:42:59-05:00"

+++

The best algorithms for sequential execution are those that minimize the number 
of operations to yield results. Computational complexity theory has aided this quest, 
but any performance-minded algorithm designer knows that the best theoretical algorithms 
are not necessarily the fastest when executed on real hardware. The difference is typically
caused by the trade-off sequential algorithms have to make between computation and
accessing memory. The constraints of data movement are even more pronounced
in parallel algorithms as demonstrated in the previous section.

This chapter explores the elements of good design for parallel algorithms and their execution on real hardware.


