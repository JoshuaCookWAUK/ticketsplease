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
		console.log(this.dataArray[0]);
    }
}