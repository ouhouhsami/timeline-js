$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "./static/xml/Chopin_Nocturne_op27no2.v2t",
		dataType: "xml",
		success: parseXml
	});	
	
	$("#play").click(function(event){
		$('audio').get(0).play()
		$(this).hide()
		$("#pause").show()
	})
	$("#pause").click(function(event){
		$('audio').get(0).pause()
		$(this).hide()
		$("#play").show()
	})
	$("#stop").click(function(event){
		$('audio').get(0).pause()
		$('audio').get(0).currentTime = 0
		$("#play").show()
		$("#pause").hide()
	})
	$("#pause").hide()
})


function parseXml(xml)
{
	var audio_vt2_path = $(xml).find('Timeline').attr('mediaContent')
	var nbOfTracks = 0;
	var periods = []

	var duration = 304
	$(xml).find("Bubble").each(function()
  	{
    	if(parseInt($(this).attr("level")) > nbOfTracks){
			nbOfTracks = parseInt($(this).attr("level"))
		}
		var ms = vt2_convert_time($(this).attr('time'))
		if($(this).next('Bubble').attr('time')){
			var ms2 = vt2_convert_time($(this).next('Bubble').attr('time'))
		}else {
			if($(this).parent().next('Bubble').attr('time')){
				var ms2 = vt2_convert_time($(this).parent().next('Bubble').attr('time'))
			}else {
				if($(this).parent().parent().next('Bubble').attr('time')){
					var ms2 = vt2_convert_time($(this).parent().parent().next('Bubble').attr('time'))
				}else {
					var ms2 = duration
				}
			}
		}
		var period = {time_in:ms, time_out:ms2, track:parseInt($(this).attr("level")), color:'rgb('+$(this).attr("color")+')', content:$(this).find('Annotation').text()}
		if($(this).attr("label")){
			period.label = $(this).attr("label").toString()
		}
		periods.push(period)
  	});
	
	$($('#audio_vt2').get(0))
	.bind("loadedmetadata", function(){
		var options = {
					'height':160,
					'width':880,
					'scaleHeight':30,
					'scaleBackgroundColor':'#000', 
					'backgroundColor':'#EAE5E1',
					'scaleColor':'#EAE5E1',
					'trackSeparatorColor':'#EAE5E1', 
					'textColor':'#EAE5E1',
					'cursorColor':'#f00',
					'scaleFactor':2, 
					'numberOfTracks':4,
					'periodShape':'bubble',
					'cursorHeight':30
		}
		// the only important thing in this file
		var timeline = new Timeline('audio_vt2', 'sound_visualisation_vt2',duration, options, 'scale_vt2', 'scroll_vt2');
		//var timeline = new Timeline('audio', 'sound_visualisation', duration,{}, 'scale', 'scroll');
		var bubbles = []
		for(var i = 0; i<periods.length; i++){
			var id = timeline.addPeriod(periods[i].time_in,periods[i].time_out,periods[i].color, periods[i].track, periods[i].label)
			bubbles.push({id:id, content:periods[i].content})
		}
	})
	.bind('timeupdate', function(){
		var time = $(this).get(0).currentTime
		var active_data = []
		for(var i=0; i<periods.length-1; i++){
			if(time > periods[i].time_in && time < periods[i+1].time_out){
				/*if(this._currentActives.indexOf(this._periods[i].id) == -1){
					this._currentActives.push(this._periods[i].id)
				}*/
				active_data.push(periods[i].content)
				
			}else {
				/*if(this._currentActives.indexOf(this._periods[i].id) != -1){
					this._currentActives.splice(this._currentActives.indexOf(this._periods[i].id), 1);
				}*/
			}
		}
		$('#context_data').html(active_data.join('<br /><br />'))
		
	})
	$("#audio_vt2").attr('src', audio_vt2_path)
  $(xml).find("Bubble").each(function()
  {
    //$("#output").append($(this).attr("author") + "<br />");
	//$('#output').append($(this).attr("time")+' '+$(this).attr("level")+'<br />')
  });

	$( "#slider-range" ).dragslider({
		range: true,
		min: 0.0,
		max: 100.0,
		rangeDrag: true,
		values: [ 0.0, 100.0 ],
		slide: function( event, ui ) {
			var ratio = (100 - (ui.values[1]-ui.values[0]))/100 
			var min_scale = parseFloat($('#scale_vt2').attr('min'))
			var max_scale = parseFloat($('#scale_vt2').attr('max'))
			document.getElementById('scale_vt2').setAttribute('value', ratio*(max_scale-min_scale)+min_scale);
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, true);
			document.getElementById('scale_vt2').dispatchEvent(event)
			var max_scroll = parseFloat($('#scroll_vt2').attr('max'))
			document.getElementById('scroll_vt2').setAttribute('value', ui.values[0]/100*max_scroll);
		}
	});


}


function vt2_convert_time(str){
	var ms = parseInt(str.split('.')[1])
	var rest = Date.parseExact(str.split('.')[0], "m:ss");
	ms = rest.getMinutes()*60+rest.getSeconds()+ms*100/1000;
	return ms;
}