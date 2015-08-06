<?php
	require ('/app/vendor/autoload.php');
	
	session_start();
	
	$uploadOk = 1;
	
    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
    	if ($_FILES["file"]["size"] > 2000000) {
		    echo "Sorry, your file is too large. Limit to 200kb";
		    $uploadOk = 0;
		}
		
		if ($uploadOk == 1) {
	        move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
			echo file_get_contents('uploads/' . $_FILES['file']['name']);
			
			$config = array('key' => getenv('AWS_ACCESS_KEY_ID'), 'secret' => getenv('AWS_SECRET_ACCESS_KEY'));
			$s3 = Aws\S3\S3Client::factory();
			
			$result = $s3->putObject(array(
		    'Bucket'       => 'cpgrantsuploads',
		    'Key'          => $_SESSION['username'].'/'.$_FILES['file']['name'],
		    'SourceFile'   => 'uploads/' . $_FILES['file']['name'],
		    'ContentType'  => 'text/plain',
		    'ACL'          => 'public-read',
		    'StorageClass' => 'REDUCED_REDUNDANCY',
			));			
		}
    }
?>