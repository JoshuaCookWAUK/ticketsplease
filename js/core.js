$(document).ready(function() {
	Canvas.initialise();
	Graphics.initialise();
	Input.initialise();
	Sidebar.initialise();
	Graphics.addGraphic('passport', 'images/passport-base.png');
	Graphics.addGraphic('ticket', 'images/ticket-base.png');
	Graphics.addGraphic('desk', 'images/desk/desk.png');
	Graphics.addGraphic('desk1', 'images/desk/desk-alt1.png');
	Graphics.addGraphic('desk2', 'images/desk/desk-alt2.png');
	Graphics.addGraphic('stamp-approved', 'images/stamp-approved.png');
	Graphics.addGraphic('stamp-denied', 'images/stamp-denied.png');
	Graphics.addGraphic('fired', 'images/fired.png');
	Graphics.addGraphic('pass', 'images/pass.png');
	Canvas.addCanvas("main", new CanvasMenu());
	Canvas.addCanvas("game", new CanvasGame());
	Canvas.setActiveCanvas('main');
});
