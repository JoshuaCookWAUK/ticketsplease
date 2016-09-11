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
	}
	isValid(){
		return this.valid;
	}
	getPass(){
		return this.pass;
	}
	getTicket(){
		return this.ticket;
	}
}
