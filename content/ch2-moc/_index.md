+++

archetype = "chapter"
weight = 2
title = "Computer Architecture"
date = "2025-01-05T13:39:38-05:00"

+++

A model of computation describes how an output of a 
mathematical function is computed given an input. 
These models specify how units of computation,
memories, and information (data) exchanges are organized.
The benefits provided by a model of computation is the
measure of the computational complexity of an algorithm
independent of any specific physical implementation.

There are sequential models of computation:
1. Finite State Machines (FSM)
2. Pushdown automata
3. Turing machines
4. Decision Tree Models
5. Random Access Machine

And parallel models of computation:
1. Cellular Automata (CA)
2. Kahn Process Networks
3. Petri Nets
4. Synchronous Data Flow

In this chapter, we'll provide a summary of the Stored Program Machine, which 
provides an implementation of the Random Access Machine model of computation, 
and the Data Flow Machine, a machine to execute Synchronous Data Flow.

And we'll introduce the Domain Flow Architecture (DFA), which
solves the problem of diminishing returns of the Data Flow Machine when 
trying to scale up its size and concurrency.

