<?php
    include "../php/credentials.php";
    $validTickets = getConnection()->query("CALL spPersonGet()");
	$Results = $validTickets->fetch_assoc();
	printf($Results['Name']);
	printf(";");
	printf($Results['Gender']);
	printf(";");
	printf($Results['Country']);
	printf(";");
	printf($Results['SkinTone']);
	printf(";");
	printf($Results['Notes']);
	printf(";");
	printf($Results['issueDate']);
	printf(";");
	printf($Results['expiryDate']);
	printf(";");
	printf($Results['Supplier']);
	printf(";");
	printf($Results['RegionCode']);
?>
