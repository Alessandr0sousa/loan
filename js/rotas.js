$(document).ready(function () {
	
	callPage('pages/cadastros.html');

	$('a').on('click', function(e){  
		e.preventDefault();
		var pageRef = $(this).attr('href');
		if(pageRef !== undefined) {
			callPage(pageRef);
		}
	});
});

function callPage(pageRefInput) {
	$.ajax({
		url: pageRefInput,
		type: "POST",
		dataType: "html",
		success: function(res) {
				// console.log('Pagina Carregada');
				$('#content').html(res);
			},
			error: function(error) {
				// console.log('Pagina não Carregada', error);
			},
		});
}