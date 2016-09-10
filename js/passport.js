class Passport{
	/*	var dataArray - stores information about returned persons. 
		dataArray[0] = Name
		dataArray[1] = Gender
		dataArray[2] = Country
		dataArray[3] = SkinTone
		dataArray[4] = Notes
		dataArray[5] = issueDate
		dataArray[6] = expiryDate
		dataArray[7] = Supplier
		dataArray[8] = RegionCode
	*/
	constructor() {
		this.dataString = $.ajax({
			url: 'ajax/ajaxGetRandomPerson.php',
			type: 'GET',
			async: false
		}).responseText;
		this.dataArray = this.dataString.split(';');
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
	getSkinTone(){
		return this.dataArray[3];
	}
	getNotes(){
		return this.dataArray[4];
	}
	getissueDate(){
		return this.dataArray[5];
	}
	getexpiryDate(){
		return this.dataArray[6];
	}
	getSupplier(){
		return this.dataArray[7];
	}
	getRegionCode(){
		return this.dataArray[8];
	}
}