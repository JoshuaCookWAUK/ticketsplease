$(document).ready(function() {
	Canvas.initialise();
	Graphics.initialise();
	Input.initialise();
	Sidebar.initialise();
	Graphics.addGraphic('passport', 'images/passport-base.png');
	Graphics.addGraphic('desk', 'images/desk/desk.png');
	Canvas.addCanvas("main", new CanvasMenu());
	Canvas.addCanvas("game", new CanvasGame());
	Canvas.setActiveCanvas('main');
});
