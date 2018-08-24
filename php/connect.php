<?php

$host = '192.185.176.15';
$usr = 'bolao251_user';
$pass = 'olafe281';
$bd = 'bolao251_loan';

try {
	$pdo = new PDO('mysql:host='.$host.';dbname='.$bd.';charset=utf8', $usr, $pass);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
	echo 'ERROR: ' . $e->getMessage();
}

?>