<?php
	include "../php/credentials.php";
    $validTickets = getConnection()->query("CALL spReqGet()");
	$Results = $validTickets->fetch_assoc();
	printf($Results['SupplierName']);
	printf(";");
	printf($Results['RegionCode']);
	printf(";");
	printf($Results['PersonName']);
?>
