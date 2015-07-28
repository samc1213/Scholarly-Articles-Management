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
			$result = loginuser($_POST['username'], $_POST['password']);
			if ($result["message"]=="SUCCESS") {
				session_start();
				$_SESSION['username'] = $result['username'];
				$_SESSION['firstname'] = $result['firstname'];
				$_SESSION['lastname'] = $result['lastname'];
				$_SESSION['email'] = $result['email'];
			}
		} catch (Exception $e) {
			echo $e -> getMessage();
		}
	}
?>