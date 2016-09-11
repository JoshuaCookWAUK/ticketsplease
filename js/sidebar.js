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
                case 'backToMenu':
                    parent.setActiveSidebar('main');
            	    Canvas.setActiveCanvas('main');
                    break;
				case 'acceptPerson':
					console.log(Canvas.state.getPass().getCountryRegionCode());
					console.log(Canvas.state.getTicket().getRegionCode());
					console.log(Canvas.state.getTicket().getSupplier());
					console.log(Canvas.state.getTicket().getName());
					this.valid = Canvas.state.isValid();
					this.validationMessage = Canvas.state.validationNote;
					if(document.getElementById("passport-gb")==null && Canvas.state.getPass().getCountryRegionCode()=='gb'){
						console.log('false region code gb');
					}
					else if(document.getElementById("passport-fr")==null && Canvas.state.getPass().getCountryRegionCode()=='fr'){
						console.log('false region code fr');
					}
					else if(document.getElementById("passport-de")==null && Canvas.state.getPass().getCountryRegionCode()=='de'){
						console.log('false region code de');
					}
					console.log(document.getElementById("validTicket-gb"));
					console.log(Canvas.state.getTicket().getRegionCode());
					if(document.getElementById("validTicket-gb")==null && Canvas.state.getTicket().getRegionCode()=='gb'){
						console.log('false ticket code gb');
					}
					else if(document.getElementById("validTicket-fr")==null && Canvas.state.getTicket().getRegionCode()=='fr'){
						console.log('false ticket code fr');
					}
					else if(document.getElementById("validTicket-de")==null && Canvas.state.getTicket().getRegionCode()=='de'){
						console.log('false ticket code de');
					}
					console.log(this.validationMessage);
					break;
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
