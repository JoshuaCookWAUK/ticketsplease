class Input {
    static initialise() {
        this.mouseLocation = {x: -1, y: -1};
        this.mouseButtons = {lmb: false, mmb: false, rmb: false};
        this.mouseScroll = {deltaX: 0, deltaY: 0};
        document.addEventListener("mousemove", (e, parent = this)=>{
            parent.mouseLocation = {
                x: e.clientX,
                y: e.clientY
            }
        });
        document.addEventListener("mousedown", (e, parent = this)=>{
            if(e.which == 1) parent.mouseButtons.lmb = true;
            if(e.which == 2) parent.mouseButtons.mmb = true;
            if(e.which == 3) parent.mouseButtons.rmb = true;
        });
        document.addEventListener("mouseup", (e, parent = this)=>{
            if(e.which == 1) parent.mouseButtons.lmb = false;
            if(e.which == 2) parent.mouseButtons.mmb = false;
            if(e.which == 3) parent.mouseButtons.rmb = false;
        });
        document.addEventListener("mousewheel", (e, parent = this)=>{
            parent.mouseScroll = {
                deltaX: e.deltaX,
                deltaY: e.deltaY
            }
        });
        document.addEventListener("contextmenu", (e)=>{
            e.preventDefault();
        });
        document.addEventListener("mouseout", (e, parent = this)=>{
            parent.mouseLocation = {
                x: -1,
                y: -1
            }
        });
    }
    static getMouseLocation() {
        return this.mouseLocation;
    }
    static getMouseButtons() {
        return this.mouseButtons;
    }
    static getMouseScroll() {
        return this.mouseScroll;
    }
    static mouseInBounds(bounds) {
        var canvasBounds = Canvas.getActiveCanvas().getBounds();
        if(this.mouseLocation.x > (canvasBounds.x1 + bounds.x1)
    		&& this.mouseLocation.x < (canvasBounds.x1 + bounds.x2)
    		&& this.mouseLocation.y > (canvasBounds.y1 + bounds.y1)
    		&& this.mouseLocation.y < (canvasBounds.y1 + bounds.y2)
    	) {
            return true;
        } else {
            return false;
        }
    }
    static mouseDifference(prevLocation) {
        var difference = {
            x: Math.abs(this.mouseLocation.x - prevLocation.x),
            y: Math.abs(this.mouseLocation.y - prevLocation.y)
        }
    	if(prevLocation.x > this.mouseLocation.x) difference.x = -difference.x;
    	if(prevLocation.y > this.mouseLocation.y) difference.y = -difference.y;
    	return difference;
    }
    static outBoundsX(location, size) {
        if(location < 0 || (location + size.w) > Canvas.getActiveCanvas().getSize().w) {
            return true;
        } else {
            return false;
        }
    }
    static outBoundsY(location, size) {
        if(location < 0 || (location + size.h) > Canvas.getActiveCanvas().getSize().h) {
            return true;
        } else {
            return false;
        }
    }
}
