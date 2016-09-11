/*
	Canvas Class
	-----
	A handler class for all canvas'. Used to manage the difference canvas'
    and swap between them.
*/
class Canvas {
    /* Initialise the canvas handler. */
    static initialise() {
        this.canvas = new Array();
        this.activeCanvas = -1;
    }
    /* Add a new canvas to the array. */
    static addCanvas(name, reference) {
        this.canvas.push({name: name, ref: reference});
        this.canvas[this.canvas.length - 1].ref.initialise();
    }
    /* The the currently active canvas. */
    static getActiveCanvas() {
        return this.canvas[this.activeCanvas].ref;
    }
    /* Set the ative canvas and initialise it if requested. */
    static setActiveCanvas(name, intialise) {
        var hasCanvas = this.hasCanvas(name);
        var initialise = intialise || false;
        if(hasCanvas.has) {
            this.disableAll();
            if(initialise) {
                this.canvas[hasCanvas.index].ref.initialise();
            }
            this.canvas[hasCanvas.index].ref.resume();
            this.activeCanvas = hasCanvas.index;
        }
    }
    /* Check to see if there is canvas with a given name. */
    static hasCanvas(name) {
        for(var i = 0; i < this.canvas.length; i++) {
            if(this.canvas[i].name == name) {
                return {has: true, index: i};
            }
        }
    }
    /* Disable (stop/pause rendering) all canvas'. */
    static disableAll() {
        for(var i = 0; i < this.canvas.length; i++) {
            this.canvas[i].ref.stop();
        }
    }
}
