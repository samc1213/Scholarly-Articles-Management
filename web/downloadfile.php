<?php
require ('/app/vendor/autoload.php');
$s3 = Aws\S3\S3Client::factory();

session_start();

$filename = $_POST['filename'];
$grantname = $_POST['grantname'];
$username = $_SESSION['username'];

$dlstr = $username.'/'.$grantname.'/'.$filename;


$params=array(
    'Bucket' => 'cpgrantsuploads',
    'Key'    => $dlstr,
    'SaveAs' => 'localdoc.docx',
);

$result = $s3->getObject($params);

$file_url = 'localdoc.docx';
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary"); 
header("Content-disposition: attachment; filename=".$filename.".docx"); 
readfile($file_url);