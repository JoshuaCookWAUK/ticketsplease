class Sidebar {
    static initialise() {
        this.setActiveSidebar('main');
        $('html').on('click', 'sidebar-item', (e, parent = this)=>{
            switch(e.currentTarget.attributes['data-func'].value) {
                case "newGame":
                    parent.setActiveSidebar('game');
                    Canvas.setActiveCanvas('game', true);
					Canvas.state = new State();
                    break;
				case "continueGame":
					parent.setActiveSidebar('game');
                    Canvas.setActiveCanvas('game', true);
                    break;
                case 'backToMenu':
                    parent.setActiveSidebar('main');
            	    Canvas.setActiveCanvas('main');
                    break;
				case 'acceptPerson':
					this.valid = Canvas.state.isValid();
					this.validationMessage = Canvas.state.validationNote;
					if(document.getElementById("passport-gb")==null && Canvas.state.getPass().getCountryRegionCode()=='gb'){
						this.validationMessage = this.validationMessage +'false region code gb';
					}
					else if(document.getElementById("passport-fr")==null && Canvas.state.getPass().getCountryRegionCode()=='fr'){
						this.validationMessage = this.validationMessage +'false region code fr';
					}
					else if(document.getElementById("passport-de")==null && Canvas.state.getPass().getCountryRegionCode()=='de'){
						this.validationMessage = this.validationMessage +'false region code de';
					}
					if(document.getElementById("validTicket-gb")==null && Canvas.state.getTicket().getRegionCode()=='gb'){
						this.validationMessage = this.validationMessage +'false ticket code gb';
					}
					else if(document.getElementById("validTicket-fr")==null && Canvas.state.getTicket().getRegionCode()=='fr'){
						this.validationMessage = this.validationMessage +'false ticket code fr';
					}
					else if(document.getElementById("validTicket-de")==null && Canvas.state.getTicket().getRegionCode()=='de'){
						this.validationMessage = this.validationMessage +'false ticket code de';
					}
					console.log(this.validationMessage);
					if(this.validationMessage == '') console.log('Correct');
					else console.log('Wrong');
					break;
				case 'declinePerson':
					this.valid = Canvas.state.isValid();
					this.validationMessage = Canvas.state.validationNote;
					if(document.getElementById("passport-gb")==null && Canvas.state.getPass().getCountryRegionCode()=='gb'){
						this.validationMessage = this.validationMessage +'false region code gb';
					}
					else if(document.getElementById("passport-fr")==null && Canvas.state.getPass().getCountryRegionCode()=='fr'){
						this.validationMessage = this.validationMessage +'false region code fr';
					}
					else if(document.getElementById("passport-de")==null && Canvas.state.getPass().getCountryRegionCode()=='de'){
						this.validationMessage = this.validationMessage +'false region code de';
					}
					if(document.getElementById("validTicket-gb")==null && Canvas.state.getTicket().getRegionCode()=='gb'){
						this.validationMessage = this.validationMessage +'false ticket code gb';
					}
					else if(document.getElementById("validTicket-fr")==null && Canvas.state.getTicket().getRegionCode()=='fr'){
						this.validationMessage = this.validationMessage +'false ticket code fr';
					}
					else if(document.getElementById("validTicket-de")==null && Canvas.state.getTicket().getRegionCode()=='de'){
						this.validationMessage = this.validationMessage +'false ticket code de';
					}
					console.log(this.validationMessage);
					if(this.validationMessage == '') console.log('Wrong');
					else console.log('Correct');
            }
        });
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
