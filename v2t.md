---
layout: static
title: V2T example
js: ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', 'http://cdnjs.cloudflare.com/ajax/libs/datejs/1.0/date.min.js', 'https://raw.github.com/fryn/html5slider/master/html5slider.js', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js', 'http://pastebin.com/raw.php?i=8ugkXxth', 'static/js/timeline.js', 'static/js/v2t.js']
css: ['http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/dark-hive/jquery-ui.css']
---

<h3>Chopin, <i>Nocturne</i> in D-Flat Major, Op. 27 no. 2</h3>

<p>
This Nocturne was composed in 1835 and is dedicated to Mme. la Comtesse d'Appony. 
The work alternates between two main ideas (A B A B A B + Coda). 
The first of these ideas always returns in the tonic with only slight modifications, (suggesting a rondo theme), while the second idea is developmental, moving through several keys. 
One might interpret the organization of this Nocturne as a rondo, or alternatively as strophic (A A' A'' Coda), in which each strophe consists of two parts (A and B).
</p>
<p>
Analysis by Brent Yorgason. 
<br />Piano performance by Edward Auer.
</p>

<button id="stop"></button>
<button id="play"></button>
<button id="pause"></button>

<div style="font-size:0.7em" id="slider-range"></div>
<div id="sound_visualisation_vt2"></div> 

<div style="display:none;">
<label for="scale_vt2">Scale</label>
<input type="range" min="1" max="100" step="0.01" id="scale_vt2" value="1" />
<label for="scroll_vt2">Scroll</label>
<input type="range" min="0" max="100" step="0.01" id="scroll_vt2" value="0" />	
</div>
<audio id="audio_vt2"/>



<div id="context_data"></div>