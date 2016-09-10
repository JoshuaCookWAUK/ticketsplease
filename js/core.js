var drawInstance;
var canvas;
var canvasCtx;
var mouseLocation = {x: 0, y: 0};
var mouseButtons = {lmb: false, mmb: false, rmb: false};
var canvasBounds = {x1:0, y1:0, x2:0, y2:0};
var graphicDesk = new Image();
var graphicDeskAlt1 = new Image();
var graphicDeskAlt2 = new Image();
var graphicPassportBase = new Image();
var desk;

$(document).ready(function() {
	switchSidebar('sidebar');
	resizeCanvas();
	initialise();
});

function initialiseGraphics() {
	graphicDesk.src = 'images/desk/desk.png';
	graphicDeskAlt1.src = 'images/desk/desk-alt1.png';
	graphicDeskAlt2.src = 'images/desk/desk-alt2.png';
	graphicPassportBase.src = 'images/passport-base.png';
}

function initialise() {
	clearInterval(drawInstance);
	initialiseGraphics();
	initialiseControls();
	initialiseCanvas();
	drawInstance = setInterval(draw, 10);
}

function initialiseCanvas() {
	canvas = document.getElementById('canvas');
	canvasCtx = canvas.getContext("2d");
}

function resizeCanvas() {
    $('#canvas').attr('height', $('body').height());
    $('#canvas').attr('width', ($('body').width() - $('sidebar').outerWidth()));
	$('#canvas').css({
		left:$('sidebar').outerWidth()
	});
	canvasBounds = {
		x1:($('sidebar').position().left + $('sidebar').outerWidth()),
		y1:0,
		x2:$(window).width(),
		y2:$(window).height()
	}
}

function initialiseControls() {
    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("mousedown", mouseDownHandler, false);
    document.addEventListener("mouseup", mouseUpHandler, false);
    document.addEventListener("contextmenu", contextHandler, false);
	document.addEventListener("mousewheel", mouseWheel, false);
}

function contextHandler(e) {
	e.preventDefault();
}

function mouseMoveHandler(e) {
	mouseLocation = {
		x: (e.clientX - canvasBounds.x1),
		y: (e.clientY - canvasBounds.y1)
	};
}

function mouseWheel(e) {
	if(e.deltaY > 0) {
		//Zoom Out
	} else if(e.deltaY < 0) {
		//Zoom In
	}
}

function mouseDownHandler(e) {
	switch(e.which) {
		case 1:
			//LMB
			mouseButtons.lmb = true;
			captureMouse(mouseLocation);
			checkInput(mouseLocation, mouseButtons);
			break;
		case 2:
			//MMB
			break;
		case 3:
			//RMB
			break;
	}
}

function mouseUpHandler(e) {
	switch(e.which) {
		case 1:
			//LMB
			mouseButtons.lmb = false;
			checkInput(mouseLocation, mouseButtons);
			break;
		case 2:
			//MMB
			break;
		case 3:
			//RMB
			break;
	}
}

function mouseInBounds() {
    if(mouseLocation.x > canvasBounds.x1
		&& mouseLocation.x < canvasBounds.x2
		&& mouseLocation.y > canvasBounds.y1
		&& mouseLocation.y < canvasBounds.y2
	) {
        return true;
    } else {
        return true;
    }
}

var yLocation = {
	x: 100,
	y: 100
}
var ySize = {
	w: 800,
	h: 500
}
function checkInput(mouseLocation, mouseButtons) {
	if(mouseInBounds2(mouseLocation) && mouseButtons.lmb) {
		console.log('youve clicked me');
	}
	if(!mouseButtons.lmb && capturedLocation != null) {
		yLocation = {
			x: yLocation.x -= diff(mouseLocation.x, capturedLocation.x),
			y: yLocation.y -= diff(mouseLocation.y, capturedLocation.y)
		}
		capturedLocation = null;
	}
}
var capturedLocation = null;
function captureMouse(mouseLocation) {
	capturedLocation = mouseLocation;
}
function mouseInBounds2(mouseLocation) {
    if(mouseLocation.x > yLocation.x
		&& mouseLocation.x < (yLocation.x + ySize.w)
		&& mouseLocation.y > yLocation.y
		&& mouseLocation.y < (yLocation.y + ySize.h)
	) {
        return true;
    } else {
        return false;
    }
}
function render() {
	var newLocation = {
		x: yLocation.x,
		y: yLocation.y
	};
	if(mouseButtons.lmb && capturedLocation != null) {
		newLocation.x -= diff(mouseLocation.x, capturedLocation.x);
		newLocation.y -= diff(mouseLocation.y, capturedLocation.y);
	}
	canvasCtx.drawImage(graphicPassportBase, newLocation.x, newLocation.y);
}

function diff(a, b) {
	var ret = Math.abs(a - b);
	if(b < a) {
		ret = -ret;
	}
	return ret;
}

var state = 'menu';
function draw() {
	resizeCanvas();
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
	switch(state) {
		case 'menu':
			centerTextXY("Welcome to Tickets Please!", "30", {x:null, y:-10});
			centerTextXY("To begin a game, select New Game from the menu.", "15", {x:null, y:10});
			break;
		case 'game':
			if(desk) {
				desk.render(canvasCtx);
			}
			render();
			break;
	}
	/*
	canvasCtx.beginPath();
	canvasCtx.fillStyle = "#454545";
	canvasCtx.rect(500, 500, 800, 300);
	canvasCtx.fill();
	canvasCtx.closePath();
	*/
	// Image
	//canvasCtx.drawImage(graphicDeskCoffeeStain, 100, 100, 512, 512);
	// Text
	/*
	canvasCtx.fillStyle = "#212121";
	canvasCtx.font = "20px Arial";
	canvasCtx.fillText(canvasCtx.measureText("Some Text").width, 20, 20);
	*/
	// Square
	/*
	canvasCtx.beginPath();
	canvasCtx.fillStyle = "#212121";
	canvasCtx.rect(50, 50, 20, 20);
	canvasCtx.fill();
	canvasCtx.closePath();
	*/
}

function centerTextXY(text, size, offset) {
	canvasCtx.fillStyle = "#212121";
	canvasCtx.font = size + "px Arial";
	var newLocation = {
		x: ((canvasBounds.x2 - canvasBounds.x1) / 2) - (canvasCtx.measureText(text).width / 2),
		y: (canvasBounds.y2 / 2) - (size / 2)
	}
	if(offset.x != null) newLocation.x += offset.x;
	if(offset.y != null) newLocation.y += offset.y;
	canvasCtx.fillText(text, newLocation.x, newLocation.y);
}
