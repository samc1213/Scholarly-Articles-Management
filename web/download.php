<?php
require ('/app/vendor/autoload.php');
$s3 = Aws\S3\S3Client::factory();

$params=array(
    'Bucket' => 'cpgrantsdocs',
    'Key'    => $_POST['id'],
    'SaveAs' => 'localdoc.docx',
);

$result = $s3->getObject($params);

$file_url = 'localdoc.docx';
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary"); 
header("Content-disposition: attachment; filename=downloadedfile.docx"); 
readfile($file_url);