<?php
    include "../php/credentials.php";
    $query = mysqli_query(getConnection(), "SELECT * FROM nationality");
 ?>

<sidebar-header>
    <h3>Tickets Please!</h3>
</sidebar-header>
<sidebar-inner id="sidebar-game">
<sidebar-group id="sidebar-group-main">
        <sidebar-item data-icon="arrow-left">
            <p>Main Menu</p>
        </sidebar-item>
    </sidebar-group>
    <sidebar-break></sidebar-break>
    <sidebar-group id="sidebar-group-passports">
        <sidebar-title>
            <h3>Valid Passports</h3>
        </sidebar-title>
        <?php while($queryData = $query->fetch_assoc()): ?>
            <sidebar-item id="new-game" data-icon="flag-<?= $queryData["RegionCode"] ?>">
                <p><?= $queryData["Country"] ?></p>
            </sidebar-item>
        <?php endwhile; ?>
    </sidebar-group>
    <sidebar-group id="sidebar-group-passports">
        <sidebar-title>
            <h3>Valid Tickets</h3>
        </sidebar-title>
        <sidebar-item data-icon="flag-gb">
            <p>EasyPlane</p>
        </sidebar-item>
        <sidebar-item data-icon="flag-gb">
            <p>DavidAir</p>
        </sidebar-item>
        <sidebar-item data-icon="flag-gb">
            <p>British Planeways</p>
        </sidebar-item>
        <sidebar-item data-icon="flag-de">
            <p>Lifthansa</p>
        </sidebar-item>
        <sidebar-item data-icon="flag-fr">
            <p>Wind France</p>
        </sidebar-item>
    </sidebar-group>
</sidebar-inner>
