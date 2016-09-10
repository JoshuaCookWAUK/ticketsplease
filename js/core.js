$(document).ready(function() {
	new State();
	Canvas.initialise();
	Graphics.initialise();
	Input.initialise();
	Graphics.addGraphic('passport', 'images/passport-base.png');
	Graphics.addGraphic('desk', 'images/desk/desk.png');
	console.log(Graphics.getGraphics());
	switchSidebar('sidebar');
	Canvas.addCanvas("menu", new CanvasMenu());
	Canvas.addCanvas("game", new CanvasGame());
	Canvas.setActiveCanvas('menu');
});
