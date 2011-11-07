$(document).ready(function() {
	var duration
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration
		var options = {'numberOfTracks':3, 'height':300}
		var timeline = new Timeline('audio', 'sound_visualisation', duration, options);
		timeline.addPeriod(5,15,'#A255FF',2)
		timeline.addPeriod(22,28,'#F25500',3)
	})
})
