<?php
	include 'functions.php';
	
	if ($_POST["type"] == "create") {
		echo "hi";
		try {
			createuser($_POST['username'], $_POST['password']);
		} catch (Exception $e) {
			echo $e -> getCode();
		}
	}
?>