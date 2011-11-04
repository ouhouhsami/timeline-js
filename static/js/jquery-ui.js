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
		var timeline = new Timeline('audio', 'sound_visualisation', duration, options, 'scale', 'scroll');
	})

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

