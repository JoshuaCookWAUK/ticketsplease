/*
	CanvasMenu Class
	-----
	The canvas for the menu.
*/
class CanvasMenu {
    /* Default constructor. */
    constructor() {
        this.resize();
    }
    /* Initialise the canvas. */
    initialise() {}
    /* Get the bounds of the canvas. */
    getBounds() {
        return this.bounds;
    }
    /* Get the size of the canvas. */
    getSize() {
        return this.size;
    }
    /* Pause the canvas on the current frame. */
    stop() {
        clearInterval(this.instance);
    }
    /* Resume the canvas rendering. */
    resume() {
        this.instance = setInterval(()=>{ this.render(this) }, 10);
    }
    /* Work out the canvas size, bounds and resize the canvas. */
    resize() {
        this.canvasid = 'canvas'
        this.$jqhandle = $('#canvas');
        this.bounds = {
            x1: ($('sidebar').position().left + $('sidebar').outerWidth()),
            y1: 0,
            x2: $(window).width(),
            y2: $(window).height()
        };
        this.size = {
            w: (this.bounds.x2 - this.bounds.x1),
            h: (this.bounds.y2 - this.bounds.y1)
        }
        this.$jqhandle.attr('height', (this.bounds.y2 - this.bounds.y1));
        this.$jqhandle.attr('width', (this.bounds.x2 - this.bounds.x1));
    	this.$jqhandle.css({
    		left: this.bounds.x1
    	});
    	this.canvas = document.getElementById(this.canvasid);
    	this.context = this.canvas.getContext("2d");
    }
    /* Render the canvas. */
    render(parent) {
        parent.resize();
        parent.context.clearRect(0, 0, parent.canvas.width, parent.canvas.height);
        centerTextXY(parent.context, 'Welcome to Tickets Please!', '#212121', '30', parent.bounds, {x:null, y:-10});
        centerTextXY(parent.context, 'To begin a game, select New Game from the menu.', '#212121', '15', parent.bounds, {x:null, y:10});
        centerTextXY(parent.context, "Instructions: Don't let anyone through our borders if they don't have a valid passport and ticket!", '#212121', "15", parent.bounds, {x:null, y:30});
    }
}
