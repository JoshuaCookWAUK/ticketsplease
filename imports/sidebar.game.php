<?php
    include "../php/credentials.php";
    $conn = getConnection();
    $validPassports = mysqli_query($conn, "SELECT * FROM nationality");
    $validTickets = mysqli_query($conn, "SELECT * FROM supplier");
    mysqli_close($conn);

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
        <?php while($queryData = $validPassports->fetch_assoc()): ?>
            <sidebar-item id="passport-<?= $queryData["RegionCode"] ?>" data-icon="flag-<?= $queryData["RegionCode"] ?>">
                <p><?= $queryData["Country"] ?></p>
            </sidebar-item>
        <?php endwhile; ?>
    </sidebar-group>
    <sidebar-group id="sidebar-group-ticket">
        <sidebar-title>
            <h3>Valid Tickets</h3>
        </sidebar-title>
        <?php while($queryData = $validTickets->fetch_assoc()): ?>
            <sidebar-item id="validTicket-<?= $queryData["RegionCode"] ?>" data-icon="flag-<?= $queryData["RegionCode"] ?>">
                <p><?= $queryData["Name"] ?></p>
            </sidebar-item>
        <?php endwhile; ?>
    </sidebar-group>
</sidebar-inner>
