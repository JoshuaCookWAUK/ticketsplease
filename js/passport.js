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
		this.dataString = $.ajax({
			url: 'ajax/ajaxGetRandomPerson.php',
			type: 'GET',
			async: false
		}).responseText;
		this.dataArray = this.dataString.split(';');
		console.log(this.dataArray);
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
	getCountryRegionCode(){
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
	getRegionCode(){
		return this.dataArray[9];
	}
}