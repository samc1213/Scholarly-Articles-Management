<?php
	echo ini_get("upload_max_filesize");

	echo var_dump($_FILES);
	require ('/app/vendor/autoload.php');
	
	session_start();
	
	
	$uploadOk = 1;
	$message = var_dump($_FILES['fileinput']['name']);
	
	for ($i=0; $i<count($_FILES['fileinput']['name']); $i++)
	{
		if (0 < $_FILES['fileinput']['error'][$i]) {
        	$uploadOk = 0;
			$message = 'Error: '.$_FILES['fileinput']['error'][$i];
			echo "error";
		}
	}
	
	
	if ($uploadOk == 1) {
		for ($i=0; $i<count($_FILES['fileinput']['name']); $i++)
		{	
			$tmpFilePath = $_FILES['fileinput']['tmp_name'][$i];
			$newFilePath = 'uploads/'.$_FILES['fileinput']['name'][$i];
			
			if(move_uploaded_file($tmpFilePath, $newFilePath)) {
				$config = array('key' => getenv('AWS_ACCESS_KEY_ID'), 'secret' => getenv('AWS_SECRET_ACCESS_KEY'));
				$s3 = Aws\S3\S3Client::factory();
				
				$prefixstr = $_SESSION['username'].'/'.$_POST['grantname'].'/';
				echo $prefixstr;
				
				$result = $s3->putObject(array(
			    'Bucket'       => 'cpgrantsuploads',
			    'Key'          => $prefixstr.$_FILES['fileinput']['name'][$i],
			    'SourceFile'   => 'uploads/' . $_FILES['fileinput']['name'][$i],
			    'ContentType'  => $_FILES['fileinput']['type'][$i],
			    'ACL'          => 'public-read',
			    'StorageClass' => 'REDUCED_REDUNDANCY',
				));
				$message = var_dump($result);
			}
				
			else {
				$message = 'Server Error. Try again later';
			}
		}
	}
	echo $message;
?>