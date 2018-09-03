<?php  
function upControl() {
	require 'connect.php';

	extract($_POST);

	$sql_up = $pdo->prepare("UPDATE bolao251_loan.controle SET valor_ct = , status_ct = WHERE id_ct = ");
	$sql_up->execute(array());	
}

?>