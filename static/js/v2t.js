$(document).ready(function() {
	/*
	var duration
	$($('audio').get(0))
	.bind("loadedmetadata", function(){
		duration = $(this).get(0).duration
		var options = {'numberOfTracks':3, 'periodShape':'bubble', 'height':200, 'backgroundColor':'#EAE5E1', 'trackSeparatorColor':'#EAE5E1', 'scaleColor':'#EAE5E1', 'cursorHeight':30}
		var timeline = new Timeline('audio', 'sound_visualisation', duration, options);
		timeline.addPeriod(0,30,'#3F0B1B',3)
		timeline.addPeriod(5,30,'#7A1631',2)
		timeline.addPeriod(5,15,'#FC7D49',1)
		timeline.addPeriod(0,5,'#FC7D49',1)
		timeline.addPeriod(15,25,'#FC7D49',1)
		timeline.addPeriod(25,30,'#CF423C',1)
	
	})
	*/
	$.ajax({
		type: "GET",
		url: "./static/xml/Chopin_Nocturne_op27no2.v2t",
		dataType: "xml",
		success: parseXml
	});	
})


function parseXml(xml)
{
	var audio_vt2_path = $(xml).find('Timeline').attr('mediaContent')
	var nbOfTracks = 0;
	var periods = []

	$(xml).find("Bubble").each(function()
  	{
    	if(parseInt($(this).attr("level")) > nbOfTracks){
			//console.log('la', $(this).attr("level"), nbOfTracks)
			nbOfTracks = parseInt($(this).attr("level"))
		}
		var ms = vt2_convert_time($(this).attr('time'))
		if($(this).next('Bubble').attr('time')){
			var ms2 = vt2_convert_time($(this).next('Bubble').attr('time'))
		}else {
			if($(this).parent().next('Bubble').attr('time')){
				var ms2 = vt2_convert_time($(this).parent().next('Bubble').attr('time'))
			}else {
				//console.log("NOTHING")
				var ms2 = 253.229569
			}
		}
		periods.push({time_in:ms, time_out:ms2, track:parseInt($(this).attr("level")), color:'rgb('+$(this).attr("color")+')'})

  	});
	console.log(nbOfTracks)
	
	//$($('#audio_vt2').get(0))
	//.bind("loadedmetadata", function(){
		
		var duration = 304 //$(this).get(0).duration
		//console.log(duration)
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
		//console.log(options)
		// the only important thing in this file
		var timeline = new Timeline('audio_vt2', 'sound_visualisation_vt2',duration, options, 'scale_vt2', 'scroll_vt2');
		//var timeline = new Timeline('audio', 'sound_visualisation', duration,{}, 'scale', 'scroll');
		for(var i = 0; i<periods.length; i++){
			console.log(periods[i])
			timeline.addPeriod(periods[i].time_in,periods[i].time_out,periods[i].color, periods[i].track)
		}
	//})

	$("#audio_vt2").attr('src', audio_vt2_path)

  $(xml).find("Bubble").each(function()
  {
    //$("#output").append($(this).attr("author") + "<br />");
	//$('#output').append($(this).attr("time")+' '+$(this).attr("level")+'<br />')
  });

}


function vt2_convert_time(str){
	var ms = parseInt(str.split('.')[1])
	var rest = Date.parseExact(str.split('.')[0], "m:ss");
	ms = rest.getMinutes()*60+rest.getSeconds()+ms*100/1000;
	return ms;
}