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
			echo $result['message'];
			// if ($result =="SUCCESS") {
				// session_start();
				// $_SESSION['user'] = $_POST['username'];
				// $_SESSION['firstname'] = $phpresult['firstname'];
				// $_SESSION['lastname'] = $phpresult['lastname'];
				// $_SESSION['email'] = $phpresult['email'];
			// }
		} catch (Exception $e) {
			echo $e -> getMessage();
		}
	}
?>