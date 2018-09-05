function cards() {

	var cookie = $.cookie('token');
	var last = 'php/last_activit.php';

	$.ajax({
		url: last,
		type: 'POST',
		dataType: 'json',
		data: {type: 'cards', cookie: cookie},
	})
	.done(function(res) {
		var last = res['data'];
		var capaUser = res['res']['img_ui'];
		var nome = res['res']['nome_pes'];
		var desc = res['res']['desc_log'];
		$('#last').text('Ultimo acesso: '+last);
		$('#capaUser').attr('src', capaUser);
		$('#nome').text(nome);
		$('#desc').text(desc);

	})
	.fail(function(res) {
		console.log("error");
	})
}