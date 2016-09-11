class Canvas {
    static initialise() {
        this.canvas = new Array();
        this.activeCanvas = -1;
    }
    static addCanvas(name, reference) {
        this.canvas.push({name: name, ref: reference});
        this.canvas[this.canvas.length - 1].ref.initialise();
    }
    static getActiveCanvas() {
        return this.canvas[this.activeCanvas].ref;
    }
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
    static hasCanvas(name) {
        for(var i = 0; i < this.canvas.length; i++) {
            if(this.canvas[i].name == name) {
                return {has: true, index: i};
            }
        }
    }
    static disableAll() {
        for(var i = 0; i < this.canvas.length; i++) {
            this.canvas[i].ref.stop();
        }
    }
}
