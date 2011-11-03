---
layout: static
title: Video example with periods
js: ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', 'static/js/timeline.js', 'static/js/simple-video-example.js']
---

<video id="video" width="400" src="http://upload.wikimedia.org/wikipedia/commons/3/3f/Herne_Hill_velodrome_video.ogv" controls></audio>
<div id="video_visualisation"></div>


<h3>Javascript</h3>

<p>Dependencies: jQuery and timeline.js</p>
<div class="code">
{% highlight js linenos %}
$(document).ready(function() {
	var duration
	$($('video').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration
		var timeline = new Timeline('video', 'video_visualisation', duration);
		timeline.addPeriod(0, 8, 'yellow')
		timeline.addPeriod(10, 18, 'green')
		timeline.addPeriod(19, 38, 'blue')
		timeline.addPeriod(40, 41, 'purple')
	})
})
{% endhighlight %}
</div>

<h3>HTML</h3>

<div class="code">
{% highlight html linenos %}
<video id="video" width="400" src="http://upload.wikimedia.org/wikipedia/commons/3/3f/Herne_Hill_velodrome_video.ogv" controls></audio>
<div id="video_visualisation"></div>
{% endhighlight %}
</div>