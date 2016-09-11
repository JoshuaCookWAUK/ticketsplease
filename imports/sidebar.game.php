

<?php
    /* connection details */
    include "../php/credentials.php";
    $validPassportCONN = getConnection();
    $validPassportCONN->query("SET @param  = ".(string)rand(1,2));
    $validPassports = $validPassportCONN->query("CALL spValidNatGet(@param)");
	$randomTicketAmount = rand(5,11);
    $validTicketCONN = getConnection();
    $validTicketCONN->query("SET @ticketAmount  = ".(string)$randomTicketAmount);
    $validTickets = $validTicketCONN->query("CALL spValidTicketGet(@ticketAmount)");
?>
<!-- sidebar layout for game -->
<sidebar-header>
    <h3>Tickets Please!</h3>
</sidebar-header>
<sidebar-header-sub>
    <h3>Occam's Razor</h3>
</sidebar-header-sub>
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
        <sidebar-break></sidebar-break>
        <sidebar-item data-func="pause" data-icon="pause" data-style="pause">
            <p>Pause</p>
        </sidebar-item>
    </sidebar-group>
    <sidebar-break></sidebar-break>
    <sidebar-item id="valid-passports" data-id="valid-passports" data-icon="plus" data-expandable>
        <p>Valid Passports</p>
    </sidebar-item>
    <sidebar-sub-group data-expanded="false" data-parent="valid-passports">
        <?php
            /* get valid passports information until its populated. */
            while($queryData = $validPassports->fetch_assoc()):
        ?>
            <sidebar-item id="validPassport-<?= $queryData["RegionCode"] ?>" data-func="viewFlag-<?= $queryData["RegionCode"] ?>" data-icon="flag-<?= $queryData["RegionCode"] ?>">
                <p id="passport-<?= $queryData["RegionCode"] ?>"><?= $queryData["Country"] ?></p>
            </sidebar-item>

        <?php
            endwhile;
        ?>
    </sidebar-sub-group>
    <sidebar-item id="valid-tickets" data-id="valid-tickets" data-icon="plus" data-expandable>
        <p>Valid Tickets</p>
    </sidebar-item>
    <sidebar-sub-group data-expanded="false" data-parent="valid-tickets">
        <?php
            /* get valid tickets information until its populated */
            while($queryData = $validTickets->fetch_assoc()):
        ?>
            <sidebar-item id="validTicket-<?= $queryData["RegionCode"] ?>" data-func="viewTicket-<?= $queryData["RegionCode"] ?>" data-icon="flag-<?= $queryData["RegionCode"] ?>">
                <p id="ticket-<?= $queryData['RegionCode']?>" class="<?= str_replace(' ', '', $queryData['Name'])?>"><?= $queryData["Name"] ?></p>
            </sidebar-item>
        <?php
            endwhile;
        ?>
    </sidebar-sub-group>
</sidebar-inner>
