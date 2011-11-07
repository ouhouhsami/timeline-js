---
layout: static
title: jQuery UI integration example
js: ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', 'https://raw.github.com/fryn/html5slider/master/html5slider.js', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js', 'http://pastebin.com/raw.php?i=8ugkXxth', 'static/js/timeline.js', 'static/js/jquery-ui.js']
css: ['http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/blitzer/jquery-ui.css']
---

<audio id="audio" src="http://upload.wikimedia.org/wikipedia/commons/b/bb/Vampire_3component.ogg" controls></audio>
<div id="sound_visualisation"></div>
<div id="slider-range"></div>
<div id="sound_visualisation"></div>
<div style="display:none;">
	<label for="scale">Scale</label>
	<input type="range" min="1" step="0.01" id="scale" value="1" />
	<label for="scroll">Scroll</label>
	<input type="range" min="0"  step="0.01" id="scroll" value="0" />
</div>

<h3>Javascript</h3>

<p>Dependencies: jQuery and timeline.js</p>
<div class="code">
{% highlight js linenos %}
$(document).ready(function() {
	var duration
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration	
		options = {
						'height':80,
						'width':880,
						'scaleHeight':60,
						'scaleBackgroundColor':'#009', 
						'scaleColor':'#cc0',
						'backgroundColor':'#EE0',
						'textColor':'#AAA',
						'cursorColor':'#0FF'
		}
		var timeline = new Timeline('audio', 'sound_visualisation', duration, options, 'scale', 'scroll');
	})
	$( "#slider-range" ).dragslider({
		range: true,
		min: 0.0,
		max: 100.0,
		rangeDrag: true,
		values: [ 0.0, 100.0 ],
		slide: function( event, ui ) {
			var ratio = (100 - (ui.values[1]-ui.values[0]))/100 
			var min_scale = parseFloat($('#scale').attr('min'))
			var max_scale = parseFloat($('#scale').attr('max'))
			document.getElementById('scale').setAttribute('value', ratio*(max_scale-min_scale)+min_scale);
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, true);
			document.getElementById('scale').dispatchEvent(event)
			var max_scroll = parseFloat($('#scroll').attr('max'))
			document.getElementById('scroll').setAttribute('value', ui.values[0]/100*max_scroll);
		}
	});
})

{% endhighlight %}
</div>

<h3>HTML</h3>

<div class="code">
{% highlight html linenos %}
<audio id="audio" src="http://upload.wikimedia.org/wikipedia/commons/b/bb/Vampire_3component.ogg" controls></audio>
<div id="sound_visualisation"></div>
<div id="slider-range"></div>
<div id="sound_visualisation"></div>
<div style="display:none;">
<label for="scale">Scale</label>
<input type="range" min="1" step="0.01" id="scale" value="1" />
<label for="scroll">Scroll</label>
<input type="range" min="0"  step="0.01" id="scroll" value="0" />
</div>
{% endhighlight %}
</div>