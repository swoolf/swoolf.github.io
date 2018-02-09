---
layout: post
title: "Harmonographs"
postorder: 4
tags: JS pendulums
image: assets/images/project-images/harmono/cover.jpg
icon: assets/images/project-images/harmono/icon.png
description: >
  the only perscription is...
---
<script type="text/javascript" src="/drawing/harmonograph.js"></script>
I built these as a reason to play with JS classes and canvases. 
Each of these can, in theory, be drawn with a harmonograph. Enjoy. 

<canvas id="myCanvas" width="600" height="600"
style="border:1px solid #000000;">
</canvas>

<script>
    var canvasTag = document.getElementById("myCanvas");
    var ctx = canvasTag.getContext("2d");

    var amp = 100;
    var freq = 10;
    var phase = 0;
    var damping = 0.01;
    var plane = 'x';
    
    harmo = new harmonographClass(ctx, canvasTag, [600,600]);
//PendulumClass=function(amplitude,frequency,decay,phase,plane)
    harmo.addPendulumIn(0.0,0.0,0.0,0.0,'x');
    harmo.addPendulumIn(0.0,0.0,0.0,0.0,'y');
    harmo.addPendulumIn(0.0,0.0,0.0,0.0,'x');
    harmo.addPendulumIn(0.0,0.0,0.0,0.0,'y');
    
    harmo.addPendulumFin(200.0,3.57,0.01,0.4,'x');
    harmo.addPendulumFin(200.0,3.571,0.004,1.5,'y');
    harmo.addPendulumFin(100.0,0.07,0.01,2.0,'x');
    harmo.addPendulumFin(100.0,0.08,0.05,1.0,'y');
    
//    harmo.addPendulumFin(200.0,3.57,0.01,1.0,'x');
//    harmo.addPendulumFin(200.0,3.571,0.0,1.5,'y');
//    harmo.addPendulumFin(100.0,0.07,0.01,0.0,'x');
//    harmo.addPendulumFin(100.0,0.08,0.05,1.0,'y');
    
    harmo.addPendulumFin(200.0,0.04,0.01,0.0,'x');
    harmo.addPendulumFin(200.0,0.08,0.01,1.0,'y');
    harmo.addPendulumFin(30.0,3.0,0.01,0.5,'x');
    harmo.addPendulumFin(60.0,3.1,0.01,1.0,'y');
    
    harmo.addPendulumFin(200.0,0.04,0.01,0.3,'x');
    harmo.addPendulumFin(200.0,0.08,0.01,1.0,'y');
    harmo.addPendulumFin(150.0,3.0,0.01,0.5,'x');
    harmo.addPendulumFin(150.0,3.1,0.01,1.0,'y');
    
    harmo.drawChange();
</script>

Header photo &copy; i.ytimg.com/<br>
Icon photo &copy; Sam Woolf 2018<br>
Influences by: http://www.lukewallin.co.uk/ and 
{: style="color:gray; font-size: 80%; text-align: left;"}