---
layout: static
title: Basic example with scale and scroll
js: ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', 'https://raw.github.com/fryn/html5slider/master/html5slider.js', 'static/js/timeline.js', 'static/js/simple-example-w-scale-scroll.js']
---

<audio id="audio" src="http://upload.wikimedia.org/wikipedia/commons/b/bb/Vampire_3component.ogg" controls></audio>
<div id="sound_visualisation"></div>
<label for="scale">Scale</label>
<input type="range" min="1" step="0.01" id="scale" value="1" />
<label for="scroll">Scroll</label>
<input type="range" min="0"  step="0.01" id="scroll" value="0" />

<h3>Javascript</h3>

<p>Dependencies: jQuery, html5slider.js and timeline.js</p>
<div class="code">
{% highlight js linenos %}
$(document).ready(function() {
	var duration
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration
		// timeline instance
		var timeline = new Timeline('audio', 'sound_visualisation', duration,{}, 'scale', 'scroll');
	})
})
{% endhighlight %}
</div>

<h3>HTML</h3>

<div class="code">
{% highlight html linenos %}
<audio id="audio" src="http://upload.wikimedia.org/wikipedia/commons/b/bb/Vampire_3component.ogg" controls></audio>
<div id="sound_visualisation"></div>
<label for="scale">Scale</label>
<input type="range" min="1" step="0.01" id="scale" value="1" />
<label for="scroll">Scroll</label>
<input type="range" min="0"  step="0.01" id="scroll" value="1" />
{% endhighlight %}
</div>