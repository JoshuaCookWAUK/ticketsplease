<?php
    include "../php/credentials.php";
    $validPassportCONN = getConnection();
    $validPassportCONN->query("SET @param  = ".(string)rand(1,2));
    $validPassports = $validPassportCONN->query("CALL spValidNatGet(@param)");
	$randomTicketAmount = rand(5,11);
    $validTicketCONN = getConnection();
    $validTicketCONN->query("SET @ticketAmount  = ".(string)$randomTicketAmount);
    $validTickets = $validTicketCONN->query("CALL spValidTicketGet(@ticketAmount)");
?>
<sidebar-header>
    <h3>Tickets Please!</h3>
</sidebar-header>
<sidebar-inner id="sidebar-game">
<sidebar-group id="sidebar-group-main">
        <sidebar-item id="main-menu" data-func="backToMenu" data-icon="arrow-left">
            <p>Main Menu</p>
        </sidebar-item>
    </sidebar-group>
    <sidebar-break></sidebar-break>
    <sidebar-group id="sidebar-group-buttons">
        <sidebar-item data-func="acceptPerson" data-icon="accept" data-style="accept">
            <p>Accept</p>
        </sidebar-item>
        <sidebar-item data-func="declinePerson" data-icon="decline" data-style="decline">
            <p>Decline</p>
        </sidebar-item>
    </sidebar-group>
    <sidebar-break></sidebar-break>
    <sidebar-title>
        <h3>Valid Passports</h3>
    </sidebar-title>
    <sidebar-group id="sidebar-group-passports">
        <?php while($queryData = $validPassports->fetch_assoc()): ?>
            <sidebar-item id="passport-<?= $queryData["RegionCode"] ?>" data-func="viewFlag-<?= $queryData["RegionCode"] ?>" data-icon="flag-<?= $queryData["RegionCode"] ?>">
                <p id="passport-<?= $queryData["RegionCode"] ?>"><?= $queryData["Country"] ?></p>
            </sidebar-item>
        <?php endwhile; ?>
    </sidebar-group>
    <sidebar-title>
        <h3>Valid Tickets</h3>
    </sidebar-title>
    <sidebar-group id="sidebar-group-ticket">
        <?php while($queryData = $validTickets->fetch_assoc()): ?>
            <sidebar-item id="validTicket-<?= $queryData["RegionCode"] ?>" data-func="viewTicket-<?= $queryData["RegionCode"] ?>" data-icon="flag-<?= $queryData["RegionCode"] ?>">
                <p id="validTicket-<?= $queryData['RegionCode'] ?>"><?= $queryData["Name"] ?></p>
            </sidebar-item>
        <?php endwhile; ?>
    </sidebar-group>
</sidebar-inner>
