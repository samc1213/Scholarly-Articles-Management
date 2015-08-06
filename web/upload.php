<?php
	echo var_dump($_FILES);
	require ('/app/vendor/autoload.php');
	
	session_start();
	
	$uploadOk = 1;
	$message = '';
	
	for ($i=0; $i<count($_FILES['fileinput']['name']); $i++)
	{
		if (0 < $_FILES['fileinput']['error'][$i]) {
        	$uploadOk = 0;
			$message = 'Error: '.$_FILES['fileinput']['error'][$i];
		}
		
		if ($_FILES["fileinput"]["size"][$i] > 2000000) {
			$uploadOk = 0;
			$message = 'Error: '.$_FILES["fileinput"]["name"][$i].'is too big. Max file size is 2000kb';
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
				
				$objects = $s3->getIterator('ListObjects', array('Bucket' => 'cpgrantsuploads', 'Prefix' => $_SESSION['username'].'/'));
				foreach ($objects as $object) {
					$message += $object['Key'];
				}
				
				
				// $result = $s3->putObject(array(
			    // 'Bucket'       => 'cpgrantsuploads',
			    // 'Key'          => $_SESSION['username'].'/'.$_FILES['fileinput']['name'][$i],
			    // 'SourceFile'   => 'uploads/' . $_FILES['fileinput']['name'][$i],
			    // 'ContentType'  => $_FILES['fileinput']['type'][$i],
			    // 'ACL'          => 'public-read',
			    // 'StorageClass' => 'REDUCED_REDUNDANCY',
				// ));
				// $message = var_dump($result);
			}
				
			else {
				$message = 'Server Error. Try again later';
			}
		}
	}
	echo $message;
?>