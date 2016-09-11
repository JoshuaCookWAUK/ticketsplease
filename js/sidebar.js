/*
    Sidebar Class
    -----
    This handles anything to do with the sidebar. It handles the dropdown
    functionality of the menu items and also handles what happens when
    you accept or decline a ticket or pause the game.
*/
class Sidebar {
    static initialise() {
        this.clickable = true;
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
                    if(!State.isPaused() && this.isClickable()) {
                        State.getTicket().approve();
                        (parent.isValid() ? correct(parent) : wrong(parent));
                    }
                    break;
				case 'declinePerson':
                    if(!State.isPaused() && this.isClickable()) {
                        State.getTicket().decline();
                        (parent.isValid() ? correct(parent) : wrong(parent));
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
    static isClickable() {
        return this.clickable;
    }
    static isValid() {
        if(document.getElementById("passport-gb") == null && State.getPassport().getCountryRegionCode()=='gb')
            return false;
        if(document.getElementById("passport-fr")==null && State.getPassport().getCountryRegionCode()=='fr')
            return false;
        if(document.getElementById("passport-de")==null && State.getPassport().getCountryRegionCode()=='de')
            return false;
        if(document.getElementById("validTicket-roi")==null && State.getPass().getRegionCode()=='roi')
            return false;
        if(document.getElementById("validTicket-us")==null && State.getPass().getRegionCode()=='us')
            return false;
        if(document.getElementById("validTicket-esp")==null && State.getPass().getRegionCode()=='esp')
            return false;
        if(document.getElementById("validTicket-hk")==null && State.getPass().getRegionCode()=='hk')
            return false;
        if(document.getElementById("validTicket-cn")==null && State.getPass().getRegionCode()=='cn')
            return false;
        if(document.getElementById("validTicket-gb")==null && State.getTicket().getRegionCode()=='gb')
            return false;
        if(document.getElementById("validTicket-fr")==null && State.getTicket().getRegionCode()=='fr')
            return false;
        if(document.getElementById("validTicket-de")==null && State.getTicket().getRegionCode()=='de')
            return false;
        if(document.getElementById("validTicket-roi")==null && State.getTicket().getRegionCode()=='roi')
            return false;
        if(document.getElementById("validTicket-us")==null && State.getTicket().getRegionCode()=='us')
            return false;
        if(document.getElementById("validTicket-esp")==null && State.getTicket().getRegionCode()=='esp')
            return false;
        if(document.getElementById("validTicket-hk")==null && State.getTicket().getRegionCode()=='hk')
            return false;
        if(document.getElementById("validTicket-cn")==null && State.getTicket().getRegionCode()=='cn')
            return false;
        if(document.getElementsByClassName(State.getTicket().getSupplier().replace(/\s+/g, ''))==null)
            return false;
        return true;
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
