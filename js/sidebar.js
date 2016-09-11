class Sidebar {
    static initialise() {
        this.setActiveSidebar('main');
        $('html').on('click', 'sidebar-item', (e, parent = this)=>{
            switch(e.currentTarget.attributes['data-func'].value) {
                case "newGame":
                    parent.setActiveSidebar('game');
                    Canvas.setActiveCanvas('game', true);
					State.createGame();
                    break;
				case "continueGame":
					if(State.getPass() != null){
						parent.setActiveSidebar('game');
						Canvas.setActiveCanvas('game', true);
					}
                    break;
                case 'backToMenu':
                    parent.setActiveSidebar('main');
            	    Canvas.setActiveCanvas('main');
                    break;
				case 'acceptPerson':
					this.validate();
					console.log(this.validationMessage);
					if(this.validationMessage == '') console.log('Correct');
					else console.log('Wrong');
					break;
				case 'declinePerson':
					this.validate();
					console.log(this.validationMessage);
					if(this.validationMessage == '') console.log('Wrong');
					else console.log('Correct');
            }
        });
    }
	
	static validate(){
		this.valid = State.isValid();
		this.validationMessage = State.validationNote;
		if(document.getElementById("passport-gb")==null && State.getPass().getCountryRegionCode()=='gb'){
			this.validationMessage = this.validationMessage +'false region code gb';
		}
		else if(document.getElementById("passport-fr")==null && State.getPass().getCountryRegionCode()=='fr'){
			this.validationMessage = this.validationMessage +'false region code fr';
		}
		else if(document.getElementById("passport-de")==null && State.getPass().getCountryRegionCode()=='de'){
			this.validationMessage = this.validationMessage +'false region code de';
		}
		if(document.getElementById("validTicket-gb")==null && State.getTicket().getRegionCode()=='gb'){
			this.validationMessage = this.validationMessage +'false ticket code gb';
		}
		else if(document.getElementById("validTicket-fr")==null && State.getTicket().getRegionCode()=='fr'){
			this.validationMessage = this.validationMessage +'false ticket code fr';
		}
		else if(document.getElementById("validTicket-de")==null && State.getTicket().getRegionCode()=='de'){
			this.validationMessage = this.validationMessage +'false ticket code de';
		}
	}

    static setActiveSidebar(name, params) {
        $.ajax({
            url: 'imports/sidebar.' + name + '.php',
            data: params,
            success: function(response) {
                $('sidebar').html(response);
            }
        })
    }
}
