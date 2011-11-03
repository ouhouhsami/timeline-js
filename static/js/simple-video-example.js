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
