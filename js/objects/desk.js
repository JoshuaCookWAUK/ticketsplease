class Desk {
    constructor(canvas) {
        this.graphics = new Array();
        for(var x = 0; x < Math.ceil(8192 / 512); x++) {
            for(var y = 0; y < Math.ceil(4096 / 512); y++) {
                var seed = Math.floor(1 + (Math.random() * 12));
                var src = 'desk' + (seed > 10 ? ((seed - 10)) : '');
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
