
var harmonographClass= function(canvas, canvasTag, canvasSize){
    
    var thisObject = this;
    
    this._canvas=canvas;
    this._canvasTag=canvasTag;
    this._canvasSize=canvasSize;
    this._pendulums=new Array();
    this._pendulumsIn=new Array();
    this._pendulumsFin=new Array();
    
    this.ratio=0;
    this.goingUp=true;
    this.count=0;
    
    this._timeLimit = 1000;
    this._timeStep=0.01;
    this._drawAtOnce=0.2;
    
    this._amplitudeCutOff = 20;
    this._drawSpeed=10;
    
    this._canvas.lineWidth=0.2;
    
    
    this.addPendulum=function(amp,freq,phase,damping,plane){
		var p=new PendulumClass(amp,freq,phase,damping,plane);
		this._pendulums.push(p);
	}
    
    this.addPendulumIn=function(amp,freq,phase,damping,plane){
		var p=new PendulumClass(amp,freq,phase,damping,plane);
		this._pendulumsIn.push(p);
	}
    this.addPendulumFin=function(amp,freq,phase,damping,plane){
		var p=new PendulumClass(amp,freq,phase,damping,plane);
		this._pendulumsFin.push(p);
	}
    
    this.draw=function(){
		this._canvas.clearRect(0,0,this._canvasSize[0],this._canvasSize[1]);
		this._canvas.beginPath();
		
		var centreX=this._canvasSize[0]/2
		var centreY=this._canvasSize[1]/2
		var t=0;
		while(this._stillOscilating(t)){
			var x=centreX;
			var y=centreY;
			
			for(var i=0;i<this._pendulums.length;i++){
				if(this._pendulums[i].plane=='x'){
					x+=this._pendulums[i].path(t);
				}else{
					y+=this._pendulums[i].path(t);
				}
			}
			
			if(t==0){
				this._canvas.moveTo(x,y);
			}else{
				this._canvas.lineTo(x,y);
			}
			
			t+=this._timeStep;
			
			
		}
		this._canvas.stroke();
        
	}
    
    
    this.drawChange=function(){
        thisObject._canvas.clearRect(0,0,thisObject._canvasSize[0],thisObject._canvasSize[1]);
		thisObject._canvas.beginPath();
		thisObject._pendulums = thisObject.interPen(thisObject._pendulumsIn, thisObject._pendulumsFin, thisObject.ratio, thisObject.count);
        
//        console.log(thisObject._pendulums);
        
		var centreX=thisObject._canvasSize[0]/2
		var centreY=thisObject._canvasSize[1]/2
		var t=0;
		while(thisObject._stillOscilating(t)){
			var x=centreX;
			var y=centreY;
			
			for(var i=0;i<thisObject._pendulums.length;i++){
				if(thisObject._pendulums[i].plane=='x'){
					x+=thisObject._pendulums[i].path(t);
				}else{
					y+=thisObject._pendulums[i].path(t);
				}
			}
			
			if(t==0){
				thisObject._canvas.moveTo(x,y);
			}else{
				thisObject._canvas.lineTo(x,y);
			}
			
			t+=thisObject._timeStep;
		}
        
        console.log(thisObject.ratio);
		thisObject._canvas.stroke();
        if (thisObject.ratio >1){	thisObject.goingUp = false; }
        if (thisObject.ratio<=0.05){
            if (!thisObject.goingUp){
                thisObject.count += 1;
                if(thisObject.count >= 3){thisObject.count=0;}
                }
            thisObject.goingUp=true;                    
            }
        
        if (thisObject.goingUp){ thisObject.ratio+=0.02; }
        else                    {thisObject.ratio+= -.08; }
        setTimeout(thisObject.drawChange,10);
    }
    
	this.interPen=function(initPens, finalPens, ratio, num){
        var curPens = new Array();
        for(var i=0;i<initPens.length;i++){
            var amp = initPens[i].a + (finalPens[i+num*4].a - initPens[i].a)*ratio;
            var freq = initPens[i].f + (finalPens[i+num*4].f - initPens[i].f)*ratio;
            var phase = initPens[i].p + (finalPens[i+num*4].p - initPens[i].p)*ratio;
            var dec = initPens[i].d + (finalPens[i+num*4].d - initPens[i].d)*ratio;
            var plane = initPens[i].plane;
            curPens.push(new PendulumClass(amp, freq, dec, phase, plane));
        }
//        console.log(curPens[2].a);
        return curPens;
    }
    
	this.drawSlow=function(){
		
//		this._cancelDrawSlow();
		
		this._canvas.clearRect(0,0,this._canvasSize[0],this._canvasSize[1]);
		
		this._centreX=this._canvasSize[0]/2
		this._centreY=this._canvasSize[1]/2
		this._t=0;
		this._drawSlowPart();
	}
	
	this._drawSlowPart=function(){
		
		thisObject._canvas.beginPath();
		
		for (var j = 0; j < thisObject._drawAtOnce; j += thisObject._timeStep) {
			var x = thisObject._centreX;
			var y = thisObject._centreY;
			
			for (var i = 0; i < thisObject._pendulums.length; i++) {
				if (thisObject._pendulums[i].plane=='x') {
					x += thisObject._pendulums[i].path(thisObject._t);
				}
				else {
					y += thisObject._pendulums[i].path(thisObject._t);
				}
			}
			
			if (j == 0) {
				thisObject._canvas.moveTo(x, y);
			}
			else {
				thisObject._canvas.lineTo(x, y);
			}
			
			thisObject._t += thisObject._timeStep;
		}
		
		//don't leave gaps in the spiral
		thisObject._t -= thisObject._timeStep;
		thisObject._canvas.stroke();
		
		if(thisObject._stillOscilating(thisObject._t)){
			thisObject._drawingSlow=setTimeout(thisObject._drawSlowPart,thisObject._drawSpeed);
		}
	}
    
    this._stillOscilating=function(t){
		
		if(t>this._timeLimit){return false;}
        
		for(var i=0;i<this._pendulums.length;i++){
			if(this._pendulums[i].d==0){return true;}//no damping
            else if(Math.pow(Math.E,-this._pendulums[i].d*t)*this._pendulums[i].a > this._amplitudeCutOff){
					return true;
				}
		}
		return false;
	}
}

var PendulumClass=function(amplitude,frequency,decay,phase,plane){
	
	this.a=amplitude;
	this.f=frequency;
	this.p=phase;
	this.d=decay;
	this.plane=plane;
	
	this.path=function(t){
		return this.a*(Math.cos(this.f*t + this.p*Math.PI)*Math.pow(Math.E,-this.d*t));
	}
}