<?php 

require 'connect.php';	

date_default_timezone_set('America/Belem');

extract($_POST);

$retorno = array();

$sql_get = $pdo->prepare("SELECT * from login l join session s on s.login = l.id_log join pessoa p on  p.id_pes = l.pessoa join user_image ui on ui.login = l.id_log where s.id_ses = :id_ses");
$sql_get->execute(array('id_ses' => $cookie));

$res = $sql_get->fetch(PDO::FETCH_ASSOC);

$now = $res['last_activity'];
// echo $now.'<br/>';
$d_sem = array('Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado');

$mes = array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');

$ds = $d_sem[date('w', $now)];

$mm = $mes[date('n', $now)-1];

$hms = date('H:i:s', $now);

$data = $ds.date(', d', $now).' de '.$mm.' de '.date('Y', $now).' '.$hms;

$retorno = ['res' => $res, 'data' => $data];

echo json_encode($retorno);

?>