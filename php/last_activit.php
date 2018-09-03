<?php 

require 'connect.php';	

extract($_POST);

$sql_get = $pdo->prepare("select * from login l join session s on s.login = l.id_log join pessoa p on  p.id_pes = l.pessoa where s.id_ses = :id_ses");
$sql_get->execute(array('id_ses' => $cookie));




$now = 1535815736;
echo $now.'<br/>';

$d_sem = array('Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado');

$mes = array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');

$ds = $d_sem[date('w', $now)];

$mm = $mes[date('n', $now)-1];

$data = $ds.date(', d', $now).' de '.$mm.' de '.date('Y', $now);


?>