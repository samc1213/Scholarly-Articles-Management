<?php
require ('/app/vendor/autoload.php');
$s3 = Aws\S3\S3Client::factory();

$params=array(
    'Bucket' => 'cpgrantsdocs',
    'Key'    => $_POST['id'],
    'SaveAs' => 'localdoc.docx',
);

$result = $s3->getObject($params);

$result = $s3->deleteObject(array(
    'Bucket' => 'cpgrantsdocs',
    'Key'    => $_POST['id']
));

$filename = $_POST['filename'];

$file_url = 'localdoc.docx';
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary"); 
header("Content-disposition: attachment; filename=".$filename.".docx"); 
readfile($file_url);