$(document).ready(function() {
	var duration
	var timeline
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration;
		options = {mode:'create', numberOfTracks:3, height:140, width:400, cursorHeight:160}
		timeline = new Timeline('audio', 'sound_visualisation', duration,options, 'scale', 'scroll');
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
})
