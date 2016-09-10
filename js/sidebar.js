$('html').on('click', 'sidebar-item', function() {
    switch(getSidebarParent($(this)).attr('id')) {
        case 'sidebar-main':
            handleSidebarMain($(this));
            break;
        case 'sidebar-game':
            handleSidebarGame($(this));
            break;
    }
});
function getSidebarParent($sender) {
    return $sender.closest('sidebar-inner');
}
function handleSidebarMain($sender) {
    switch($sender.attr('id')) {
        case 'new-game':
    	   Canvas.setActiveCanvas('game', true);
            switchSidebar('sidebar.game');
            break;
    }
}
function handleSidebarGame($sender){
    switch ($sender.attr('id')){
        case 'main-menu':
    	   Canvas.setActiveCanvas('menu');
            switchSidebar('sidebar');
            break;
    }
}
function switchSidebar(type) {
    state = type.split('.')[1];
    $.ajax({
        url: 'imports/' + type + '.php',
        data: {},
        success: function(response) {
            $('sidebar').html(response);
        	//desk = new Desk();
        }
    })
}
