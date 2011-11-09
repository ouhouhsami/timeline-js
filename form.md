---
layout: static
title: Edition mode
js: ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', 'https://raw.github.com/fryn/html5slider/master/html5slider.js', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js', 'http://pastebin.com/raw.php?i=8ugkXxth', 'static/js/timeline.js', 'static/js/form.js']
css: ['http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/blitzer/jquery-ui.css']

---

<audio id="audio" src="http://upload.wikimedia.org/wikipedia/commons/b/bb/Vampire_3component.ogg" controls></audio>
<div id="sound_visualisation"></div>
<div id="slider-range"></div>
<div style="display:none;">
	<label for="scale">Scale</label>
	<input type="range" min="1" step="0.01" id="scale" value="1" />
	<label for="scroll">Scroll</label>
	<input type="range" min="0"  step="0.01" id="scroll" value="0" />
</div>

<div id="radio">
	<input type="radio" id="create" name="radio" checked="checked"/><label for="create">Create</label>
	<input type="radio" id="read" name="radio"  /><label for="read">Read</label>
	<input type="radio" id="update" name="radio" /><label for="update">Update</label>
	<input type="radio" id="delete" name="radio" /><label for="delete">Delete</label>
</div>


<label for="time_in">Time in</label><input type="text" id="time_in"/>
<label for="time_out">Time out</label><input type="text" id="time_out"/>
<label for="track">Track</label><input type="text" id="track"/>
<label for="id">Id</label><input type="text" id="id"/>

<h3>Javascript</h3>

<p>Dependencies: jQuery, html5slider.js and timeline.js</p>
<div class="code">
{% highlight js linenos %}
{% endhighlight %}
</div>

<h3>HTML</h3>

<div class="code">
{% highlight html linenos %}
{% endhighlight %}
</div>