/*
	Graphics Class
	-----
	Used to store all of the graphics that are used in the game.
*/
class Graphics {
    /* Initialise the array. */
    static initialise() {
        this.graphics = new Array();
    }
    /* Add a new graphic passing in the name and location. */
    static addGraphic(name, src) {
        var graphic = new Image();
        graphic.src = src;
        this.graphics.push({
            name: name,
            image: graphic
        });
    }
    /* Get all the graphics. */
    static getGraphics() {
        return this.graphics;
    }
    /* Get a specific graphic by the name. */
    static getGraphicByName(name) {
        for(var i = 0; i < this.graphics.length; i++) {
            if(this.graphics[i].name == name) {
                return this.graphics[i];
            }
        }
        return null;
    }
}
