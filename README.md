# Jungle-Gym

Jungle-Gym is a generative art project I created to explore the intersection of abstract geometry & programmatic vegetation. 
It creates an aesthetic that combines the purest forms of 3D graphics (poly cubes), with the purest forms of reality (vegetation).


Heres an example 6x6 of 36 raw outputs: https://drive.google.com/file/d/1D0vjuqjKbv1QTqkb3hcQA2NiNlQqMUVr/view?usp=sharing

The project is divided into 3 main graphics buffers: 1 for the gradient background, 1 for the Jungle Gym, 1 for the grain overlay.

The majority of the work is done within the Jungle Gym graphics buffer, which is a 3D WebGL buffer.
Here, a grid of cubes is organized in a random but appealing way, using parametrized noise. Then nested 2D graphics buffers are drawn to each side of the cubes, here is where the vines and leaves are drawn.

Everything in the Jungle Gym outputs is generative and made with code. Tweaking the parameters, configuring color palletes, and refining my outputs will take a long time; but hopefully this project sees the lightof day on fxhash!

I leveraged p5 & WebGL.
