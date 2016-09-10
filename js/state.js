class State {
	constructor(){
		this.validationNote = '';
		this.valid = true;
		this.pass = new Passport();
		this.ticket = new Ticket(this.pass.dataArray);
		if(this.ticket.valid == false){
			this.validationNote = this.validationNote + 'Ticket and Supplier are not consistent.\n';
			this.valid = false;
		}
		
		/*Bug to fix: document.getElementById("passport-gb") is always null, not sure how to check if it's true.
		console.log(document.getElementById("passport-gb"));
		if((document.getElementById("passport-gb") == null)&&(pass.getRegionCode() == 'gb')){
			console.log('test');
			this.validationNote = this.validationNote + 'Region code gb is not a valid passport';
			this.valid = false;
		}
		*/
	}
	isValid(){
		return this.valid;
	}
	getPass(){
		return this.pass;
	}
}
