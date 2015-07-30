<?php
include 'functions.php';
download();
$filestr = file_get_contents('localfile.docx');
$trim = ltrim($filestr);
$retrim = ltrim($trim);
file_put_contents('localfile.txt', $retrim);
// header("Cache-Control: public");
// header("Content-Description: File Transfer");
header("Content-Disposition: attachment; filename=file.txt");
header("Content-Type: text/plain");
header("Content-Length: " . filesize('localfile.txt'));
// header("Content-Transfer-Encoding: binary");
readfile('localfile.txt');