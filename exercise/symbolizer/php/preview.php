<?php
/*
 * Prijima parametr milstd identifikator znacky a vraci font, barvu a znaky,
 *  ktere se maji vykreslit
 */
$prefix = "/opt/retia";
$sidc = $_GET['sidc'];

$result = array();

exec("$prefix/bin/app6dec $sidc", $result);

exit(json_encode($result));
?>
