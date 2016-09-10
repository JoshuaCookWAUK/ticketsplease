var canvasHandles = new Array();
$(document).ready(function() {
	canvasHandles.push({name: "menu", handle: new CanvasMenu()});
	console.log(canvasHandles[0].handle.stop());
	var wheresMeMouseAt = (function () {
		document.addEventListener('mousemove', mouseHandler);
		let location = {
			x : 0,
			y : 0
		};
		function mouseHandler (e) {
			location = {
				x : e.clientX,
				y : e.clientY
			}
		}
		function getLocayshun () {
			return location
		}
		return location;
	})();

	console.log(wheresMeMouseAt);

	setTimeout(function () {
		console.log(wheresMeMouseAt)
	}, 1000)

});
