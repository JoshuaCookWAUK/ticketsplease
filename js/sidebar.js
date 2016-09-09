$('html').on('click', 'sidebar-item', function() {
    switch(getSidebarParent($(this)).attr('id')) {
        case 'sidebar-main':
            handleSidebarMain($(this));
            break;
    }
});
function getSidebarParent($sender) {
    return $sender.closest('sidebar-inner');
}
function handleSidebarMain($sender) {
    switch($sender.attr('id')) {
        case 'new-game':
            switchSidebar('sidebar.game');
            break;
    }
}
function switchSidebar(type) {
    $.ajax({
        url: 'imports/' + type + '.php',
        data: {},
        success: function(response) {
            $('sidebar').html(response);
        	desk = new Desk();
        }
    })
}
