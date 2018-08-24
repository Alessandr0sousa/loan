<?php

function listaBancos() {

	require 'connect.php';

	$sql_get = $pdo->prepare("SELECT * FROM bolao251_loan.idbanco order by nome_idb asc");
	$sql_get->execute();

	$res = $sql_get->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($res);

}

function tipoConta() {

	require 'connect.php';

	$sql_get = $pdo->prepare("SELECT * FROM bolao251_loan.tipo_conta order by desc_tc asc");
	$sql_get->execute();

	$res = $sql_get->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($res);
}

function getPessoa() {

	require 'connect.php';

	$sql_get = $pdo->prepare("SELECT * FROM bolao251_loan.pessoa order by nome_pes");
	$sql_get->execute();

	$res = $sql_get->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($res);	
}

function getConc() {

	require 'connect.php';

	$sql_get = $pdo->prepare("SELECT c.id_conc, c.valor_conc, c.montante_estimado_conc, c.prazo_conc, c.vencimento_conc, p.nome_pes FROM bolao251_loan.concessao c, bolao251_loan.pessoa p where c.pessoa = p.id_pes");
	$sql_get->execute();

	$res = $sql_get->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($res);	
}

function validaCookie(){

	require 'connect.php';	

	extract($_POST);

	$sql_get = $pdo->prepare("SELECT id_ses FROM bolao251_loan.session where id_ses = :id_ses");
	$sql_get->execute(array('id_ses' => $cookie));

	$res = $sql_get->rowCount();

	if ($res > 0) {
		$buscausu = $pdo->prepare("SELECT pes.nome_pes as nome_usuario FROM session ses, pessoa pes where pes.id_pes = ses.login and ses.id_ses = :id_ses");
		$buscausu->execute(array('id_ses' => $cookie));

		$retorno = $buscausu->fetch(PDO::FETCH_ASSOC);

		echo json_encode($retorno);
	}

}

function getControle() {
	require 'connect.php';	

	$datapagamento = date('d-m-Y');

	$sql_get2 = $pdo->prepare("SELECT id_conc, nome_pes FROM bolao251_loan.concessao, bolao251_loan.pessoa where pessoa = id_pes");
	$sql_get2->execute();

	$res2 = $sql_get2->fetchAll(PDO::FETCH_ASSOC);

	$op = '';
	for ($i=0; $i < sizeof($res2); $i++) { 
		$op .='
		
		<div class="accordion accordion-sm" id="accordionExample">
		<div class="card">
		<div class="card-header py-1" id="headingOne">
		<h5 class="mb-0">
		<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse'.$res2[$i]['id_conc'].'" aria-expanded="true" aria-controls="collapseOne">
		<i class="fa fa-plus"></i>&nbsp;'.$res2[$i]['nome_pes'].'
		</button>
		</h5>
		</div>
		<div id="collapse'.$res2[$i]['id_conc'].'" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
		<div class="card-body">
		<div class="row">';

		$op.='
		<div class="col-sm-6">
		<table class="table table-hover table-sm">
		<thead class="thead-light">
		<th scope="col">Valor</th>
		<th scope="col">Prev_pag</th>
		<th scope="col">Pag_efet</th>
		<th scope="col">Status</th>
		</thead>
		<tbody>	
		';

		$idconc = $res2[$i]['id_conc'];

		$sql_get = $pdo->prepare("SELECT * FROM bolao251_loan.controle where concessao = :idconc and status_ct = 'N'");
		$sql_get->execute( array('idconc' => $idconc));

		$res = $sql_get->fetchAll(PDO::FETCH_ASSOC);

		for($j = 0;$j < sizeof($res);$j++) {
			$data_prev = $res[$j]['data_prev_ct'];

			$op .= '<tr><td>'.$res[$j]['valor_ct'].'</td>';	
			$op .= '<td>'.$data_prev.'</td>';
			$op .= '<td></td>';
			$op .= '<td class="custom-control custom-checkbox">
			<input type="checkbox" class="custom-control-input" id="customCheck1">
			<label class="custom-control-label" for="customCheck1"></label>
			</td></tr>';

		}
		$op .='
		</tbody>
		</table>
		</div>
		<div class="col-sm-6 row align-items-center my-auto">
		<div class="col-6 form-group">
		<label for="">Data Pagamento</label>
		<input type="text" class="form-control date" id="datapagamento" value="'.$datapagamento.'">
		</div>
		<div class="col-sm-6 form-group">
		<button type="button" id="updata" class="btn btn-success">Salvar</button>
		</div>

		</div>
		</div>
		</div>
		</div>';
	}
	// echo $op;
	echo json_encode($op);
}

extract($_POST);

switch ($tipo) {
	case 'listabancos':
	listaBancos();
	break;
	case 'tipoconta':
	tipoConta();
	break;
	case 'getpessoa':
	getPessoa();
	break;
	case 'validacookie':
	validaCookie();
	break;
	case 'getconc':
	getConc();
	break;
	case 'getcontrole':
	getControle();
	break;
}

?>
