+++
weight = 10
menuTitle = "Derivation"
date = "2017-02-15T07:24:38-05:00"
title = "Derivation of the matrix multiply domain flow program"

tags = [ "domain-flow", "matrix-multiply", "derivation" ]
categories = [ "domain-flow", "design", "matrix-math" ]
series = [ "introduction" ]
+++

# 

The concepts of partial and total orders are essential for finding optimal domain flow algorithms. 
Partial orders, or [Poset](https://en.wikipedia.org/wiki/Partially_ordered_set), are the
source of high-performance, low-power execution patterns. 

The Linear Algebra universe is particularly rich in partial orders, something that has been exploited 
for centuries <sup>[1](#history)</sup>. Matrix Computations<sup>[2](#matrix-computations)</sup> by Golub, and van Loan provide 
a comprehensive review. What follows may be a bit technical, but keep in mind the visualizations of the previous
pages as you try to visualize what the math implies.

We want to evaluate the matrix-matrix multiplication: {{< math >}}$ C = A \otimes B ${{< /math >}}, where
{{< math >}}$A${{< /math >}}, {{< math >}}$B${{< /math >}}, and {{< math >}}$C${{< /math >}} 
are matrices of size {{< math >}}$N \times N${{< /math >}}.
We picked the square matrix version because it is cleaner to visualize the symmetry in the computational
wavefront, but all that will follow will work just as well when the matrices are rectangular.

Linear algebra operators exhibits many independent operations. For example, there are four basic vector operators:
1. scale
2. add 
3. multiply, and 
4. dot product 

The operator {{< math >}}$z = alpha * x + y${{< /math >}} is frequently used, and although redundant, tends
to be added as the fifth operator, and referred to as the _saxpy_ operator for "Scalar Alpha X Plus Y". 
The _dot product_ is also referred to as the _inner product_. The _inner product_ is an operator that 
brings two vectors together into a scalar representing a measure how much the vectors point in the same direction.
The _outer product_ is an operator that expands two vectors into a matrix: for vector 
{{< math >}}$x${{< /math >}} and {{< math >}}$y${{< /math >}}, the outer product {{< math >}}$\times${{< /math >}} 
is defined as: {{< math >}}$xy^T${{< /math >}}.

Matrix operations can be expressed in terms of these vector operators with many degrees of freedom. 
For example, 'double loop' matrix-vector multiplication can be arranged in {{< math >}}$2! = 2${{< /math >}} 
different ways; we can evaluate the inner products, or we can evaluate the outer products.

'Triple loop' matrix-matrix multiplication can be arranged in {{< math >}}$3! = 6${{< /math >}} ways. 
These arrangements have their own operators and their own modes of access, and thus the interplay 
with a spatial distribution of the rows and columns of the matrices is key to
evaluate the efficiency of the computation. The orderings and properties of these different 
arrangements is shown in Table 1:

| Loop order | Inner Loop | Middle Loop                                     | Inner Loop Data Access      |
|------------|------------|-------------------------------------------------|-----------------------------|
| ijk | dot | vector {{< math >}}$\times${{< /math >}} matrix | {{< math >}}$A${{< /math >}} by row, {{< math >}}$B${{< /math >}} by column |
| jik | dot | matrix {{< math >}}$\times${{< /math >}} vector | {{< math >}}$A${{< /math >}} by row, {{< math >}}$B${{< /math >}} by column   |
| ikj | saxpy | row saxpy                                       | {{< math >}}$B${{< /math >}} by row                  |
| jki | saxpy | column saxpy                                    | {{< math >}}$A${{< /math >}} by column               |
| kij | saxpy | row outer product                               | {{< math >}}$B${{< /math >}} by row                  |
| kji | saxpy | column outer product                            | {{< math >}}$A${{< /math >}} by column               |

*Table 1:* Matrix Multiplication: Orderings and Properties (see <sup>[2](#matrix-computations)</sup>)

The _*scale*_, _*add*_, and _*multiply*_ operators are highly parallel in that each individual 
vector element operation is independent of each other. The _*dot*_ product adds a consolidation, 
or _contraction_ phase to yield a single, scalar valued result. 

In a parallel context, all these vector operators have an information distribution phase that is non-trivial. 
First, vectors must be embedded in space, and secondly, the vectors need to be aligned so that these 
element operations can commence. Progressing to matrix operators, we have vectors of vectors that need 
to be aligned. For the domain flow algorithm we demonstrated, we started from the matrix-multiply expression 
as {{< math >}}$N^2${{< /math >}} independent _dot_ products. 
In mathematical terms: if we partition the {{< math >}}$A${{< /math >}} matrix in rows, and the
{{< math >}}$B${{< /math >}} matrix in columns:

{{< math >}}$$A = \begin{bmatrix} a_1^T \\\\ a_2^T \\\\ \vdots \\\\ a_n^T \end{bmatrix}$${{< /math >}}

and

{{< math >}}$$B = \begin{bmatrix} b_1 & b_2 & \cdots & b_n \end{bmatrix}$$ {{< /math >}}

then matrix multiplication can be expressed as the collection of _dot_ products:

{{< math >}}$$\text{for i = 1:N} \\\\ \qquad \text{for j = 1:N} \\\\ \qquad\qquad c_{ij} = a_i^T b_j $${{< /math >}}

Looking just at the individual _dot_ product, a theoretical computer scientist would say: the fastest way 
to evaluate a _dot_ product is through a binary tree of depth {{<math>}}$log(N)${{</math>}} 
yielding the result in {{<math>}}$log(N)${{</math>}} steps. A spec is written and handed off to a 
hardware engineer. When the hardware engineer looks at this problem, a very different view emerges.
In the hardware world, an algebraic operator such as multiply or add evaluates, depending on the number system, 
in the order of _1 nsec_. But sending the result across even a modestly sized chip, say 10x10 mm, 
can take 10 times as long. If the result needs to be communicated across the network, it can take 
a 1,000,000 times longer. With modern chip technology, it takes about the same time to compute 
a multiply or add as it does to communicate the result to a local neighborhood. From the perspective 
of electrons participating in the evaluation of an algebraic operator, computation and communication 
are roughly equal in terms of time and thus distance these electrons can 'drift'.

What this means for evaluating the _dot_ product is that the evaluation of
{{< math >}}$$c_{ij} = \sum\limits_{k=1}^N a_{ik} * b_{kj}$${{< /math >}}
can be executed efficiently as a propagation through local neighborhoods of communicating functional units. 
In mathematical terms we can write this as a recurrence: 
{{< math >}}$$c_{ijk} = c_{ijk-1} + a_{ik} * b_{kj}$${{< /math >}}
You can start to recognize the domain flow algorithm as presented in our example. However, if we 
distribute the {{< math >}}$c_{ij}${{< /math >}} propagation in that {{< math >}}$k${{< /math >}}-dimension,
then accesses to {{< math >}}$a_{ik}${{< /math >}} and {{< math >}}$b_{kj}${{< /math >}} are not local at all. 
Is there a mechanism to get the correct {{< math >}}$a${{< /math >}} and {{< math >}}$b${{< /math >}} elements 
to the right location?

Let's take a look at the dot products for {{< math >}}$c_{1,1}${{< /math >}}, {{< math >}}$c_{1,2}${{< /math >}}, 
and {{< math >}}$c_{2,1}${{< /math >}}. Visualize the propagation of the {{< math >}}$c${{< /math >}}
recurrence along the {{<math>}}$k${{</math>}}-dimension above the point 
{{<math>}}$i = 1, j = 1, k = 0${{</math>}}. Let's position the row of {{<math>}}$A${{</math>}}, 
{{<math>}}$a_1^T${{</math>}}, alongside the {{<math>}}$c_{1,1}${{</math>}} propagation in the
{{<math>}}$j = 0${{</math>}} plane. Thus, {{<math>}}$a_{1,1}${{</math>}} is presented at the 
lattice point {{<math>}}$(1,0,1)${{</math>}}, and {{<math>}}$a_{1,N}${{</math>}} is positioned
at the lattice point {{<math>}}$(1,0,N)${{</math>}}. Similarly, let's position the column of
{{<math>}}$B${{</math>}}, {{<math>}}$b_1${{</math>}}, alongside the {{<math>}}$c_{1,1}${{</math>}} propagation,
but position it in the {{<math>}}$i = 0${{</math>}} plane. That would imply that {{<math>}}$b_{1,1}${{</math>}} 
is presented at the lattice point {{<math>}}$(0,1,1)${{</math>}}, and {{<math>}}$b_{N,1}${{</math>}} 
is positioned at the lattice point {{<math>}}$(0,1,N)${{</math>}}. This would transform the recurrence 
equation for {{<math>}}$c_{1,1}${{</math>}} into:

{{<math>}}$$c_{1,1,k} = c_{1,1,k-1} + a_{1,0,k} * b_{0,1,k}$${{</math>}}
 
This recurrence represents all local neighborhood operand communications.

If we now visualize the recurrence for {{<math>}}$c_{1,2}${{</math>}} to propagate in the
{{<math>}}$k${{</math>}}-column above the lattice point {{<math>}}$(1,2,0)${{</math>}} we
recognize that for {{<math>}}$c_{1,2}${{</math>}} we need the same row vector of {{<math>}}$A${{</math>}} 
as the recurrence for {{<math>}}$c_{1,1}${{</math>}}. We can thus propagate the elements of the row 
vector {{<math>}}$a_1^T${{</math>}} along the {{<math>}}$j${{</math>}}-direction and build up one side 
of the _dot_ products for the row {{<math>}}$c_1^T${{</math>}}.

Generalized to the whole {{<math>}}$A${{</math>}} matrix, this is a set of propagation recurrences 
defined by: {{<math>}}$$ a_{i,j,k} = a_{i,j-1,k}$${{</math>}}

Similarly, the column vector {{<math>}}$b_1^T${{</math>}} is shared between the recurrence of
{{<math>}}$c_{1,1}${{</math>}} and {{<math>}}$c_{2,1}${{</math>}}, and we can propagate
the elements of the column vector {{<math>}}$b_1^T${{</math>}} along the {{<math>}}$i${{</math>}}-direction 
and build up the other side of the _dot_ products for the column {{<math>}}$c_1${{</math>}}. 
Generalized to the whole {{<math>}}$B${{</math>}} matrix, this is a set of propagation recurrences 
defined by: {{<math>}}$$ b_{i,j,k} = b_{i-1,j,k}$${{</math>}}

Once we have the {{<math>}}$A${{</math>}} and {{<math>}}$B${{</math>}} matrix elements distributed 
throughout the lattice, we can finally transform the {{<math>}}$c${{</math>}} recurrence into a 
local neighborhood operand communication as well: 

{{<math>}}$$c_{i,j,k} = c_{i,j,k-1} + a_{i,j-1,k} * b_{i-1,j,k}$${{</math>}}

This completes the transformation to all local neighborhood operand communications with the
system of recurrences we have seen before expressed as a domain flow program:

```

compute ( (i,j,k) | 1 <= i,j,k <= N ) {
    a: a[i,j-1,k]
    b: b[i-1,j,k]
    c: c[i,j,k-1] + a[i,j-1,k] * b[i-1,j,k]
}
    
```	

<a name="history">1</a>: [History of Matrices and Determinants](https://mathshistory.st-andrews.ac.uk/HistTopics/Matrices_and_determinants/)

<a name="matrix-computations">2</a>: [Matrix Computations, Gene Golub and Charles van Loan](https://www.cs.cornell.edu/cv/GVL4/golubandvanloan.htm)
