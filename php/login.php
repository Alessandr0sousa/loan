<?php

require 'connect.php';

if (!empty($_POST)) {
	extract($_POST);
	// $user = 'alessandro';
	// $senha = 'olafe281';
	$sql_get = $pdo->prepare("SELECT id_log FROM bolao251_loan.login where user_log = :user and senha_log = :senha");
	$sql_get->execute(array('user' => $user, 'senha' => sha1($senha)));

	$res = $sql_get->fetch(PDO::FETCH_ASSOC);
	
	$login = $res['id_log'];

	$res = $sql_get->rowCount();

	// echo $login;
	$retorno = 0;

	while ($retorno == 0) {
		
		if($res > 0) {
			$token = rand();
			// echo $token;
		}

		$buscaId = $pdo->prepare("SELECT id_ses FROM session WHERE id_ses = :id_ses");
		$buscaId->execute(array('id_ses' => $token));

		$retorno = $buscaId->rowCount();

		if ($retorno == 0) {
			$insertId = $pdo->prepare("INSERT INTO session VALUES (:id_ses, :last_activity, :logout_time, :login)");
			$insertId->execute(array(
				'id_ses' => $token,
				'last_activity' => time(),
				'logout_time' => time() + (5 * 60),
				'login' => $login
			));
			
			$retorno++;
			echo json_encode($token);
		}
	}
}

?>