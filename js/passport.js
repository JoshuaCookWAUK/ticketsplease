class Passport{
	/*	var dataArray - stores information about returned persons.
		dataArray[0] = Name
		dataArray[1] = Gender
		dataArray[2] = Country
		dataArray[3] = CountryRegionCode
		dataArray[4] = SkinTone
		dataArray[5] = Notes
		dataArray[6] = issueDate
		dataArray[7] = expiryDate
		dataArray[8] = Supplier
		dataArray[9] = RegionCode
	*/
	constructor() {
		//Call database to get the person and supplier info
		this.dataString = $.ajax({
			url: 'ajax/ajaxGetRandomPerson.php',
			type: 'GET',
			async: false
		}).responseText;


		//Put the database information into a string array called dataArray
		this.dataArray = this.dataString.split(';');
		console.log(this.dataArray);

		//Set initial location of passport
		this.location = {
			x: 50,
			y: 50
		};
        this.locationActual = this.location;
        this.size = {
            w: 500,
            h: 298
        };
        this.bounds = {
            x1: this.location.x,
            x2: (this.location.x + this.size.w),
            y1: this.location.y,
            y2: (this.location.y + this.size.h)
        };
        this.capturedLocation = null;
    }

	//A collection of methods that pass information about the passport from dataArray
	getBounds() {
		return this.bounds;
	}
	getName(){
		return this.dataArray[0];
	}
	getGender(){
		return this.dataArray[1];
	}
	getCountry(){
		return this.dataArray[2];
	}
	getRegionCode(){
		return this.dataArray[3];
	}
	getSkinTone(){
		return this.dataArray[4];
	}
	getNotes(){
		return this.dataArray[5];
	}
	getissueDate(){
		return this.dataArray[6];
	}
	getexpiryDate(){
		return this.dataArray[7];
	}
	getSupplier(){
		return this.dataArray[8];
	}

	//Code to render the passport
	render(context) {
		//Draw the passport graphic
		context.drawImage(
			Graphics.getGraphicByName('passport').image,
			this.location.x,
			this.location.y
		);
		context.fillStyle = "#212121";
		context.font = "16px Lucida Console";
		context.fillText(
			this.dataArray[0].split(' ')[0],
			this.location.x + 216,
			this.location.y + 70
		);
		context.fillText(
			this.dataArray[0].split(' ')[1],
			this.location.x + 216,
			this.location.y + 120
		);
		context.fillText(
			this.dataArray[2],
			this.location.x + 216,
			this.location.y + 170
		);
		context.fillText(
			this.dataArray[1].substring(0, 1).toUpperCase(),
			this.location.x + 216,
			this.location.y + 220
		);
		context.drawImage(
			Graphics.getGraphicByName(this.getGender()).image,
			this.location.x + 10,
			this.location.y + 36
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
