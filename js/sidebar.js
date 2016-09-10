class Sidebar {
    static initialise() {
        this.setActiveSidebar('main');
        $('html').on('click', 'sidebar-item', (e, parent = this)=>{
            switch(e.currentTarget.attributes['data-func'].value) {
                case "newGame":
                    parent.setActiveSidebar('game');
                    Canvas.setActiveCanvas('game', true);
                    break;
                case 'backToMenu':
                    parent.setActiveSidebar('main');
            	    Canvas.setActiveCanvas('main');
                    break;
				case 'acceptPerson':
					console.log(Canvas.state.getPass().getRegionCode());
					this.valid = Canvas.state.isValid();
					this.validationMessage = Canvas.state.validationNote;
					if(document.getElementById("passport-gb")==null && Canvas.state.getPass().getRegionCode()=='gb'){
						console.log('false region code');
					}
					else if(document.getElementById("passport-fr")==null && Canvas.state.getPass().getRegionCode()=='fr'){
						console.log('false region code');
					}
					else if(document.getElementById("passport-de")==null && Canvas.state.getPass().getRegionCode()=='de'){
						console.log('false region code');
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
