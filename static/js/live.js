$(document).ready(function() {
	var duration
	var timeline
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration
		var options = {'numberOfTracks':3, 'height':200, 'cursorHeight':200}
		timeline = new Timeline('audio', 'sound_visualisation', duration, options);
		timeline.addPeriod(5,15,'#A255FF',2)
		timeline.addPeriod(22,28,'#F25500',3)
	})
	
	$('.periodShape').click(function(evt){
		timeline.setOption('periodShape', $(this).attr('value'))
	})
	
	$('.height').change(function(evt){
		timeline.setOption('height', parseFloat($(this).val()))
	})
	$('.width').change(function(evt){
		timeline.setOption('width', parseFloat($(this).val()))
	})
	
	$('.addTrack').click(function(evt){
		timeline.setOption('numberOfTracks', timeline.getOption('numberOfTracks')+1)
	})
	$('.removeTrack').click(function(evt){
		timeline.setOption('numberOfTracks', timeline.getOption('numberOfTracks')-1)
	})
})
