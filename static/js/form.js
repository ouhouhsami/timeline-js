$(document).ready(function() {
	var duration
	var timeline
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration;
		options = {mode:'create', numberOfTracks:3, height:140, width:880, cursorHeight:160}
		timeline = new Timeline('audio', 'sound_visualisation', duration,options, 'scale', 'scroll');
		
		
		$(timeline).bind('createperiod', function(evt, time_in, time_out, color, track, label, id){
			$('#time_in').val(time_in)
			$('#time_out').val(time_out)
			$('#track').val(track)
			$('#id').val(id)
		})
	})
	
	
	
	
	
	$('#create').click(function(evt){
		timeline.setOption('mode', 'create')
	})
	$('#read').click(function(evt){
		timeline.setOption('mode', 'read')
	})
	$('#update').click(function(evt){
		timeline.setOption('mode', 'update')
	})
	$('#delete').click(function(evt){
		timeline.setOption('mode', 'delete')
	})
	
	$( "#radio" ).buttonset();
	
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
