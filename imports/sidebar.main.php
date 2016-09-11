<?php
    include "../php/credentials.php";
    $query = mysqli_query(getConnection(), "SELECT * FROM nationality");
 ?>
 <sidebar-header>
    <h3>Tickets Please!</h3>
</sidebar-header>
<sidebar-inner id="sidebar-main">
    <sidebar-group id="sidebar-group-main">
        <sidebar-item id="new-game" data-id="new-game" data-icon="plus" data-expandable>
            <p>New Game</p>
        </sidebar-item>
		<sidebar-sub-group data-expanded="false" data-parent="new-game">
            <sidebar-item data-func="newGame-5">
                <p>Beginner</p>
            </sidebar-item>
            <sidebar-item data-func="newGame-3">
                <p>Intermediate</p>
            </sidebar-item>
            <sidebar-item data-func="newGame-1">
                <p>Expert</p>
            </sidebar-item>
		</sidebar-sub-group>
    </sidebar-group>
    </sidebar-group>
</sidebar-inner>
