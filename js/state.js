class State {
	static createGame() {
		this.validationNote = '';
		this.valid = true;
		this.pass = new Passport();
		this.ticket = new Ticket(this.pass.dataArray);
		if(this.ticket.valid == false){
			this.validationNote = this.validationNote + 'Ticket and Supplier are not consistent.\n';
			this.valid = false;
		}
	}
	static isValid() {
		return this.valid;
	}
	static getPass() {
		return this.pass;
	}
	static getTicket() {
		return this.ticket;
	}
}
