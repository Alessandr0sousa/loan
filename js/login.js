$(document).ready(function() {
	$.removeCookie('token')
	$('#login').click(function() {
		setCookie();
	});
});
function setCookie() {
	var user = $('#user').val();
	var senha = $('#senha').val();

	if (user == "" || senha =="") {
		alert('Preencha todos os campos!');
		return false;
	}
	var form = new FormData();
	form.append('user', user);
	form.append('senha', senha);

	$.ajax({
		url: 'php/login.php',
		type: 'POST',
		contentType: false,
		processData: false,
		dataType: 'json',
		data: form,
	})
	.done(function(res) {
		const toast = swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		});
		toast({
			type: 'success',
			title: 'Login efetuado com sucesso!!'
		})
		// alert('Login efetuado com sucesso!!');
		$.cookie('token', res);
		var home = "home.html";
		window.location.href = home;
	})
	.fail(function(res) {
		swal('Ocorreu algum erro, tente novamente!');
	});

}