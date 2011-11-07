---
layout: static
title: Multitrack example (with periods)
js: ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', 'static/js/timeline.js', 'static/js/multitrack-example.js']
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
		var options = {'numberOfTracks':3, 'height':200}
		var timeline = new Timeline('audio', 'sound_visualisation', duration, options);
		timeline.addPeriod(5,15,'#A255FF',2)
		timeline.addPeriod(22,28,'#F25500',3)
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