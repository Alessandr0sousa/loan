<?php  

extract($_POST);
	
$get_endereco  = file_get_contents('https://viacep.com.br/ws/'.$cep.'/json/');

echo $get_endereco;

?>