/*
	State Class
	-----
	This stores the state of the game. Your score and references to the
	ticket and passport are stored here.
*/
class State {
	static createGame(strikes) {
		this.score = strikes;
		this.paused = false;
		this.validationNote = '';
		this.valid = true;
		this.pass = new Passport();
		this.ticket = new Ticket(this.pass.dataArray);
		if(this.ticket.valid == false) {
			this.validationNote += 'Ticket and Supplier are not consistent.\n';
			this.valid = false;
		}
		clearInterval(this.instance);
		this.instance = setInterval((e, parent = this)=>{
			if(!this.paused){
				parent.getPassport().update();
				parent.getTicket().update();
			}
		}, 10);
		this.passedState = -1;	// -1 = nothing, 0 = failed, 1 = passed, 2 = fired
	}
	static recreateGame(){
		this.validationNote = '';
		this.valid = true;
		this.pass = new Passport();
		this.ticket = new Ticket(this.pass.dataArray);
		if(this.ticket.valid == false){
			this.validationNote += 'Ticket and Supplier are not consistent.\n';
			this.valid = false;
		}
		this.passedState = -1;
	}
	static getPassedState() {
		return this.passedState;
	}
	static setPassedState(state) {
		this.passedState = state;
	}
	static getScore() {
		return this.score;
	}
	static setScore(score) {
		this.score = score;
	}
	static isPaused(){
		return this.paused;
	}
	static pause(pause){
		this.paused = pause;
	}
	static isValid() {
		return this.valid;
	}
	static getPassport() {
		return this.pass;
	}
	static getTicket() {
		return this.ticket;
	}
}
