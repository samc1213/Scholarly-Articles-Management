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
	
	else if ($_POST["type"] == "login") {
		try {
			$result = loginuser($_POST['username'], $_POST['password']);
			echo $result["message"];
			if ($result["message"]=="SUCCESS") {
				session_start();
				$_SESSION['username'] = $result['username'];
				$_SESSION['firstname'] = $result['firstname'];
				$_SESSION['lastname'] = $result['lastname'];
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
		newgrant($phpdata['name'], $phpdata['source'], $phpdata['awardperiod1'], $phpdata['awardperiod2'], $phpdata['status'], $phpdata['personmonths'], $phpdata['specify'], $phpdata['amount'], $phpdata['piamount'], $phpdata['description'], $username);
	}
	
	else if ($_POST["type"] == "editgrant") {
		$phpdata = (array)json_decode($_POST['data']);
		echo var_dump($phpdata);
		session_start();
		$ogname = $phpdata['originalname'];
		$user = $_SESSION['username'];
		echo "user: ".$user;
		echo "goname".$ogname;
		echo editgrant($phpdata['originalname'], $phpdata['originalperiod1'], $phpdata['name'], $phpdata['source'], $phpdata['awardperiod1'], $phpdata['awardperiod2'], $phpdata['status'], $phpdata['personmonths'], $phpdata['specify'], $phpdata['amount'], $phpdata['piamount'], $phpdata['description'], $user);
	}
	
	else if ($_POST['type'] == "download") {
		$id = '2342342341';
		// download($_POST['data'], $id);
		require ('/app/vendor/autoload.php');
		$s3 = Aws\S3\S3Client::factory();
		
		$params=array(
		    'Bucket' => 'cpgrantsdocs',
		    'Key'    => $id,
		    'SaveAs' => 'localdoc.docx',
		);
		
		$result = $s3->getObject($params);
		
		$file_url = 'localdoc.docx';
		header('Content-Type: application/octet-stream');
		header("Content-Transfer-Encoding: Binary"); 
		header("Content-disposition: attachment; filename=downloadedfile.docx"); 
		readfile($file_url);	
	}
?>