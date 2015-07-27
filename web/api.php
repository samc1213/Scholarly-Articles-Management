<?php
	include 'functions.php';
	
	if ($_POST["type"] == "create") {
		try {
			createuser(username, password);
		} catch (Exception $e) {
			echo $e;
		}
	}
?>