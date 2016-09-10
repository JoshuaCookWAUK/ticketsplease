var canvasHandles = new Array();
$(document).ready(function() {
	switchSidebar('sidebar');
	canvasHandles.push({name: "menu", handle: new CanvasMenu()});
});
