class Canvas {
    static initialise() {
        this.canvas = new Array();
    }
    static addCanvas(name, reference) {
        this.canvas.push({name: name, ref: reference});
    }
    static setActiveCanvas(name, intialise) {
        var hasCanvas = this.hasCanvas(name);
        var initialise = intialise || false;
        if(hasCanvas.has) {
            this.disableAll();
            console.log('initialise -> ' + initialise);
            if(initialise) {
                this.canvas[hasCanvas.index].ref.initialise();
            }
            this.canvas[hasCanvas.index].ref.resume();
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
