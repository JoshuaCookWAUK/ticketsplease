/*
	Ticket Class
	-----
	This stores information about the ticket and is also responsible
	for the rendering of the ticket.
*/
class Ticket{
	//create array for months so when using getMonth
	//the integer returned can be pointing to the index of the array
	constructor(dataArray) {
		this.months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		//declare variables
		this.SupplierName = dataArray[8];
		this.RegionCode = dataArray[9];
		this.Name = dataArray[0];
		this.FlightNumber = this.SupplierName.substring(0, 3).toUpperCase() + Math.floor(100 + (Math.random() * 999));
		this.SeatNumber = String.fromCharCode(Math.floor(1 + (Math.random() * 10)) + 64) + Math.floor(1 + (Math.random() * 22) + 27);
		this.gateNumber = String.fromCharCode(Math.floor(1 + (Math.random() * 7)) + 64) + Math.floor(1 + (Math.random() * 22) + 27);
		var date = new Date();
		this.departureDate = this.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
		this.boardingTime = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
		this.valid = true;
		this.valid = false;
		this.data = $.ajax({
			url: 'ajax/ajaxGetRandomReqs.php',
			type: 'GET',
			async: false
		}).responseText;
		var dataArrayTicket = this.data.split(';');
		this.Name = dataArrayTicket[2];
		this.location = {
			x: 400,
			y: 200
		};
        this.locationActual = this.location;
        this.size = {
            w: 620,
            h: 260
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
		if(this.RegionCode == 'us') return 'USA';
		return 'Error: Add region code to getNationality()';
	}
	/* rendering instead of putting rendering all the canvas all the time. */
	render(context) {
		context.drawImage(
			Graphics.getGraphicByName('ticket').image,
			this.location.x,
			this.location.y
		);
		context.fillStyle = "#212121";
		context.font = "20px Arial";
		context.fillText(
			this.SupplierName,
			(this.location.x + 101) + ((344 / 2) - (context.measureText(this.SupplierName).width / 2)),
			(this.location.y + 17) + (43 / 2)
		);
		context.font = "14px Arial";
		/* Passenger */
		context.fillText(
			this.Name,
			this.location.x + 30,
			this.location.y + 94
		);
		/* Passenger */
		context.fillText(
			this.Name,
			this.location.x + 451,
			this.location.y + 94
		);
		/* Departure Date */
		context.fillText(
			this.departureDate,
			this.location.x + 200,
			this.location.y + 94
		);
		context.font = "20px Arial";
		/* Flight Number LHS */
		context.fillText(
			this.FlightNumber,
			this.location.x + 29,
			this.location.y + 143
		);
		/* Departure Airport */
		context.fillText(
			this.getNationality(),
			this.location.x + 130,
			this.location.y + 143
		);
		/* Boarding Time Top */
		context.fillText(
			this.boardingTime,
			this.location.x + 285,
			this.location.y + 143
		);
		/* Boarding Time Bottom */
		context.fillText(
			this.boardingTime,
			this.location.x + 328,
			this.location.y + 200
		);
		/* Boarding Time RHS */
		context.fillText(
			this.boardingTime,
			this.location.x + 450,
			this.location.y + 157
		);
		/* Gate Number */
		context.fillText(
			this.gateNumber,
			this.location.x + 384,
			this.location.y + 143
		);
		/* Where's my seat LHS? */
		context.fillText(
			this.SeatNumber,
			this.location.x + 130,
			this.location.y + 200
		);
		/* Where's my seat RHS? */
		context.fillText(
			this.SeatNumber,
			this.location.x + 450,
			this.location.y + 215
		);
		context.fillStyle = "#FEFEFE";
		/* Flight Number RHS */
		context.fillText(
			this.FlightNumber,
			(this.location.x + 445) + ((165 / 2) - (context.measureText(this.FlightNumber).width / 2)),
			(this.location.y + 17) + (43 / 2)
		);
		if(this.approved == 1) {
			context.drawImage(
				Graphics.getGraphicByName('stamp-approved').image,
				this.location.x + (this.size.w / 2) - 150,
				this.location.y + (this.size.h / 2) - 64
			);
		} else if(this.approved == 0) {
			context.drawImage(
				Graphics.getGraphicByName('stamp-denied').image,
				this.location.x + (this.size.w / 2) - 150,
				this.location.y + (this.size.h / 2) - 64
			);
		}
	}
	/* Anything that wants to be updated every frame */
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
