var drawInstance;
var canvas;
var canvasCtx;
var mouseX = 0;
var mouseY = 0;
var canvasBounds = {x1:0, y1:0, x2:0, y2:0};
var graphicDeskCoffeeStain = new Image();

$(document).ready(function() {
	initialise();
});

$(window).resize(function() {
    resizeCanvas();
});

function initialiseGraphics() {
	graphicDeskCoffeeStain.src = 'images/desk/desk-coffee.png';
}

function initialise() {
	clearInterval(drawInstance);
	initialiseGraphics();
	initialiseControls();
	initialiseCanvas();
	drawInstance = setInterval(draw, 1);
}

function initialiseCanvas() {
	canvas = document.getElementById('canvas');
	canvasCtx = canvas.getContext("2d");
    resizeCanvas();
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
    mouseX = (e.clientX - canvasBounds.x1);
    mouseY = (e.clientY - canvasBounds.y1);
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
    if(mouseX > canvasBounds.x1
		&& mouseX < canvasBounds.x2
		&& mouseY > canvasBounds.y1
		&& mouseY < canvasBounds.y2
	) {
        return true;
    } else {
        return true;
    }
}

function draw() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
	// Image
	//canvasCtx.drawImage(graphicDeskCoffeeStain, 100, 100, 512, 512);
	// Text
	/*
	canvasCtx.fillStyle = "#212121";
	canvasCtx.font = "20px Arial";
	canvasCtx.fillText(canvasCtx.measureText("Some Text").width, 20, 20);
	*/
	centerTextXY("Welcome to Tickets Please!", "30", {x:null, y:-10});
	centerTextXY("To begin a game, select New Game from the menu.", "15", {x:null, y:10});
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
	console.log(newLocation);
	if(offset.x != null) newLocation.x += offset.x;
	if(offset.y != null) newLocation.y += offset.y;
	canvasCtx.fillText(text, newLocation.x, newLocation.y);
}
