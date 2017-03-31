<?php
//$host = "127.0.0.1";
//$host = "192.168.0.96";
//$dbname = "raccos_mbv";
$user = "app_topo";
//$port = 49153;

$host = "192.168.9.100";
$dbname = "raccos_box_ng";
$port = 5432;

$conn_string = "host=".$host." port=$port dbname=".$dbname." user=".$user."";
$connection = pg_connect($conn_string);
$map_path="../maps/";
?>