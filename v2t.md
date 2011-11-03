---
layout: static
title: V2T example
js: ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', 'http://cdnjs.cloudflare.com/ajax/libs/datejs/1.0/date.min.js', 'https://raw.github.com/fryn/html5slider/master/html5slider.js', 'static/js/timeline.js', 'static/js/v2t.js']
---

<div id="sound_visualisation_vt2"></div> 


<label for="scale_vt2">Scale</label>
<input type="range" min="1" max="100" step="0.01" id="scale_vt2" value="1" />
<label for="scroll_vt2">Scroll</label>
<input type="range" min="0" max="100" step="0.01" id="scroll_vt2" value="0" />	
<audio id="audio_vt2" controls/>
