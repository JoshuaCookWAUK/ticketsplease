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
	render(context) {
		context.beginPath();
		context.fillStyle = "#fefefe";
		context.rect(this.location.x, this.location.y, 1000, 200);
		context.fill();
		context.closePath();
		
		context.fillStyle = "#212121";
		context.font = "20px Arial";
		context.fillText(
			"Name of holder: " + this.Name,
			this.location.x + 50,
			this.location.y + 100
		);
		context.fillText(
			"Supplier: " + this.SupplierName,
			this.location.x + 50,
			this.location.y + 50
		);
		context.fillText(
			"RegionCode: " + this.RegionCode,
			this.location.x + 500,
			this.location.y + 50
		);
	}
}