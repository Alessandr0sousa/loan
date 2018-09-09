<?php  
function upControl_() {
	require 'connect.php';

	if (!empty($_POST)) {

		extract($_POST);

		$find = array(','); 
		$rep = array('.'); 
		$valor = str_replace($find,  $rep, $valor);


		$sql_up = $pdo->prepare("UPDATE bolao251_loan.controle SET valor_ct = :valor_ct, data_efet_ct = :data_efet_ct, status_ct = :status_ct WHERE id_ct = :id_ct ");
		$sql_up->execute(array(
			'valor_ct'		=> $valor,
			'data_efet_ct' 	=> $datapag,
			'status_ct'		=> $sts,
			'id_ct'			=> $id
		));	

		echo json_encode("Registrado com sucesso!");
	}else{
		echo json_encode("Erro ao registrar!");
	}
}

extract($_POST);

switch ($tipo) {
	case 'upcontrol_':
	upControl_();
	break;
}

?>