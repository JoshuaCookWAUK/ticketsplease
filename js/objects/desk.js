class Desk {
    constructor(type) {
        console.log('new desk');
        this.type = type;
        this.graphics = new Array();
        for(var x = 0; x < Math.ceil(getCanvasSize().width / 512); x++) {
            for(var y = 0; y < Math.ceil(getCanvasSize().height / 512); y++) {
                var seed = Math.floor(1 + (Math.random() * 12));
                var src = 'graphicDesk' + (seed > 10 ? ('Alt' + (seed - 10)) : '');
                console.log(seed + ' | ' + src);
                this.graphics.push({
                    src: src,
                    x: (512 * x),
                    y: (512 * y)
                });
            }
        }
    }
    render(context) {
        for(var i = 0; i < this.graphics.length; i++) {
            context.drawImage(window[this.graphics[i].src], this.graphics[i].x, this.graphics[i].y, 512, 512);
        }
    }
}
