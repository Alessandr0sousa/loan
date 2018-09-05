function upControl() {
	var id = $('#id').val();
	var valor = $('#valor').cleanVal();
	var status = $('.ok checked').val();

	$.ajax({
		url: 'php/up.php',
		type: 'POST',
		dataType: 'json',
		data: {
			upcontrol: 'upcontrol',
			id: id,
			valor: valor,
			status: status
		},
	})
	.done(function(res) {

		var msg = res;

		const toast = swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		});

		toast({
			type: 'success',
			title: msg
		})
	})
	.fail(function(res) {
		
	})
	.always(function() {
		console.log("complete");
	});	

}