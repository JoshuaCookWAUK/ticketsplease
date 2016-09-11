class Ticket{
	constructor(dataArray) {
		//initial values in Ticket are set to the same as 
		this.SupplierName = dataArray[8];
		this.RegionCode = dataArray[9];
		this.Name = dataArray[0];
		this.valid = true;
		
		//0.05% chance that the name is different on the passport and ticket
		if(Math.random() < 0.05){
			this.valid = false;

			this.data = $.ajax({
			url: 'ajax/ajaxGetRandomReqs.php',
			type: 'GET',
			async: false
			}).responseText;

			var dataArrayTicket = this.data.split(';');
			this.Name = dataArrayTicket[2];
		}

		//set initial location of the ticket
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
		this.approved = -1;
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
	approve() {
		this.approved = 1;
	}
	decline() {
		this.approved = 0;
	}
	getNationality(){
		if(this.RegionCode == 'gb') return 'Great Britain';
		if(this.RegionCode == 'fr') return 'France';
		if(this.RegionCode == 'de') return 'Germany';
		if(this.RegionCode == 'cn') return 'China';
		if(this.RegionCode == 'hk') return 'Hong Kong';
		if(this.RegionCode == 'roi') return 'Ireland';
		if(this.RegionCode == 'esp') return 'Spain';
		if(this.RegionCode == 'us') return 'United States of America';
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
		if(this.approved == 1) {
			context.drawImage(
				Graphics.getGraphicByName('stamp-approved').image,
				this.location.x + 143,
				this.location.y + 48
			);
		} else if(this.approved == 0) {
			context.drawImage(
				Graphics.getGraphicByName('stamp-denied').image,
				this.location.x + 143,
				this.location.y + 48
			);
		}
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
