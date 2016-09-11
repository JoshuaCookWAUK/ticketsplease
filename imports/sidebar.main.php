<?php
    include "../php/credentials.php";
    $query = mysqli_query(getConnection(), "SELECT * FROM nationality");
 ?>
 <sidebar-header>
    <h3>Tickets Please!</h3>
</sidebar-header>
<sidebar-inner id="sidebar-main">
    <sidebar-group id="sidebar-group-main">
        <sidebar-item id="new-game" data-func="newGame" data-icon="plus">
            <p>New Game</p>
        </sidebar-item>
        <sidebar-item id="continue-game" data-func="continueGame" data-icon="arrow-right">
            <p>Continue Game</p>
        </sidebar-item>
    </sidebar-group>
    </sidebar-group>
</sidebar-inner>
