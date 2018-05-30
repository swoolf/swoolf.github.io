---
layout: post
postorder: 2
title: "AutoHighlights"
tags: myWork
image: assets/images/project-images/highlights/cover.png
icon: assets/images/project-images/highlights/icon.jpg
description: >
  the only perscription is...
---
Each week I play in a competitive adult small sided soccer league. Not only does the soccer provide a good workout and a competitive outlet, it also provides a strong social network. Each week we chat about the highlights from the week before. These conversations are based solely on our memories from the game. So, I thought, how great would it be to augment these conversations with visuals, namely a highlight reel.

Of course this exists on the professional level, where multiple camera views and professional video editors curate beautiful recaps of the game or match. However, the time and money required makes this strategy a non-starter for an average adult league game. I pondered the question: Is there a way to come up with a (mostly) automated way to create a highlight video?

From polling various athletes in these leagues, many people seem to love the idea of a weekly highlight reel. At least in Boston, there are many people who pay ~$10/week to participate in a sports league, and who say they would gladly pay an extra dollar for a highlight reel. Given the enthusiasm, there seems to be a sniff of a business model here. (Though, Ideally I’d ask the league organizer to foot the cost of the highlight videos, as it would provide them with a fantastic marketing and differentiation tool).

Tasked with creating a way to automatically generate highlight reels for only a couple of dollars each, I built and tested a system that initially focused on my Thursday night soccer league. This system relies on a two main parts. First, by attaching the cameras to the nets, its easy to pick up possible goals by looking for camera shakes. However, this technique also picks up many other false alarms. So, second, each potential goal is then shown to a human classifier (using MechanicalTurk) to determine if it is in fact a goal. Then, all of the confirmed goals are stitched together into a video and posted a video.

While there are still issues with this system, namely misclassifications by MTurk annotators, it is an effective way to pare down hours of a footage into a highlight reel. Here, you can see the first test of the system. Two cameras (goPro) filmed a 50 minute game (~120 minutes total footage). Then, the raw footage was fed into the pipeline producing the following video.

<iframe width="560" height="315" src="https://www.youtube.com/embed/hY-mI8VTfuw?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

#### Future:

The biggest technical hurdle, it seems, is in the camera side of the process. Specifically, the footage leaves a lot to be desired. Even when interesting highlight segments are chosen for the final video, the camera angle and focus don’t do a great job of capturing the play. Also, even the fisheye lens of the go pro cannot capture all of the action.

Second, how can I convince others to set up the cameras on my behalf? Ideally, I want to create a system where others generate the footage on their own, and then simply upload the raw footage into my pipeline for processing. Additionally, how can I count on others to have a high quality camera (charged, plenty of memory) ready to go for each game.

Future steps could include:<br>
-Phone App, so people can use the cameras in their pockets <br>
-Build a camera fixture so its easy for others to attach goPro/smart phone to the net <br>
-Determine a better event signifier than camera shakes. <br>

Additionally, this same core framework could be easily applied to other, potentially lucrative areas, such as High School sports recruiting.

#### Technical info:

![goal](../assets/images/project-images/highlights/goal.gif)

Briefly, I use the openCV library to look for camera shakes. This is accomplished by tracking a grid of image features and watching how they change position frame to frame using the Optical Flow library (See Above). Total changes above a certain threshold trigger a Shake Event.

Subsequently, the footage surrounding the shake event is exported as a GIF using ImageIO library. Then, each GIF is uploaded to Mechanical Turk, and an annotator is given the task of deciding Goal or no Goal.

Finally, based off of the MTurker’s answers, all goals are compiled into a video and uploaded to youTube for enjoyment.

You can find the code on [Github](https://github.com/swoolf/autoHighlight)
