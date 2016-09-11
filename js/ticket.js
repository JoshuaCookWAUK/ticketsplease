class Ticket{
	constructor(dataArray) {
		this.SupplierName = dataArray[8];
		this.RegionCode = dataArray[9];
		this.Name = dataArray[0];
		this.valid = true;
		if(Math.random() < 0.05){
			this.valid = false;

			this.data = $.ajax({
			url: 'ajax/ajaxGetRandomReqs.php',
			type: 'GET',
			async: false
			}).responseText;

			var dataArrayTicket = this.data.split(';');
			var rand = Math.random();
			if(rand<0.33) this.SupplierName = dataArrayTicket[0];
			else if(rand<0.66) this.RegionCode = dataArrayTicket[1];
			else this.Name = dataArrayTicket[2];
		}
		console.log(this.SupplierName + ' ' + this.RegionCode + ' ' + this.Name);

		this.location = {
			x: 200,
			y: 600
		};
        this.locationActual = this.location;
        this.size = {
            w: 886,
            h: 353
        };
        this.bounds = {
            x1: this.location.x,
            x2: (this.location.x + this.size.w),
            y1: this.location.y,
            y2: (this.location.y + this.size.h)
        };
        this.capturedLocation = null;
	}
	getBounds() {
		return this.bounds;
	}
	getSupplier(){
		return this.SupplierName;
	}
	getRegionCode(){
		return this.RegionCode;
	}
	getName(){
		return this.Name;
	}
	getNationality(){
		if(this.RegionCode == 'gb') return 'Great Britain';
		if(this.RegionCode == 'fr') return 'France';
		if(this.RegionCode == 'de') return 'Germany';
		if(this.RegionCode == 'cn') return 'China';
		if(this.RegionCode == 'hk') return 'Hong Kong';
		return 'Error: Add region code to getNationality()';
	}
	render(context) {
		context.drawImage(
			Graphics.getGraphicByName('ticket').image,
			this.location.x,
			this.location.y
		);

		context.fillStyle = "#212121";
		context.font = "16px Arial";
		context.fillText(
			"Name of holder: " + this.Name,
			this.location.x + 50,
			this.location.y + 100
		);
		context.fillText(
			"Supplier: " + this.SupplierName,
			this.location.x + 50,
			this.location.y + 150
		);
		context.fillText(
			"Country: " + this.getNationality(),
			this.location.x + 50,
			this.location.y + 200
		);
		context.fillText(
			"Name: " + this.Name,
			this.location.x + 653,
			this.location.y + 100
		);
	}
    update() {
        if(Input.mouseInBounds(this.getBounds()) && Input.getMouseButtons().lmb) {
            if(this.capturedLocation == null)
                this.capturedLocation = Input.getMouseLocation();
            var difference = Input.mouseDifference(this.capturedLocation);
            var newLocation = {
                x: this.locationActual.x + difference.x,
                y: this.locationActual.y + difference.y
            };
            this.location = {
                x: (Input.outBoundsX(newLocation.x, this.size) ? this.location.x : newLocation.x),
                y: (Input.outBoundsY(newLocation.y, this.size) ? this.location.y : newLocation.y)
            };
            this.bounds = {
                x1: this.location.x,
                x2: (this.location.x + this.size.w),
                y1: this.location.y,
                y2: (this.location.y + this.size.h)
            };
        }
        if(!Input.getMouseButtons().lmb) {
            this.locationActual = this.location;
            this.capturedLocation = null;
        }
    }
}
