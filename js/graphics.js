class Graphics {
    static initialise() {
        this.graphics = new Array();
    }
    static addGraphic(name, src) {
        var graphic = new Image();
        graphic.src = src;
        this.graphics.push({
            name: name,
            image: graphic
        });
    }
    static getGraphics() {
        return this.graphics;
    }
    static getGraphicByName(name) {
        for(var i = 0; i < this.graphics.length; i++) {
            if(this.graphics[i].name == name) {
                return this.graphics[i];
            }
        }
        return null;
    }
}
