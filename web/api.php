<?php
	include 'functions.php';

	
	if ($_POST["type"] == "create") {
		$passhash = password_hash($_POST['password'], PASSWORD_DEFAULT);
		try {
			createuser($_POST['username'], $passhash, $_POST['email'], $_POST['firstname'], $_POST['lastname']);
		} catch (Exception $e) {
			echo $e -> getCode();
		}
	}
	
	if ($_POST["type"] == "login") {
		try {
			loginuser($_POST['username'], $_POST['password']);
		} catch (Exception $e) {
			echo $e -> getMessage();
		}
	}
?>