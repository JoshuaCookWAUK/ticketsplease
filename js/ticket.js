class Ticket{
	constructor(dataArray) {
		this.SupplierName = dataArray[7];
		this.RegionCode = dataArray[8];
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
}