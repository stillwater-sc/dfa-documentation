+++
weight = 15
title = "Wavefronts of Computation"

WebGLRenderTarget = true
WavefrontAnimation = true
RenderTargetName = "wavefront_animation"

+++
<style>
#c {
    float: bottom;
    padding: 5px;
    width: 800px;
    height: 600px;
}
</style>

Recap of this chapter: domain flow algorithms are defined as systems of
recurrence equations, which represent information propagation through a
computational spacetime. This spacetime is created by the spatial organization
of compute elements and their intercommunication structure. The data
dependencies inherent to the recurrence equations define an implicit
partial order, called the free schedule, and we can further constrain
that partial order using piecewise linear schedules to minimize the
need for storage elements.

The animation below shows different schedules and the emergent behavior
of the computational wavefront.

<canvas id="c"></canvas>


