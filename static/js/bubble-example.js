$(document).ready(function() {
	var duration
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration
		var options = {
						'numberOfTracks':3, 
						'periodShape':'bubble', 
						'height':200, 
						'backgroundColor':'#EAE5E1', 
						'trackSeparatorColor':'#EAE5E1', 
						'scaleColor':'#EAE5E1', 
						'cursorHeight':30
					}
		var timeline = new Timeline('audio', 'sound_visualisation', duration, options);
		timeline.addPeriod(0,30,'#3F0B1B',3)
		timeline.addPeriod(5,30,'#7A1631',2)
		timeline.addPeriod(5,15,'#FC7D49',1)
		timeline.addPeriod(0,5,'#FC7D49',1)
		timeline.addPeriod(15,25,'#FC7D49',1)
		timeline.addPeriod(25,30,'#CF423C',1)
	
	})
})
