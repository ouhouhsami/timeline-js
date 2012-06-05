/*!
 * timeline.js
 * @version 0.1.0
 * @author <a href="mailto:samuel.goldszmidt@gmail.com">Samuel Goldszmidt</a>
 * @description 
 * <p>Javascript library for timeline representation of <audio /> <video /> HTML5 tag.</p>
 * <p>Copyright (C) 2011 Samuel Goldszmidt</p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/**
 * Creates an instance of Timeline.
 *
 * @constructor
 * @this {Circle}
 * @param {String} media The Id of the media (audio/video) element tag
 * @param {String} timeline The Id of the timeline (div) element tag
 * @param {Number} duration The duration of the media in seconds
 * @param {Object} [override_options] Options for configuration of the timeline
 * @param {Number} [override_options.height] The height of the entire timeline (applied to timeline div tag).
 * @param {Number} [override_options.width] The width of the entire timeline (applied to timeline div tag).
 * @param {Number} [override_options.scaleHeight] The scale height of the timeline scale (applied to timeline div tag).
 * @param {String} [override_options.scaleBackgroundColor] The background color of the scale of the timeline.
 * @param {String} [override_options.scaleColor] The scale color of the timeline.
 * @param {String} [override_options.trackSeparatorColor] The track separator color of the timeline.
 * @param {String} [override_options.backgroundColor] The background color of the timeline.
 * @param {String} [override_options.textColor] The color of the text on the timeline.
 * @param {String} [override_options.cursorColor] The color of the cursor on the timeline.
 * @param {Number} [override_options.maxScaleFactor] The max scale factor of the timeline.
 * @param {Number} [override_options.numberOfTracks] The number of track to display on the timeline.
 * @param {String} [override_options.periodShape] The type of shape for periods on the timeline.
 * @param {String} [override_options.cursorHeight] The height of the cursor on the timeline.
 * @param {String} [scale] The Id of the scale (input range) element tag
 * @param {String} [scroll] The Id of the scale (input range) element tag
*/

var Timeline = function(media, timeline, duration, override_options, scale, scroll) {
	// default options
	this.options = {
						'height':60,
						'width':400,
						'scaleHeight':30,
						'scaleBackgroundColor':'#111', 
						'scaleColor':'#ccc',
						'trackSeparatorColor':'#fff',
						'backgroundColor':'#ddd',
						'textColor':'#eee',
						'cursorColor':'#f00',
						'maxScaleFactor':5,
						'numberOfTracks':1,
						'periodShape':'rectangle',
						'cursorHeight':60,
						//'followCursor':true,
						'mode':'read',
						'newPeriodColor':'#0A3AEE'
	}
	
	
	if(override_options){
		
		this.options.height = (typeof override_options.height == 'undefined') ? this.options.height : override_options.height;	
		this.options.width = (typeof override_options.width == 'undefined') ? this.options.width : override_options.width;	
		this.options.scaleHeight = (typeof override_options.scaleHeight == 'undefined') ? this.options.scaleHeight : override_options.scaleHeight;	
		this.options.scaleBackgroundColor = (typeof override_options.scaleBackgroundColor == 'undefined') ? this.options.scaleBackgroundColor : override_options.scaleBackgroundColor;	
		this.options.scaleColor = (typeof override_options.scaleColor == 'undefined') ? this.options.scaleColor : override_options.scaleColor;	
		this.options.trackSeparatorColor = (typeof override_options.trackSeparatorColor == 'undefined') ? this.options.trackSeparatorColor : override_options.trackSeparatorColor;	
		this.options.backgroundColor = (typeof override_options.backgroundColor == 'undefined') ? this.options.backgroundColor : override_options.backgroundColor;	
		this.options.textColor = (typeof override_options.textColor == 'undefined') ? this.options.textColor : override_options.textColor;	
		this.options.cursorColor = (typeof override_options.cursorColor == 'undefined') ? this.options.cursorColor : override_options.cursorColor;	
		this.options.cursorHeight = (typeof override_options.cursorHeight == 'undefined') ? this.options.cursorHeight : override_options.cursorHeight;	
		this.options.mode = (typeof override_options.mode == 'undefined') ? this.options.mode : override_options.mode;	
		
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
	if(scale){
		this.scale = document.getElementById(scale);
		//console.log(this.scale, scale)
	};
	if(scroll){
		this.scroll = document.getElementById(scroll)
	};
	
	// Other vars
	this.duration = duration;
	this.time = 0;
	this._periods = [];
	this._markers = [];
	
	
	//this._currentActives = []
	this.updateTarget = null; // for update mode, need to know the target the user want to udpate
	this.updateAnchor = null; // for update mode, need to know, for periods, if it's a left or right udapte (timein or timeout)
	this._updateFixed = false; // special var 
	
	
	this.mouseDownEvent = null;
	this.mouseUpEvent = null;
	
	// Initialize
	this.initGUI();
	this.addEventListeners();

	/* 
	this.draggingScale = false;
	this.draggingScroll = false;
	this.setCurrentTime = false;
	this.followCursor = false
	*/
	
	
	return this
	

};

// EVENTS

/**
 * @private
 */

Timeline.prototype.addEventListeners = function(){
	var self = this;
	this.media.addEventListener('timeupdate', function(event) {
		self.onTimeUpdate(event);
	}, false);
	if(this.scale){
		this.scale.addEventListener('change', function(event){
			self.onScaleUpdate(event)
		}, false);
	}
	if(this.scroll){
		this.scroll.addEventListener('change', function(event){
			self.onScrollUpdate(event)
		}, false);	 
	}
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

/**
 * @event
 * @param  event
 * @private
 */
Timeline.prototype.onTimeUpdate = function(event){
	this.time = this.media.currentTime
	// dispatch current 'active' elements	
	/*
	for(var i=0; i<this._periods.length; i++){
		if(this.time > this._periods[i].time_in && this.time < this._periods[i+1].time_out){
			//console.log("go", this._periods[i].id)
			if(this._currentActives.indexOf(this._periods[i].id) == -1){
				this._currentActives.push(this._periods[i].id)
			}	
		}else {
			if(this._currentActives.indexOf(this._periods[i].id) != -1){
				this._currentActives.splice(this._currentActives.indexOf(this._periods[i].id), 1);
			}			
		}
	}
	console.log(this._currentActives)
	*/
	this.updateGUI()
}
/**
 * @event
 * @param  event
 * @private
 */
Timeline.prototype.onScaleUpdate = function(event){
	this.scroll.setAttribute('max', Math.max(0, this.duration - this.getWindowVisibleTime()))
	this.updateGUI()	
}
/**
 * @event
 * @param  event
 * @private
 */
Timeline.prototype.onScrollUpdate = function(event){
	this.updateGUI()
}
/**
 * @event
 * @param  event
 * @private
 */
Timeline.prototype.onMouseClick = function(event){    
/*    
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
	var y = event.pageY - totalOffsetY;
	*/
	var pos = this.getRelativePosition({x:event.pageX, y:event.pageY })
	var mouse_time = this.xToTime(pos.x)
	if(pos.y > this.options.scaleHeight && pos.y < this.options.height){
		for(var i=0; i<this._periods.length; i++){
			var period = this._periods[i];
			if(mouse_time > period.time_in && mouse_time < period.time_out && pos.y > this.yTrack(period.track).top && pos.y < this.yTrack(period.track).bottom){
				mouse_time = period.time_in
				if(this.options.mode == 'delete'){
					this._periods.splice(i,1)
					this.updateGUI()
					return false
				}
				this.media.currentTime = mouse_time
			}
		}
	}
	if(pos.y>0 && pos.y<this.options.scaleHeight){
		this.media.currentTime = mouse_time
	}
}
/**
 * @event
 * @param  event
 * @private
 */
Timeline.prototype.onMouseDown = function(event){
	this.mouseDownEvent = event
	if(this.options.mode == 'update'){
		this._updateFixed = true
	}
}
/**
 * @event
 * @param  event
 * @private
 */
Timeline.prototype.onMouseUp = function(event){
	this.mouseUpEvent = event
	var initial_point = this.getRelativePosition({x:this.mouseDownEvent.pageX, y:this.mouseDownEvent.pageY})
	var final_point = this.getRelativePosition({x:this.mouseUpEvent.pageX, y:this.mouseUpEvent.pageY})
	if(this.options.mode == 'create'){
		if(initial_point == final_point){
			// create marker
		}
		else {
			// create period
			var period_id = this.addPeriod(this.xToTime(initial_point.x), this.xToTime(final_point.x), this.options.newPeriodColor, this.yToTrack(final_point.y))
			try{
				$(this).trigger('createperiod', [this.xToTime(initial_point.x), this.xToTime(final_point.x), this.options.newPeriodColor, this.yToTrack(final_point.y), "", period_id]);
			}
			catch(err){
				
			}
		}
	}
	if(this.options.mode == 'update'){
		if(this.updateAnchor == 'right'){
			this._periods[this.updateTarget].time_out = this.xToTime(final_point.x)
		}else {
			this._periods[this.updateTarget].time_in = this.xToTime(final_point.x)
		}
		this._updateFixed = false
		this.updateGUI()
	}
}
/**
 * @event
 * @param  event
 * @private
 */
Timeline.prototype.onCanvasMouseMove = function(event){
	if(this.options.mode == 'update' && this._updateFixed == false){
		var pos = this.getRelativePosition({x:event.pageX, y:event.pageY })
		var mouse_time = this.xToTime(pos.x)
		for(var i=0; i<this._periods.length; i++){
			var period = this._periods[i];
			if(mouse_time > period.time_in && mouse_time < period.time_out && pos.y > this.yTrack(period.track).top && pos.y < this.yTrack(period.track).bottom){
				this.updateTarget = i
				this.updateAnchor = 'right'
				if(Math.abs(period.time_in-mouse_time) < Math.abs(period.time_out-mouse_time)){
					this.updateAnchor = 'left'
				}
			}
		}		
	}
}
/**
 * @event
 * @param  event
 * @private
 */
Timeline.prototype.onDocumentMouseMove = function(event){
	
}
/**
 * @event
 * @param  event
 * @private
 */
Timeline.prototype.onScroll = function(event){

}

// METHODS

/**
 * @private
 */

Timeline.prototype.initGUI = function() {
    this.timeline.style.height = this.options.height+"px";
    this.timeline.style.width = this.options.width+'px'
    this.timeline.style.background = this.options.backgroundColor;
    if(!this.canvas){
    	this.canvas = document.createElement("canvas");
    	this.c = this.canvas.getContext("2d");
	}
    this.timeline.appendChild(this.canvas);
    this.canvas.width = this.options.width;
	this.canvas.height = this.options.height;
	if(this.scale){
    	this.scale.setAttribute("max", this.options.maxScaleFactor )
	}
    this.initialRatio = this.options.width/this.duration
    this.updateGUI()
}

/**
 * @private
 */

Timeline.prototype.updateGUI = function() {
	this.canvas.width = this.options.width;
	this.canvas.height = this.options.height;
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
		this.drawLine(0, i*(this.options.height-this.options.scaleHeight)/this.options.numberOfTracks+this.options.scaleHeight,this.options.width,i*(this.options.height-this.options.scaleHeight)/this.options.numberOfTracks+this.options.scaleHeight,this.options.trackSeparatorColor)
	}

	// periods
    for(var i=0; i<this._periods.length; i++){
		var obj = this._periods[i]
		if(this.options.periodShape == 'rectangle'){
			if(this.time > obj.time_in && this.time < obj.time_out){
				this.drawRect(this.timeToX(obj.time_in), this.yTrack(obj.track).top, this.timeToX(obj.time_out)-this.timeToX(obj.time_in), this.yTrack(obj.track).bottom-this.yTrack(obj.track).top, obj.color, obj.label, true )
			}
			else {
				this.drawRect(this.timeToX(obj.time_in), this.yTrack(obj.track).top, this.timeToX(obj.time_out)-this.timeToX(obj.time_in), this.yTrack(obj.track).bottom-this.yTrack(obj.track).top, obj.color, obj.label)				
			}
		}
		if(this.options.periodShape == 'bubble'){
			if(this.time > obj.time_in && this.time < obj.time_out){
				this.drawBubble(this.timeToX(obj.time_in), this.yTrack(obj.track).top, this.timeToX(obj.time_out)-this.timeToX(obj.time_in), this.yTrack(obj.track).bottom-this.yTrack(obj.track).top, obj.track, obj.color, obj.label, true)
			}else {
				this.drawBubble(this.timeToX(obj.time_in), this.yTrack(obj.track).top, this.timeToX(obj.time_out)-this.timeToX(obj.time_in), this.yTrack(obj.track).bottom-this.yTrack(obj.track).top, obj.track, obj.color, obj.label)
			}
		}
	}
	
	// markers
	for(var i=0; i<this._markers.length; i++){
		var obj = this._markers[i]
		this.drawLine(this.timeToX(obj.time), this.options.scaleHeight, this.timeToX(obj.time), this.options.height-1, obj.color)
	}
	// time ticker (cursor)
	this.drawLine(this.timeToX(this.time), 0, this.timeToX(this.time), this.options.cursorHeight, this.options.cursorColor);
}

/**
 * Add Period
 * @param {Number} time_in The time in of the period in seconds
 * @param {Number} time_out The time out of the period in seconds
 * @param {String} color The color of the period
 * @param {Number} [track] The track number where the period must be
 */
Timeline.prototype.addPeriod = function(time_in, time_out, color, track, label, id){
	if(id){
		var id
	}else{
		var id = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}
	if(track == undefined){track = 1}
	var period = {id:id, time_in:parseFloat(time_in), time_out:parseFloat(time_out), color:color, track:track}
	if(label != undefined){period.label = label; }
	this._periods.push(period)
	this.updateGUI()
	return id
}
/**
 * Add Marker
 * @param {Number} time_in The time in of the marker in seconds
 * @param {String} color The color of the marker
 */
// TODO ADD Track position of the marker
Timeline.prototype.addMarker = function(time, color){
	this._markers.push({time:parseInt(time), color:color})
	this.updateGUI()
}
/**
 * Live set option
 */
Timeline.prototype.setOption = function(name, value){
	this.options[name] = value
	this.initGUI()
}
/**
 * Live get option
 */
Timeline.prototype.getOption = function(name){
	return this.options[name]
}
/**
 * Live set options
 */
/* TO TEST
Timeline.prototype.setOptions = function(obj){
	for(key in Object.keys(obj)){
		this.options[key] = obj[key]
	}
	this.initGUI()
}
*/
// TIME-X CONVERSION UTILS

/**
 * @private
 */
Timeline.prototype.timeToX = function(time) {
    //var visibleTime = this.xToTime(this.w)
    //var visibleTime = this.duration * this.scale.value
    var visibleTime = this.getWindowVisibleTime()
    if (visibleTime < this.duration) {
        time = time - this.scroll.value;
    }
	if(this.scale){
    	return time * this.scale.value * this.initialRatio;
	}
	else {
		return time * 1 * this.initialRatio;
	}
}
/**
 * @private
 */
Timeline.prototype.xToTime = function(x) {
    var visibleTime = this.getWindowVisibleTime()
    if(this.scroll){
    	var timeShift = Math.max(0, this.scroll.value);
	}else {
		var timeShift = 0
	}
	if(this.scale){
    	return x/(this.scale.value * this.initialRatio) + timeShift;
	}
	else {
		return x/(1 * this.initialRatio) + timeShift;
	}
    
}

// Y CONVERSION UTILS
/**
 * @private
 */
Timeline.prototype.yTrack = function(track){
	top_position = (track-1)*(this.options.height-this.options.scaleHeight)/this.options.numberOfTracks+this.options.scaleHeight;
	bottom_position = track*(this.options.height-this.options.scaleHeight)/this.options.numberOfTracks+this.options.scaleHeight;
	var positions = {top:top_position, bottom:bottom_position}
	return positions
}
Timeline.prototype.yToTrack = function(y){
	var track_height = (this.options.height-this.options.scaleHeight)/this.options.numberOfTracks
	for(var j=0; j<this.options.numberOfTracks; j++){
		if(y>this.options.scaleHeight+j*track_height && y<this.options.scaleHeight+(j+1)*track_height){
			return j+1
		}
	}
	return 1
}
/**
 * @private
 */
Timeline.prototype.getWindowVisibleTime = function(){
	if(this.scale){
		return this.duration / this.scale.value
	}else {
		return this.duration 
	}
}
// X,Y CONVERSION UTILS
/**
 * @private
 */
Timeline.prototype.getRelativePosition = function(obj){
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
    var x = obj.x - totalOffsetX;
	var y = obj.y - totalOffsetY;
	return {x:x, y:y}
}

// DRAW UTILS
/**
 * @private
 */
Timeline.prototype.drawLine = function(x1, y1, x2, y2, color) {
    this.c.strokeStyle = color;
	this.c.lineWidth = 1
    this.c.beginPath();
    this.c.moveTo(x1, y1);
    this.c.lineTo(x2, y2);
    this.c.stroke();
}
/**
 * @private
 */
Timeline.prototype.drawRect = function(x, y, w, h, color, label, highlight) {
    this.c.fillStyle = color;
	this.c.strokeStyle = '#FF0';
	this.c.lineWidth = 3
    this.c.fillRect(x, y, w, h);
	//if(highlight){this.c.stroke();}
}
/**
 * @private
 */
Timeline.prototype.drawBubble = function(x, y, w, h, t, color, label, highlight){
	var cx = x+w/2
	var h_track = (this.options.height - this.options.scaleHeight)/this.options.numberOfTracks*t
	var cy = y
	var r = w/2
	this.c.fillStyle = color;
	this.c.strokeStyle = '#FF0';
	this.c.lineWidth = 3
	this.c.beginPath();
	this.c.moveTo(x, this.options.scaleHeight)
	this.c.quadraticCurveTo(x, this.options.scaleHeight+h_track, x+w/2, this.options.scaleHeight+h_track)
	this.c.quadraticCurveTo(x+w, this.options.scaleHeight+h_track, x+w, this.options.scaleHeight)
	this.c.moveTo(x, this.options.scaleHeight)
	this.c.fill();
	if(highlight){this.c.stroke();}
	this.c.closePath();
	if(label){
		label_width =  this.c.measureText(label);
		this.c.fillStyle = "#000";
		this.c.fillText(label, x+w/2-label_width.width/2, this.options.scaleHeight+h_track-10);
	}
}
/**
 * @private
 */
Timeline.prototype.drawCircle = function(cx, cy, r, color){
	this.c.fillStyle = color;
	this.c.beginPath();
	this.c.arc(cx, cy, r, 0, Math.PI*2, true);
	this.c.closePath();
	this.c.fill();
}
/**
 * @private
 */
Timeline.prototype.drawCenteredRect = function(x, y, w, h, color) {
    this.c.fillStyle = color;
    this.c.fillRect(x - w / 2, y - h / 2, w, h);
}
/**
 * @private
 */
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
