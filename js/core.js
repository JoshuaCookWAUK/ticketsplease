var canvasHandles = new Array();
$(document).ready(function() {
	canvasHandles.push({name: "menu", handle: new CanvasMenu()});
	console.log(canvasHandles[0].handle.stop());
});
