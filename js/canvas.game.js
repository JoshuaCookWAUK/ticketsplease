/*
	CanvasGame Class
	-----
	The game canvas.
*/
class CanvasGame {
    /* Default constructor. */
    constructor() {
        this.resize();
        this.paused = false;
    }
    /* Initialise the canvas elements. */
    initialise() {
        this.desk = new Desk(this);
        this.paused = false;
    }
    /* Return the bounds of the canvas. */
    getBounds() {
        return this.bounds;
    }
    /* Return the size of the canvas. */
    getSize() {
        return this.size;
    }
    /* Pause the canvas on the current frame. */
    stop() {
        this.paused = true;
        this.render(this);
        clearInterval(this.instance);
    }
    /* Resume the canvas rendering. */
    resume() {
        this.paused = false;
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
        parent.desk.render(parent.context);
        if(State.getPassedState() != 2
            && State.getPassport() != undefined
            && State.getTicket() != undefined)
        {
            State.getPassport().render(parent.context);
		    State.getTicket().render(parent.context);
        }
        if(State.getPassedState() == 0) {
            parent.context.drawImage(
                Graphics.getGraphicByName('failed').image,
                (parent.getSize().w / 2 - 200),
                (parent.getBounds().y2 / 2 - 200)
            );
        } else if(State.getPassedState() == 1) {
            parent.context.drawImage(
                Graphics.getGraphicByName('passed').image,
                (parent.getSize().w / 2 - 200),
                (parent.getBounds().y2 / 2 - 200)
            );
        } else if(State.getPassedState() == 2) {
            parent.context.drawImage(
                Graphics.getGraphicByName('fired').image,
                (parent.getSize().w / 2 - 256),
                (parent.getBounds().y2 - 512)
            );
        }
        if(parent.paused) {
        	parent.context.beginPath();
        	parent.context.fillStyle = "rgba(0, 0, 0, 0.75)";
        	parent.context.rect(0, 0, parent.size.w, parent.size.h);
        	parent.context.fill();
        	parent.context.closePath();
            centerTextXY(parent.context, 'Paused', '#FEFEFE', '30', parent.bounds, {x:null, y:-10});
        }
    }
}
