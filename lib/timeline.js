// timeline.js v0.1 / 2011-11-01
//
// A JavaScript library for timeline visualisation/navigation inside audio/video content.
// by Samuel Goldszmidt
// This library is initialy based on Marcin Ignac Timeline.js v0.1 
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.


var Timeline = function(media, timeline, scale, scroll, duration, override_options) {
	
	// default options
	this.options = {
						'height':160,
						'width':400,
						'scaleHeight':30,
						'scaleBackgroundColor':'#111', 
						'scaleColor':'#ccc',
						'backgroundColor':'#aaa',
						'textColor':'#eee',
						'cursorColor':'#f00',
						'maxScaleFactor':4,
						'numberOfTracks':1,
						'periodShape':'rectangle'
	}
	if(override_options){
		if(override_options.numberOfTracks){
			this.options.numberOfTracks = override_options.numberOfTracks
		}
		if(override_options.periodShape){
			this.options.periodShape = override_options.periodShape
		}
	}
	// DOM elements
	this.timeline = document.getElementById(timeline);
	this.media = document.getElementById(media);
	this.scale = document.getElementById(scale);
	this.scroll = document.getElementById(scroll);
	
	// Other vars
	this.duration = duration;
	this.time = 0;
	this.maxScaleFactor = this.options.maxScaleFactor;
	this._periods = []
	this._markers = []
	
	// Initialize
	this.initGUI();
	this.addEventListeners();

	/* 
	this.draggingScale = false;
	this.draggingScroll = false;
	this.setCurrentTime = false;
	this.followCursor = false
	*/

};

// EVENTS

Timeline.prototype.addEventListeners = function(){
	var self = this;
	this.media.addEventListener('timeupdate', function(event) {
		self.onTimeUpdate(event);
	}, false);
	this.scale.addEventListener('change', function(event){
		self.onScaleUpdate(event)
	}, false);
	this.scroll.addEventListener('change', function(event){
		self.onScrollUpdate(event)
	}, false);	 
	   
	this.canvas.addEventListener('click', function(event) {
		self.onMouseClick(event);
	}, false);
	this.canvas.addEventListener('mousedown', function(event) {
		self.onMouseDown(event);
	}, false);
	
	document.body.addEventListener('mousemove', function(event) {
		self.onDocumentMouseMove(event);
	}, false);
	
	this.canvas.addEventListener('mousemove', function(event) {
		self.onCanvasMouseMove(event);
	}, false);
	this.canvas.addEventListener('mouseup', function(event) {
		self.onMouseUp(event);
	}, false);
	
	document.body.addEventListener('scroll', function(event) {
		self.onScroll(event)
	})
}

Timeline.prototype.onTimeUpdate = function(event){
	this.time = this.media.currentTime
	this.updateGUI()
}
Timeline.prototype.onScaleUpdate = function(event){
	this.scroll.setAttribute('max', Math.max(0, this.duration - this.getWindowVisibleTime()))
	this.updateGUI()	
}
Timeline.prototype.onScrollUpdate = function(event){
	this.updateGUI()
}
Timeline.prototype.onMouseClick = function(event){    
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this.timeline;
    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)
    var x = event.pageX - totalOffsetX;
	var y = event.pageY-totalOffsetY;
	var mouse_time = this.xToTime(x)
	if(y > this.options.scaleHeight && y < this.options.height){
	for(var i=0; i<this._periods.length; i++){
		var period = this._periods[i];
		if(mouse_time > period.time_in && mouse_time < period.time_out && y > this.yTrack(period.track).top && y < this.yTrack(period.track).bottom){
			mouse_time = period.time_in
		}
	}
	}
	
	this.media.currentTime = mouse_time
	
}
Timeline.prototype.onMouseDown = function(event){

}
Timeline.prototype.onMouseUp = function(event){

}
Timeline.prototype.onCanvasMouseMove = function(event){

}
Timeline.prototype.onDocumentMouseMove = function(event){
	
}

Timeline.prototype.onScroll = function(event){

}

// METHODS

Timeline.prototype.initGUI = function() {
    //this.width = parseInt(this.timeline.style.width.split('px')[0])
    this.timeline.style.height = this.options.height+"px";
    this.timeline.style.background = this.options.backgroundColor;
    this.canvas = document.createElement("canvas");
    this.c = this.canvas.getContext("2d");
    this.timeline.appendChild(this.canvas);
    this.canvas.width = this.options.width;
	this.canvas.height = this.options.height;
    this.scale.setAttribute("max", this.maxScaleFactor * this.canvas.width / this.duration) 
    this.initialRatio = this.options.width/this.duration
    this.updateGUI()
}

Timeline.prototype.updateGUI = function() {
    this.canvas.width = this.options.width;
    var lastTimeLabelX = 0;

	// timeline
    this.drawRect(0, 0, this.options.width, this.options.scaleHeight, this.options.scaleBackgroundColor)
    var x = this.timeToX(0);
	this.c.fillStyle = this.options.textColor;
    var sec = 0;
    while (x < this.canvas.width && sec < this.duration) {
        x = this.timeToX(sec);
        var anchor_height = 5
		var anchor_end = this.options.scaleHeight
		if(sec % 10 == 0) anchor_height = 10;
		if(sec % 30 == 0) {anchor_height = 15; anchor_end = this.options.height};
		if(sec % 60 == 0) {anchor_height = 20; anchor_end = this.options.height};
        this.drawLine(x, this.options.scaleHeight-anchor_height, x, anchor_end, this.options.scaleColor);
		var hours = parseInt( sec / 3600 ) % 24;
		var minutes = parseInt( sec / 60 ) % 60;
		var seconds = sec % 60;
		time = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
        if (x - lastTimeLabelX > 50) {
            this.c.fillText(time, x - 20, 10);
            lastTimeLabelX = x;
        }
        sec += 1;
    }

	// tracks
	for(var i=0; i<this.options.numberOfTracks; i++){
		this.drawLine(0, i*(this.options.height-this.options.scaleHeight)/this.options.numberOfTracks+this.options.scaleHeight,this.options.width,i*(this.options.height-this.options.scaleHeight)/this.options.numberOfTracks+this.options.scaleHeight,'#222')
	}

	// periods
    for(var i=0; i<this._periods.length; i++){
		var obj = this._periods[i]
		if(this.options.periodShape == 'rectangle'){
			this.drawRect(this.timeToX(obj.time_in), this.yTrack(obj.track).top, this.timeToX(obj.time_out)-this.timeToX(obj.time_in), this.yTrack(obj.track).bottom-this.yTrack(obj.track).top, obj.color )
		}
		if(this.options.periodShape == 'bubble'){
			this.drawBubble(this.timeToX(obj.time_in), this.yTrack(obj.track).top, this.timeToX(obj.time_out)-this.timeToX(obj.time_in), this.yTrack(obj.track).bottom-this.yTrack(obj.track).top, obj.color )			
		}
	}
	
	// markers
	for(var i=0; i<this._markers.length; i++){
		var obj = this._markers[i]
		this.drawLine(this.timeToX(obj.time), this.options.scaleHeight, this.timeToX(obj.time), this.options.height-1, obj.color)
	}
	// time ticker (cursor)
	this.drawLine(this.timeToX(this.time), 0, this.timeToX(this.time), this.options.height, this.options.cursorColor);
	
}


Timeline.prototype.addPeriod = function(time_in, time_out, color, track){
	if(track == undefined){ track = 1}
	this._periods.push({time_in:parseInt(time_in), time_out:parseInt(time_out), color:color, track:track})
	this.updateGUI()
}
Timeline.prototype.addMarker = function(time, color){
	this._markers.push({time:parseInt(time), color:color})
	this.updateGUI()
}

// TIME-X CONVERSION UTILS

Timeline.prototype.timeToX = function(time) {
    //var visibleTime = this.xToTime(this.w)
    //var visibleTime = this.duration * this.scale.value
    var visibleTime = this.getWindowVisibleTime()
    if (visibleTime < this.duration) {
        time = time - this.scroll.value;
    }
    return time * this.scale.value * this.initialRatio;
}

Timeline.prototype.xToTime = function(x) {
    var visibleTime = this.getWindowVisibleTime()
    var timeShift = Math.max(0, this.scroll.value);
    //timeShift = 100
    return x/(this.scale.value * this.initialRatio) + timeShift;
}

// Y CONVERSION UTILS

Timeline.prototype.yTrack = function(track){
	top_position = (track-1)*(this.options.height-this.options.scaleHeight)/this.options.numberOfTracks+this.options.scaleHeight;
	bottom_position = track*(this.options.height-this.options.scaleHeight)/this.options.numberOfTracks+this.options.scaleHeight;
	var positions = {top:top_position, bottom:bottom_position}
	return positions
}

Timeline.prototype.getWindowVisibleTime = function(){
	return this.duration / this.scale.value
}

// DRAW UTILS

Timeline.prototype.drawLine = function(x1, y1, x2, y2, color) {
    this.c.strokeStyle = color;
    this.c.beginPath();
    this.c.moveTo(x1, y1);
    this.c.lineTo(x2, y2);
    this.c.stroke();
}

Timeline.prototype.drawRect = function(x, y, w, h, color) {
    this.c.fillStyle = color;
    this.c.fillRect(x, y, w, h);
}

Timeline.prototype.drawBubble = function(x, y, w, h, color){
	//console.log('here', x)
	var cx = x+w/2
	
	var cy = y
	var r = w/2
	this.c.fillStyle = color;
	this.c.beginPath();
	this.c.moveTo(x, this.options.scaleHeight)
	this.c.quadraticCurveTo(x, this.options.scaleHeight+h+y, x+w/2, this.options.scaleHeight+h+y)
	this.c.quadraticCurveTo(x+w, this.options.scaleHeight+h+y, x+w, this.options.scaleHeight)
	this.c.moveTo(x, this.options.scaleHeight)
	this.c.fill()
	this.c.closePath();
	this.c.fill();	
}

Timeline.prototype.drawCircle = function(cx, cy, r, color){
	this.c.fillStyle = color;
	this.c.beginPath();
	this.c.arc(cx, cy, r, 0, Math.PI*2, true);
	this.c.closePath();
	this.c.fill();
}

Timeline.prototype.drawCenteredRect = function(x, y, w, h, color) {
    this.c.fillStyle = color;
    this.c.fillRect(x - w / 2, y - h / 2, w, h);
}

Timeline.prototype.drawRombus = function(x, y, w, h, color, drawLeft, drawRight, strokeColor) {
    this.c.fillStyle = color;
    if (strokeColor) {
        this.c.lineWidth = 2;
        this.c.strokeStyle = strokeColor;
        this.c.beginPath();
        this.c.moveTo(x, y - h / 2);
        this.c.lineTo(x + w / 2, y);
        this.c.lineTo(x, y + h / 2);
        this.c.lineTo(x - w / 2, y);
        this.c.lineTo(x, y - h / 2);
        this.c.stroke();
        this.c.lineWidth = 1;
    }

    if (drawLeft) {
        this.c.beginPath();
        this.c.moveTo(x, y - h / 2);
        this.c.lineTo(x - w / 2, y);
        this.c.lineTo(x, y + h / 2);
        this.c.fill();
    }

    if (drawRight) {
        this.c.beginPath();
        this.c.moveTo(x, y - h / 2);
        this.c.lineTo(x + w / 2, y);
        this.c.lineTo(x, y + h / 2);
        this.c.fill();
    }
}



