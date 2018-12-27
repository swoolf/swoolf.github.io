---
layout: post
title: "Entangled Hourglasses"
postorder: 2
tags: myWork iot wood
image: assets/images/project-images/hourglass/cover.jpg
icon: assets/images/project-images/hourglass/icon.jpg
description: >
  the only prescription is...
---

<img src="../assets/images/project-images/hourglass/entangled.jpg" alt="drawing" width="400"/>

Entangled Hourglasses dives into the deep fabric of the space and time dichotomy. The two glasses are always matched; as one is flipped, the other follows. This interactive visual representation of time, allows the observer to receive a temporal signal from anywhere in the world, or universe (provided it has wifi and a power source).

These [Enchanted Objects](../enchantedObjects/){:target= "_blank"} ideally straddle the worlds of art and utility. Like the warmth and indentation left on a pillow each morning, they provide a gentle way to signal someone's recent presence, which, perhaps, could be used to initiate a tea time or an impromptu walk.  

For me, they have been a reason to explore a more hidden and simple connected design. No flashing lights, no buttons, no screen, no speaker (though they do have a pesky power cord. Someone needs to solve this whole battery fiasco). This external simplicity has led to an engaging solution.

<iframe width="560" height="315" src="https://www.youtube.com/embed/UqmnwWWWmj0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br><br>

#### Sensing Hourglass Orientation

In order to control the motor and communicate with the other hourglass, we need to know the orientation of the hourglass wheel. Typically, this is done with some kind of [rotary encoder](https://en.wikipedia.org/wiki/Rotary_encoder){:target="_blank"}. However, most off the shelf encoders rely on a central shaft. As you can see, the hourglasses have no central shaft to mount an encoder on. Additionally, its difficult to account for the fact that the user will fully remove the hourglass from the base, making step counting impossible (which is how many encoders work). Instead, I developed an encoding mechanism that sits entirely in the wooden wheel (though, lead to a bit of build complexity).

In each rim, sit 100 small rare earth magnets. In the base itself, a hall effect sensor is mounted to watch the bottom most part of the wheel. The sensor can see 5 states; No magnetic field, North, South, Super North, Super South (the super states are created by stacking 3 magnets in one spot).

This five state system allows the base to fully control the Entangled Hourglasses. First, if the sensor sees a north or south signal, it knows to turn clockwise or counterclockwise respectively. This ensures that no matter which position the hourglass is placed in, it always will rotate towards the closest pole. Second, if the sensor sees Super North or Super South, it knows to stop rotating as the hourglass has reached a vertical position. Third, if the sensor sees no magnetic field, it knows to stop spinning as there is no hourglass on the base.

The thresholds between these states proved a bit difficult to hone in on. Though, there is a clear signal to process (see diagram). The total magnitude of the signal is subject to variations due to the proximity between base and wheel and sensor location. Thus, the small amount of slop in the system can effect the state interpretation of the system. This slop is combatted by running the system through a full spin homing routine upon startup.

<img src="../assets/images/project-images/hourglass/innards.png" alt="drawing" width="400"/>
<img src="../assets/images/project-images/hourglass/nsDiagram.png" alt="drawing" width="400"/>
<img src="../assets/images/project-images/hourglass/chart.png" alt="drawing" width="400"/>

#### Wheel Rotation mechanism

The inspiration for the spinning mechanism came from 7-11 hot dog rollers. By seating a central wheel in between two spinning rollers, the hourglasses can spin, while remaining fully detached to allow for easy pick up. However, the Entangled Hourglasses aren't heated and don't particularly smell delicious. Check out the first scene in the video above for a visual.

![dogs](http://i.imgur.com/Jvx2brw.gif)

#### Technical Ingredients.

I used a [Particle Photon](https://store.particle.io/collections/photon) as the wifi enabled microprocessor. I used a continuous rotation [hobby servo](https://learn.sparkfun.com/tutorials/hobby-servo-tutorial) with a timing belt to spin the rotating rollers. I used this [hall effect sensor](https://media.digikey.com/pdf/Data%20Sheets/Allegro%20PDFs/A1301,02.pdf).

The units are made from a variety of woods; ash for the wheel fronts, maple veneer for the while sides, walnut for the dark front facing feet, and oak for the back box.

If you're curious, you can find the firmware on [github](https://github.com/swoolf/hourGlass).


Header photo &copy; Sam Woolf 2017<br>
Icon photo &copy; Sam Woolf 2017
{: style="color:gray; font-size: 80%; text-align: left;"}
