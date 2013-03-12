//Put some fancy code here to show a progress bar or some shit.

var canvas;
var input;
var map;

jQuery.getScript("js/map.js", function(){
	map = new Map("valhalla", function(){
		jQuery.getScript("js/canvas_main.js", function(){
			canvas = new CanvasMain();
			canvas.drawMap();

			jQuery.getScript("js/canvas_input.js", function(){  input = new CanvasInput(); });
		}).fail(function(jqxhr, settings, exception) {
	  		throw(exception);
		});
	});
}).fail(function(jqxhr, settings, exception){
		throw(exception);
});