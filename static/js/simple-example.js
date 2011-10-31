<script type="text/javascript">
	$(document).ready(function() {
		var duration;
		$($('audio').get(0))
		.bind("loadedmetadata", function(){
			duration = $(this).get(0).duration
			// the only important thing in this file
			var timeline = new Timeline('audio', 'sound_visualisation', 'scale', 'scroll', duration);
		})
	})
</script>