<?php  

function municipios() {

	require 'connect.php';

	extract($_POST);

	$sql_get = $pdo->prepare("SELECT id_mun FROM bolao251_loan.municipios where ibge_mun = '{$ibge}'");
	$sql_get->execute();

	$res = $sql_get->fetch(PDO::FETCH_ASSOC);
	return  $res['id_mun'];
}

function setBanco() {
	
	require 'connect.php';

	if (!empty($_POST)) {
		extract($_POST);	

		$sql_set = $pdo->prepare("INSERT INTO bolao251_loan.banco VALUES(NULL, :agencia_bco, :conta_bco, :tipo_conta, :idbanco, :pessoa)");
		$sql_set->execute(array(
			'agencia_bco' 	=> $agencia_bco,
			'conta_bco' 	=> $conta_bco,
			'tipo_conta' 	=> $tipo_conta,
			'idbanco' 		=> $id_idb,
			'pessoa'		=> $id_pes
		));
		$res = "Registro inserido com sucesso!";
		echo json_encode($res); 
	}else{
		$res = "Registro não inserido!";
		echo json_encode($res);
	}
}	

function login() {

	require 'connect.php';

	extract($_POST);

	$sql_get = $pdo->prepare("SELECT login FROM bolao251_loan.session where id_ses = '{$cookie}'");
	$sql_get->execute();

	$res = $sql_get->fetch(PDO::FETCH_ASSOC);
	return  $res['login'];

}

function setPessoa() {
	require 'connect.php';

	if (!empty($_POST)) {
		extract($_POST);
		
		$municipios = municipios();
		$login =  login();

		$sql_set = $pdo->prepare("INSERT INTO bolao251_loan.pessoa VALUES (NULL, :nome_pes, :fone_pes, :cpf_pes, :logradouro, :numero, :bairro, :cep, :login, :municipios)");
		$sql_set->execute(array(
			'nome_pes' 		=> $nome_pes,
			'fone_pes' 		=> $fone_pes,
			'cpf_pes' 		=> $cpf_pes,  
			'logradouro' 	=> $logradouro,
			'numero' 		=> $numero,
			'bairro' 		=> $bairro,
			'cep' 			=> $cep,
			'login' 		=> $login,
			'municipios' 	=> $municipios
		));

		$res = "Registro inserido com sucesso!";
		echo json_encode($res);
	}
	else{

		$res = "Registro não inserido!";
		echo json_encode($res);
	}
}

function setConcessao() {
	require 'connect.php';
	if (!empty($_POST)) {
		extract($_POST);

		$taxa_conc = $taxa_conc/10000;

		$sql_set = $pdo->prepare("INSERT INTO bolao251_loan.concessao  VALUES (NULL, :valor_conc, :aquisicao_conc, :prazo_conc, :taxa_conc, :juro_total_estimado_conc, :montante_estimado_conc, :vencimento_conc, :pessoa)");
		$sql_set->execute(array(
				'valor_conc'					=> $valor_conc,
			    'aquisicao_conc'				=> $aquisicao_conc,
			    'prazo_conc'					=> $prazo_conc,
			    'taxa_conc'						=> $taxa_conc,
			    'juro_total_estimado_conc'		=> $juro_total_estimado_conc,
			    'montante_estimado_conc'		=> $montante_estimado_conc,
			    'vencimento_conc'				=> $vencimento_conc,
			    'pessoa'						=> $pessoa
		));
		setControle();
		$res = "Registro inserido com sucesso!";
		echo json_encode($res);
	}
	else{

		$res = "Registro não inserido!";
		echo json_encode($res);
	}
}

function setControle(){
	require 'connect.php';
	
	$sql_get = $pdo->prepare("SELECT * FROM bolao251_loan.controle_ins;");
	$sql_get->execute();

	$res = $sql_get->fetch(PDO::FETCH_ASSOC);

		$id 		= $res['id_conc']; 
		$prazo  	= $res['prazo_conc'];
		$parcela  	= $res['parcela'];
		$dia 		= $res['dia'];
		$mes 		= $res['mes'];
		$ano 		= $res['ano'];
		$data 		= $dia.'-'.$mes.'-'.$ano;
		$data       = date('d-m-Y', strtotime($data));
		$x = 1;
	for ($i=0; $i < $prazo; $i++) { 
		$data_ct = date('d/m/Y', strtotime("+".$x." month", strtotime($data)));
		$sql_set = $pdo->prepare("INSERT INTO bolao251_loan.controle (data_ct, valor_ct, concessao) VALUES (:data_ct, :valor_ct, :concessao)");
		$sql_set->execute(array(
				'data_ct'		=> $data_ct,
			    'valor_ct'		=> $parcela,
			    'concessao'		=> $id
		));
		$x++;
	}
}

extract($_POST);

switch ($tipo) {
	case 'setpessoa':
	setPessoa();
	break;
	case 'setbanco':
	setBanco();
	break;
	case 'setconcessao':
	setConcessao();
	break;
}

?>