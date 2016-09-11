/*
    Sidebar Class
    -----
    This handles anything to do with the sidebar. It handles the dropdown
    functionality of the menu items and also handles what happens when
    you accept or decline a ticket or pause the game.
*/
class Sidebar {
    /* Initialise the sidebar. */
    static initialise() {
        this.clickable = true;
        this.setActiveSidebar('main');
        /* Sidebar item click event. */
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
            var action = ['', ''];
            if(hasAttribute(e, 'data-func')) {
                action = e.currentTarget.attributes['data-func'].value.split('-');
            }
            /* Check what the value of action is. */
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
                    if(!State.isPaused() && this.isClickable()) {
                        State.getTicket().approve();
                        (parent.isValid() ? correct(parent) : wrong(parent));
                    }
                    break;
				case 'declinePerson':
                    if(!State.isPaused() && this.isClickable()) {
                        State.getTicket().decline();
                        (parent.isValid() ? wrong(parent) : correct(parent));
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
            /* Does the element have the specified attribute? */
            function hasAttribute(e, name) {
                for(var i = 0; i < e.currentTarget.attributes.length; i++) {
                    if(e.currentTarget.attributes[i].name == name) {
                        return true;
                    }
                }
                return false;
            }
            /* Player was wrong. */
            function wrong(parent) {
                parent.clickable = false;
                State.setScore(State.getScore() - 1);
                if(State.getScore() > 0) {
                    State.setPassedState(0); // failed
                } else {
                    State.setPassedState(2); // fired
                }
                setTimeout(()=>{
                    State.setPassedState(-1); // nothing
                    if(State.getScore() > 0) {
                        State.recreateGame();
                    } else {
                        parent.setActiveSidebar('main');
                        Canvas.setActiveCanvas('main');
                    }
                    parent.clickable = true;
                }, (State.getScore() > 0 ? 1000 : 5000));
            }
            /* Player was correct. */
            function correct(parent) {
                parent.clickable = false;
                State.setPassedState(1); // passed
                setTimeout(()=>{
                    State.setPassedState(-1); // nothing
                    State.recreateGame();
                    parent.clickable = true;
                }, 1000);
            }
        });
    }
    /* Check to see if accept / decline buttons clickable. */
    static isClickable() {
        return this.clickable;
    }
    /* Check to see if the passport / ticket is allowed. */
    static isValid() {
        if(document.getElementById('validPassport-' + State.getPassport().getRegionCode()) == null)
			return false;
        if(document.getElementById('validTicket-' + State.getTicket().getSupplier()) == null)
			return false;
        if(State.getPassport().getName() != State.getTicket().getName())
			return false;
        return true;
    }
    /* Set the active sidebar. */
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
