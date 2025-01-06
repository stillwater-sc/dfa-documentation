+++

weight = 2
title = "Stored Program Machine"
toc = true

date = "2025-01-06T16:43:57-05:00"

+++

After loading a program into the main memory of the Stored Program Machine,
the Operating System writes the address of the entry point of the program
into the Instruction Pointer (IP) register of the processor. After that initialization,
a Stored Program Machine uses the following resource contention management mechanism
to unabiguously execute a program:

 1. fetch an instruction from the address pointed to by the IP register, and update IP to point to the next instruction
 2. decode instruction
 3. dispatch to appropriate execution units
 4a. if execute unit is the load/store unit then request data from a memory location or provide data to store at memory location
 4b. if execute unit is branch unit then load IP with new address
 4c. else execute address/branch/arithmetic/logic/function operation
 5. store result of execute unit in register file

This cycle is repeated till a halt instruction is executed, or an interrupt is issued.
 

