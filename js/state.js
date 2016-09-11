class State {
	static createGame(strikes) {
		this.score = strikes;
		this.paused = false;
		this.validationNote = '';
		this.valid = true;
		this.pass = new Passport();
		this.ticket = new Ticket(this.pass.dataArray);
		if(this.ticket.valid == false){
			this.validationNote = this.validationNote + 'Ticket and Supplier are not consistent.\n';
			this.valid = false;
		}
		clearInterval(this.instance);
		this.instance = setInterval((e, parent = this)=>{
			if(!this.paused){
				parent.getPass().update();
				parent.getTicket().update();
			}
		}, 10);
	}

	static isPaused(){
		return this.paused;
	}

	static pause(pause){
		this.paused = pause;
	}
	static recreateGame(){
		this.validationNote = '';
		this.valid = true;
		this.pass = new Passport();
		this.ticket = new Ticket(this.pass.dataArray);
		if(this.ticket.valid == false){
			this.validationNote = this.validationNote + 'Ticket and Supplier are not consistent.\n';
			this.valid = false;
		}
		clearInterval(this.instance);
		this.instance = setInterval((e, parent = this)=>{
			parent.getPass().update();
			parent.getTicket().update();
		}, 10);
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
