class Desk {
    constructor(canvas) {
        this.graphics = new Array();
        for(var x = 0; x < Math.ceil(getCanvasSize(canvas).width / 512); x++) {
            for(var y = 0; y < Math.ceil(getCanvasSize(canvas).height / 512); y++) {
                var seed = Math.floor(1 + (Math.random() * 12));
                //var src = 'graphicDesk' + (seed > 10 ? ('Alt' + (seed - 10)) : '');
                var src = 'desk';
                this.graphics.push({
                    imagename: src,
                    x: (512 * x),
                    y: (512 * y)
                });
            }
        }
    }
    render(context) {
        for(var i = 0; i < this.graphics.length; i++) {
            context.drawImage(Graphics.getGraphicByName(this.graphics[i].imagename).image, this.graphics[i].x, this.graphics[i].y, 512, 512);
        }
    }
}
