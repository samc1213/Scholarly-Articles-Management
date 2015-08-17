<?php
	$data=stripcslashes($_REQUEST['csv_text']);
	file_put_contents('data.csv', $data);
?>