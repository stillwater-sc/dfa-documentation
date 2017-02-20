+++
next = "/introduction/nextsteps"
prev = "/introduction/linearschedule"
weight = 9
title = "Derivation"
date = "2017-02-15T07:24:38-05:00"
toc = true

tags = [ "domain flow algorithm", "matrix-multiply", "derivation" ]
categories = [ "domain flow", "design", "matrix-math" ]
series = [ "introduction" ]
+++

Remember this note?

{{% notice note %}}
The concepts of partial and total orders are essential for finding optimal domain flow algorithms. 
[Poset](https://en.wikipedia.org/wiki/Partially_ordered_set) are the
source of potentially interesting solutions to high-performance, low-power execution patterns. 
{{% /notice %}}

The Linear Algebra universe is particularly rich in partial orders, something that has been exploited for centuries. <sup>[1](#history)</sup> 
Fortunately, for our discussion we can focus on the last couple of decades.
The book on computing with matrices is written by Golub, and van Loan <sup>[2](#matrix computations)</sup>. What follows may be
a bit technical to communicate in mathematical terms what is going on, but keep in mind the visualizations of the previous
pages as you try to visualize what the math implies.

We want to evaluate the matrix-matrix multiplication: $$ C = AB $$ where $A$, $B$, and $C$ are $N \times N$ matrices.
We picked the square matrix version because it is simpler, but all that will follow will work just as well when the 
matrices are rectangular.

Matrix operations exhibits many independent operations. For example, there are four basic vector operations: _*scale*_, _*add*_, 
_*multiply*_, and _*dot product*_. The operator $z = alpha * x + y$ is frequently used, and although redundant, tends
to be added as the fifth operator, and referred to as the _saxpy_ operator for "Scalar Alpha X Plus Y". The _dot product_
is also referred to as the _inner product_. The _inner product_ is an operator that collapses two vectors into a scalar.
The _outer product_ is an operator that expands two vectors into a matrix: for vector $x$ and $y$, the outer product $\times$ is defined as: $xy^T$.

Matrix operations can be expressed in terms of these vector operators with many degrees of freedom. 
For example, 'double loop' matrix-vector multiplication can be arranged in $2! = 2$ different ways;
we can evaluate the inner products, or we can evaluate the outer products.

'Triple loop' matrix-matrix multiplication can be arranged in $3! = 6$ ways. These arrangements have their own operators
and their own modes of access, and thus the interplay with a spatial distribution of the rows and columns of the matrices is key to
evaluate the efficiency of the computation. The orderings and properties of these different arrangements is shown in Table 1:

| Loop order | Inner Loop | Middle Loop | Inner Loop Data Access |
|------------|------------|-------------|------------------------|
| ijk | dot | vector $\times$ matrix | *A* by row, *B* by column |
| jik | dot | matrix $\times$ vector | *A* by row, *B* by column |
| ikj | saxpy | row gaxpy | *B* by row |
| jki | saxpy | column gaxpy | *A* by column |
| kij | saxpy | row outer product | *B* by row |
| kji | saxpy | column outer product | *A* by column |

*Table 1:* Matrix Multiplication: Orderings and Properties (see <sup>[2](#matrix computations)</sup>)

The _*scale*_, _*add*_, and _*multiply*_ operators are highly parallel in that each individual vector element operation 
is independent of each other. The _*dot*_ product adds a consolidation, or _contraction_ phase to yield a single valued result. 
In a parallel context, all these vector operators have an information distribution phase that is non-trivial. First,
vectors must be embedded in space, and secondly, the vectors need to be aligned so that these element operations
can commence. Progressing to matrix operators, we have vectors of vectors that need to be aligned. For the domain 
flow algorithm we demonstrated, we started from the matrix-multiply expression as $N^2$ independent _dot_ products. 
In mathematical terms: if we partition the $A$ matrix in rows, and the $B$ matrix in columns:

$$A = \begin{bmatrix} a_1^T \\\\ a_2^T \\\\ \vdots \\\\ a_n^T \end{bmatrix}$$

and

$$B = \begin{bmatrix} b_1 & b_2 & \cdots & b_n \end{bmatrix}$$ 

then matrix multiplication can be expressed as the collection of _dot_ products:

$$\text{for i = 1:N} \\\\ \qquad \text{for j = 1:N} \\\\ \qquad\qquad c_{ij} = a_i^T b_j $$

Looking just at the individual _dot_ product, a theoretical computer scientist would say: The fastest way to evaluate 
a _dot_ product is through a binary tree of depth $log(N)$ yielding the result in $log(N)$ steps. A spec is written
and handed off to a hardware engineer. When the hardware engineer looks at this problem, a very different view emerges.
In the hardware world, an algebraic operator such as multiply or add evaluates, depending on the number system, 
in the order of _1 nsec_. But sending the result across even a modestly sized chip, say 10x10 mm, can take 10 times
as long. If the result needs to be communicated across the network, it can take a 1,000,000 times longer. With modern
chip technology, it takes about the same time to compute a multiply or add as it does to communicate the 
result to a local neighborhood. From the perspective of electrons participating in the evaluation of an algebraic operator, 
computation and communication are roughly equal in terms of time and thus distance these electrons can 'drift'.

What this means for evaluating the _dot_ product is that the evaluation of $$c\_{ij} = \sum\limits_{k=1}^N a\_{ik} * b\_{kj}$$
can be executed efficiently as a propagation through local neighborhoods of communicating functional units. In mathematical
terms we can write this as a recurrence: $$c\_{ijk} = c\_{ijk-1} + a\_{ik} * b\_{kj}$$
You can start to recognize the domain flow algorithm as presented in our example. However, if we distribute the $c\_{ij}$
propagation in that $k$-dimension, then accesses to $a\_{ik}$ and $b\_{kj}$ are not local at all. Is there a mechanism
to get the correct $a$ and $b$ elements to the right location?

Let's take a look at the dot products for $c\_{1,1}$, $c\_{1,2}$, and $c\_{2,1}$. Visualize the propagation of the $c$
recurrence along the $k$-dimension above the point $i = 1, j = 1, k = 0$. Let's position the row of $A$, $a\_1^T$, alongside
the $c\_{1,1}$ propagation in the $j = 0$ plane. Thus, $a\_{1,1}$ is presented at the lattice point $(1,0,1)$, and $a\_{1,N}$ is positioned
at the lattice point $(1,0,N)$. Similarly, let's position the column of $B$, $b\_1$, alongside the $c\_{1,1}$ propagation,
but position it in the $i = 0$ plane. That would imply that $b\_{1,1}$ is presented at the lattice point $(0,1,1)$, 
and $b\_{N,1}$ is positioned at the lattice point $(0,1,N)$. This would transform the recurrence equation for $\_{1,1}$ into:

$$c\_{1,1,k} = c\_{1,1,k-1} + a\_{1,0,k} * b\_{0,1,k}$$
 
This recurrence represents all local neighborhood operand communications.

If we now visualize the recurrence for $c\_{1,2}$ to propagate in the $k$-column above the lattice point $(1,2,0)$ we
recognize that for $c\_{1,2}$ we need the same row vector of $A$ as the recurrence for $c\_{1,1}$. We can thus propagate
the elements of the row vector $a\_1^T$ along the $j$-direction and build up one side of the _dot_ products for the row $c\_1^T$.
Generalized to the whole $A$ matrix, this is a set of propagation recurrences defined by: $$ a\_{i,j,k} = a\_{i,j-1,k}$$.
Similarly, the column vector $b\_1^T$ is shared between the recurrence of $c\_{1,1}$ and $c\_{2,1}$, and we can propagate
the elements of the column vector $b\_1^T$ along the $i$-direction and build up the other side of the _dot_ products
for the column $c\_1$. 
Generalized to the whole $B$ matrix, this is a set of propagation recurrences defined by: $$ b\_{i,j,k} = b\_{i-1,j,k}$$.
Once we have the $A$ and $B$ matrix elements distributed throughout the lattice, we can finally transform the $c$ recurrence
into a local neighborhood operand communication as well: 

$$c\_{i,j,k} = c\_{i,j,k-1} + a\_{i,j-1,k} * b\_{i-1,j,k}$$

This completes the transformation to all local neighborhood operand communications with the
system of recurrences we have seen before expressed as a domain flow program:

```

compute ( (i,j,k) | 1 <= i,j,k <= N ) {
    a: a[i,j-1,k]
    b: b[i-1,j,k]
    c: c[i,j,k-1] + a[i,j-1,k] * b[i-1,j,k]
}
    
```	

<a name="history">1</a>: [History of Matrices and Determinants](http://www-groups.dcs.st-and.ac.uk/history/HistTopics/Matrices_and_determinants.html)

<a name="matrix computations">2</a>: [Matrix Computations, Gene Golub and Charles van Loan](https://www.cs.cornell.edu/cv/GVL4/golubandvanloan.htm)