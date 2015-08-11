<?php
	echo ini_get("upload_max_filesize");

	echo var_dump($_FILES);
	require ('/app/vendor/autoload.php');
	
	session_start();
	
	$uploadOk = 1;
	$message = var_dump($_FILES['templatefileinput']['name']);
	
	// if (0 < $_FILES['templatefileinput']['error'][0]) {
    	// $uploadOk = 0;
		// $message = 'Error: '.$_FILES['templatefileinput']['error'][0];
		// echo "error";
	// }
// 	
	// if ($uploadOk == 1) {
		// $tmpFilePath = $_FILES['templatefileinput']['tmp_name'][0];
		// $newFilePath = 'uploads/'.$_FILES['templatefileinput']['name'][0];
// 		
		// if(move_uploaded_file($tmpFilePath, $newFilePath)) {
			// $s3 = Aws\S3\S3Client::factory();
// 			
			// $prefixstr = $_SESSION['username'].'/';
			// echo $prefixstr;
// 			
			// $result = $s3->putObject(array(
		    // 'Bucket'       => 'cpgrantstemplates',
		    // 'Key'          => $prefixstr.$_FILES['templatefileinput']['name'][0],
		    // 'SourceFile'   => 'uploads/' . $_FILES['templatefileinput']['name'][0],
		    // 'ContentType'  => $_FILES['templatefileinput']['type'][0],
		    // 'ACL'          => 'public-read',
		    // 'StorageClass' => 'REDUCED_REDUNDANCY',
			// ));
			// $message = var_dump($result);
		// }
// 			
		// else {
			// $message = 'Server Error. Try again later';
		// }
	// }
	echo $message;
?>