<?php
	header("Content-type: application/octet-stream");
	header("Content-Disposition: attachment; filename=\"my-data.csv\"");
	header('Refresh: 0; url=index.php');
	$data=stripcslashes($_REQUEST['csv_text']);
	echo $data; 
?>