<?php
	include 'functions.php';

	
	if ($_POST["type"] == "create") {
		$passhash = password_hash($_POST['password'], PASSWORD_DEFAULT);
		try {
			createuser($_POST['username'], $passhash, $_POST['email'], $_POST['firstname'], $_POST['lastname'], $_POST['middlename']);
		} catch (Exception $e) {
			echo $e -> getCode();
		}
	}
	
	else if ($_POST["type"] == "login") {
		try {
			$result = loginuser($_POST['username'], $_POST['password']);
			echo $result["message"];
			if ($result["message"]=="SUCCESS") {
				session_start();
				$_SESSION['username'] = $result['username'];
				$_SESSION['firstname'] = $result['firstname'];
				$_SESSION['lastname'] = $result['lastname'];
				$_SESSION['middlename'] = $result['middlename'];
				$_SESSION['email'] = $result['email'];
			}
		} catch (Exception $e) {
			// echo $e -> getMessage();
		}
	}
	
	else if ($_POST["type"] == "logout") {
		logout();
	}
	
	else if ($_POST["type"] == "newgrant") {
		session_start();
		$username = $_SESSION['username'];
		$phpdata = (array)json_decode($_POST['data']);
		echo var_dump($phpdata);
		newgrant($phpdata['name'], $phpdata['awardnumber'], $phpdata['source'], $phpdata['awardperiod1'], $phpdata['awardperiod2'], $phpdata['status'], $phpdata['personmonths'], $phpdata['specify'], $phpdata['amount'], $phpdata['piamount'], $phpdata['description'], $username, $phpdata['location']);
	}
	
	else if ($_POST["type"] == "editgrant") {
		$phpdata = (array)json_decode($_POST['data']);
		echo var_dump($phpdata);
		session_start();
		$ogname = $phpdata['originalname'];
		$user = $_SESSION['username'];
		echo "user: ".$user;
		echo "goname".$ogname;
		echo editgrant($phpdata['originalname'], $phpdata['awardnumber'], $phpdata['originalperiod1'], $phpdata['name'], $phpdata['source'], $phpdata['awardperiod1'], $phpdata['awardperiod2'], $phpdata['status'], $phpdata['personmonths'], $phpdata['specify'], $phpdata['amount'], $phpdata['piamount'], $phpdata['description'], $user, $phpdata['location']);
	}
	
	else if ($_POST['type'] == "download") {
		echo generateDoc($_POST['data'], $_POST['id']);
	}
	
	else if ($_POST['type'] == "deletegrant") {
		session_start();
		echo deleteGrant($_POST['name'], $_SESSION['username']);
	}
?>