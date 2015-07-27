<?php
	include 'functions.php';
	
	if ($_POST["type"] == "create") {
		$passhash = password_hash($_POST['password']);
		try {
			createuser($_POST['username'], $passhash, $_POST['email'], $_POST['firstname'], $_POST['lastname']);
		} catch (Exception $e) {
			echo $e -> getCode();
		}
	}
?>