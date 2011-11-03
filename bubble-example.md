---
layout: static
title: Bubble view
js: ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', 'static/js/timeline.js', 'static/js/bubble-example.js']
---

<audio id="audio" src="http://upload.wikimedia.org/wikipedia/commons/b/bb/Vampire_3component.ogg" controls></audio>
<div id="sound_visualisation"></div>


<h3>Javascript</h3>

<p>Dependencies: jQuery and timeline.js</p>
<div class="code">
{% highlight js linenos %}
$(document).ready(function() {
	var duration
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration
		var options = {'numberOfTracks':3, 'periodShape':'bubble', 'height':200, 'backgroundColor':'#EAE5E1', 'trackSeparatorColor':'#EAE5E1', 'scaleColor':'#EAE5E1', 'cursorHeight':30}
		var timeline = new Timeline('audio', 'sound_visualisation', duration, options);
		timeline.addPeriod(0,30,'#3F0B1B',3)
		timeline.addPeriod(5,30,'#7A1631',2)
		timeline.addPeriod(5,15,'#FC7D49',1)
		timeline.addPeriod(0,5,'#FC7D49',1)
		timeline.addPeriod(15,25,'#FC7D49',1)
		timeline.addPeriod(25,30,'#CF423C',1)
	
	})
})
{% endhighlight %}
</div>

<h3>HTML</h3>

<div class="code">
{% highlight html linenos %}
<audio id="audio" src="http://upload.wikimedia.org/wikipedia/commons/b/bb/Vampire_3component.ogg" controls></audio>
<div id="sound_visualisation"></div>
{% endhighlight %}
</div>