class CanvasMenu {
    constructor() {
        this.resize();
    }
    initialise() {}
    getBounds() {
        return this.bounds;
    }
    getSize() {
        return this.size;
    }
    stop() {
        clearInterval(this.instance);
    }
    resume() {
        this.instance = setInterval(()=>{ this.render(this) }, 10);
    }
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
    render(parent) {
        parent.resize();
        parent.context.clearRect(0, 0, parent.canvas.width, parent.canvas.height);
        centerTextXY(parent.context, 'Welcome to Tickets Please!', '#212121', '30', parent.bounds, {x:null, y:-10});
        centerTextXY(parent.context, 'To begin a game, select New Game from the menu.', '#212121', '15', parent.bounds, {x:null, y:10});
        centerTextXY(parent.context, "Instructions: Don't let anyone through our borders if they don't have a valid passport and ticket!", '#212121', "15", parent.bounds, {x:null, y:30});
    }
}
