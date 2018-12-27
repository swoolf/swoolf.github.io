---
layout: post
title: "The RainDrop"
postorder: 2
tags: myWork iot wood
image: assets/images/project-images/raindrop/RD_header.jpg
icon: assets/images/project-images/raindrop/RD_slider.jpg
description: >
  time and space and sand and wood
---

<img src="../assets/images/project-images/raindrop/RD_header2.jpg" alt="drawing" width="400"/>

The RainDrop sits beautifully and unobtrusively in your space, giving you a calm insight into the next 60 minutes of rain. Much like an analog clock, a simple glance gives you all the information you need, and helps you focus on more important things, spending less time pulling out your phone or computer.

The RainDrop was inspired by bicycle commuting through Boston. On cloudy days, I found myself checking the weather on my phone every 5 minutes or so. How can I time my 20 minute ride to navigate between the downpours? Anytime I find myself incessantly using my phone, I search for a better solution. Thus came The RainDrop.

Currently there are 10 units around the greater Boston area.

<div class="row text-center">
  <div class="col-md-5" style="width: 300; float: left;">
    <!-- <span> -->
    <h4 class="service-heading">In Action</h4>
    <img id="RDicon" src="../assets/images/project-images/raindrop/full.jpg" alt="slider" style="width:300px;" class="mx-auto">
  </div>
  <div class="col-md-7" style="margin-left: 320;">
    <!-- <p>Choose your forecast</p> -->
    <div>
      <br><br>
      <button class="button" type="button" id="none" onclick="onClick(this.id)">No Rain</button>
      <button class = "button button-en" type="button" id="storm" onclick="onClick(this.id)">Heavy Storm</button>
      <button class="button" type="button" id="half" onclick="onClick(this.id)">Rain Start and Stop</button>
    <div id="chartContainer" style="height: 300px; width: 100%;">
    </div>
  </div>
</div>
</div>
<br><br>

<div></div>

If you're curious, you can find the firmware on [github](https://github.com/swoolf/raindrop).
It involves a simple firmware that sits on the RainDrops themselves that controls the lights and the wifi set up.
Additionally, there is a set of Cloud Functions hosted on Microsoft Azure that handle the heavy lifting; pinging the weather forcast service ([DarkSky](https://darksky.net/)), and determining the location of a newly setup RainDrop.

<br><br>

Header photo &copy; Sam Woolf 2017<br>
Icon photo &copy; Sam Woolf 2017
{: style="color:gray; font-size: 80%; text-align: left;"}

<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
<script>
var minutelyStorm = [0.7355,0.6635,0.5925,0.529,0.493,0.4925,0.5105,0.528,0.529,0.506,0.475,0.4445,0.4175,0.395,0.378,0.3695,0.38,0.3755,0.3705,0.3695,0.367,0.366,0.366,0.365,0.365,0.364,0.3635,0.362,0.3605,0.3585,0.33,0.31,0.32,0.31,0.34,0.346,0.344,0.34349999999999997,0.34349999999999997,0.34249999999999997,0.34049999999999997,0.3445,0.3455,0.34349999999999997,0.3445,0.347,0.3465,0.348,0.36,0.375,0.4,0.41,0.44,0.42,0.41,0.44,0.47,0.4,0.38,0.3565,0.357]
var minutelyHalf = [0,0,0,0,0,0,0,0,0,0,0,0,0.03,0.06,0.1,0.1,0.12,0.12,0.12,0.12,0.14,0.14,0.14,0.14,0.16,0.16,0.16,0.16,0.18,0.18,0.18,0.18,0.18,0.16,0.12,0.08,0.06,0.06,0.06,0.03,0,0,0,0,0,0,0,0,0,0,0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
var minutelyNone =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var data = minutelyStorm;
  function onClick(buttonID){
    document.getElementById('none').classList.remove("button-en");
    document.getElementById('half').classList.remove("button-en");
    document.getElementById('storm').classList.remove("button-en");
    document.getElementById(buttonID).classList.add("button-en");
    if(buttonID=="none"){
      data=minutelyNone;
      document.getElementById("RDicon").src="../assets/images/project-images/raindrop/none.jpg"
    }
    if(buttonID=="half"){
      data=minutelyHalf;
      document.getElementById("RDicon").src="../assets/images/project-images/raindrop/half.jpg"
    }
    if(buttonID=="storm"){
      data=minutelyStorm;
      document.getElementById("RDicon").src="../assets/images/project-images/raindrop/full.jpg"
    }
  }

  window.onload = function () {

  var dps = []; // dataPoints
  var yLabels=[ "Light", "Medium", "Heavy", ""];

  var chart = new CanvasJS.Chart("chartContainer", {
    title :{
    },
    axisY: {
      includeZero: false,
      maximum: .8,
      minimum: 0.01,
      title: "Rain Intensity",
      interval: 0.2,
      labelFormatter: function(e){
          return yLabels[ e.value/.25 | 0]
          return  e.label + "min";
        }

    },
    axisX: {
      labelFormatter: function(e){
          return  e.value + "min";
        }
    },
    data: [{
      type: "splineArea",
      dataPoints: dps
    }]
  });

  var xVal = 0;
  var yVal = 100;
  var updateInterval = 100;
  var dataLength = 60; // number of dataPoints visible at any point
  var minutely = [];
  // var minutelyStorm = [0.7355,0.6635,0.5925,0.529,0.493,0.4925,0.5105,0.528,0.529,0.506,0.475,0.4445,0.4175,0.395,0.378,0.3695,0.38,0.3755,0.3705,0.3695,0.367,0.366,0.366,0.365,0.365,0.364,0.3635,0.362,0.3605,0.3585,0.33,0.31,0.32,0.31,0.34,0.346,0.344,0.34349999999999997,0.34349999999999997,0.34249999999999997,0.34049999999999997,0.3445,0.3455,0.34349999999999997,0.3445,0.347,0.3465,0.348,0.36,0.375,0.4,0.41,0.44,0.42,0.41,0.44,0.47,0.4,0.38,0.3565,0.357]
  // var minutelyHalf = [0,0,0,0,0,0,0,0,0,0,0,0,0.03,0.06,0.1,0.1,0.12,0.12,0.12,0.12,0.14,0.14,0.14,0.14,0.16,0.16,0.16,0.16,0.18,0.18,0.18,0.18,0.18,0.16,0.12,0.08,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.06,0.03,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
  // var minutelyNone =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  // var data = minutelyStorm;

  var updateChart = function (count) {
    for (var j = 0; j < dataLength; j++) {
      if (data[j] ==0){yVal =0}
      else{
        yVal = data[j]+.01*(.5-Math.random()) + (0.02*(.5-Math.random()))*Math.sin(2*j/dataLength+ 2*(.5-Math.random())  );
      }
      // console.log(yVal);
      dps[j]={
        x: j,
        y: yVal,
        label: "High"
      };
      xVal++;
    }
    chart.render();
  };

  updateChart(dataLength);
  setInterval(function(){updateChart()}, updateInterval);

  }
</script>
