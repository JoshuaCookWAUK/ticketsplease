class Sidebar {
    static initialise() {
        this.setActiveSidebar('main');
        $('html').on('click', 'sidebar-item[data-expandable]', function() {
            $('.sidebar-item').children('expand').removeClass('expanded');
            $('.sidebar-sub-group:not([data-parent=' + $(this).attr('data-id') + '])').each(function() {
                $(this).attr('data-expanded', 'false');
                $(this).children('expand').removeClass('expanded');
            });
            if($('sidebar-sub-group[data-parent=' + $(this).attr('data-id') + ']').attr('data-expanded') != 'true') {
                $('sidebar-sub-group[data-parent=' + $(this).attr('data-id') + ']').attr('data-expanded', 'true');
                $(this).children('expand').addClass('expanded');
            } else {
                $('sidebar-sub-group[data-parent=' + $(this).attr('data-id') + ']').attr('data-expanded', 'false');
                $(this).children('expand').removeClass('expanded');
            }
        });
        $('html').on('click', 'sidebar-item', (e, parent = this)=>{
            console.log(e);
            var action = ['', ''];
            if(hasAttribute(e, 'data-func')) {
                action = e.currentTarget.attributes['data-func'].value.split('-');
            }
            switch(action[0]) {
                case "newGame":
                    parent.setActiveSidebar('game');
                    Canvas.setActiveCanvas('game', true);
                    State.createGame(action[1]);
                    break;
                case 'backToMenu':
                    parent.setActiveSidebar('main');
            	    Canvas.setActiveCanvas('main');
                    break;
                case 'acceptPerson':
                    if(!State.isPaused()) {
                        this.validate();
                        console.log(this.validationMessage);
                        if(this.validationMessage == '') correct();
                        else wrong();
                    }
                    break;

				case 'declinePerson':
                    if(!State.isPaused()) {
                        this.validate();
    					console.log(this.validationMessage);
    					if(this.validationMessage == '') wrong();
    					else correct();
                    }
                    break;
                case 'pause':
                    if(!State.isPaused()) {
                        e.currentTarget.innerHTML = "<p>Resume</p>";
                        e.currentTarget.attributes["data-icon"].value="resume";
                        Canvas.getActiveCanvas().stop();
                        State.pause(true);
                    } else {
                        e.currentTarget.innerHTML = "<p>Pause</p>";
                        e.currentTarget.attributes["data-icon"].value="pause";
                        Canvas.getActiveCanvas().resume();
                        State.pause(false);
                    }
                    break;
            }
            function hasAttribute(e, name) {
                for(var i = 0; i < e.currentTarget.attributes.length; i++) {
                    if(e.currentTarget.attributes[i].name == name) {
                        return true;
                    }
                }
                return false;
            }
            function wrong() {
				State.score = State.score - 1;
				var w = window.open('','','width=200,height=100,top=400,left=500');
				if(State.score <= 0) w.document.write('Game Over');
                else w.document.write('YOU ARE WRONG!');
                w.focus();
                setTimeout(function() {
								w.close();
								if(State.score > 0) State.recreateGame();
								else {
									parent.setActiveSidebar('main');
									Canvas.setActiveCanvas('main');
								}
							}
							, 1000);
            }
            function correct() {
				//State.score = State.score + 5;
				console.log(State.score);
                var w = window.open('','','width=200,height=100,top=400,left=500');
                w.document.write('YOU ARE CORRECT!');
                w.focus();
                setTimeout(function() {w.close(); State.recreateGame();}, 1000);
            }
        });
    }

	static validate() {
		this.valid = State.isValid();
		this.validationMessage = State.validationNote;
		if(document.getElementById("passport-gb")==null && State.getPass().getCountryRegionCode()=='gb') {
			this.validationMessage = this.validationMessage +'false region code gb';
		}
		else if(document.getElementById("passport-fr")==null && State.getPass().getCountryRegionCode()=='fr') {
			this.validationMessage = this.validationMessage +'false region code fr';
		}
		else if(document.getElementById("passport-de")==null && State.getPass().getCountryRegionCode()=='de') {
			this.validationMessage = this.validationMessage +'false region code de';
		}
        else if(document.getElementById("validTicket-roi")==null && State.getPass().getRegionCode()=='roi') {
            this.validationMessage = this.validationMessage +'false ticket code roi';
        }
        else if(document.getElementById("validTicket-us")==null && State.getPass().getRegionCode()=='us') {
            this.validationMessage = this.validationMessage +'false ticket code us';
        }
        else if(document.getElementById("validTicket-esp")==null && State.getPass().getRegionCode()=='esp') {
            this.validationMessage = this.validationMessage +'false ticket code esp';
        }
        else if(document.getElementById("validTicket-hk")==null && State.getPass().getRegionCode()=='hk') {
            this.validationMessage = this.validationMessage +'false ticket code hk';
        }
        else if(document.getElementById("validTicket-cn")==null && State.getPass().getRegionCode()=='cn') {
            this.validationMessage = this.validationMessage +'false ticket code cn';
        }
		if(document.getElementById("validTicket-gb")==null && State.getTicket().getRegionCode()=='gb') {
			this.validationMessage = this.validationMessage +'false ticket code gb';
		}
		else if(document.getElementById("validTicket-fr")==null && State.getTicket().getRegionCode()=='fr') {
			this.validationMessage = this.validationMessage +'false ticket code fr';
		}
		else if(document.getElementById("validTicket-de")==null && State.getTicket().getRegionCode()=='de') {
			this.validationMessage = this.validationMessage +'false ticket code de';
		}
        else if(document.getElementById("validTicket-roi")==null && State.getTicket().getRegionCode()=='roi') {
            this.validationMessage = this.validationMessage +'false ticket code roi';
        }
        else if(document.getElementById("validTicket-us")==null && State.getTicket().getRegionCode()=='us') {
            this.validationMessage = this.validationMessage +'false ticket code us';
        }
        else if(document.getElementById("validTicket-esp")==null && State.getTicket().getRegionCode()=='esp') {
            this.validationMessage = this.validationMessage +'false ticket code esp';
        }
        else if(document.getElementById("validTicket-hk")==null && State.getTicket().getRegionCode()=='hk') {
            this.validationMessage = this.validationMessage +'false ticket code hk';
        }
        else if(document.getElementById("validTicket-cn")==null && State.getTicket().getRegionCode()=='cn') {
            this.validationMessage = this.validationMessage +'false ticket code cn';
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
