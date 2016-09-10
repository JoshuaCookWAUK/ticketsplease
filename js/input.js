function Input() {
    this.mouseLocation = {x: 0, y: 0};
    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("mousedown", mouseDownHandler, false);
    document.addEventListener("mouseup", mouseUpHandler, false);
    document.addEventListener("contextmenu", contextHandler, false);
	document.addEventListener("mousewheel", mouseWheel, false);
    function contextHandler(e) {
    	e.preventDefault();
    }
    function mouseMoveHandler(e) {
        mouseMoveHandler.mouseLocation = {
            x: e.clientX,
            y: e.clientY
        };
    }
    function mouseWheel(e) {
    	if(e.deltaY > 0) { /* Zoom Out */ } else if(e.deltaY < 0) { /* Zoom In */ }
    }
    function mouseDownHandler(e) {
    	switch(e.which) {
    		case 1:
    			//LMB
                //console.log('lmb down');
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
                //console.log('lmb up');
    			break;
    		case 2:
    			//MMB
    			break;
    		case 3:
    			//RMB
    			break;
    	}
    }
}
Input.prototype.setMouseLocation = function(location) {
    this.mouseLocation = location;
}
Input.prototype.getMouseLocation = function() {
    return this.mouseLocation;
}
