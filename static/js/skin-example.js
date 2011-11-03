$(document).ready(function() {
	var duration
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration
		
		options = {
						'height':80,
						'width':880,
						'scaleHeight':60,
						'scaleBackgroundColor':'#009', 
						'scaleColor':'#cc0',
						'backgroundColor':'#EE0',
						'textColor':'#AAA',
						'cursorColor':'#0FF'
		}
		var timeline = new Timeline('audio', 'sound_visualisation', duration, options);
	})
})
