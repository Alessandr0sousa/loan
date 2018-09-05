$(document).ready(function() {
	logout();
});

var services = 'php/services.php';
var insert = 'php/insert.php';

function barbottom(){
	$('#cliente').click(function() {
		$(this).css('border-bottom', '5px solid #c30b0b');
		$('#bancario').css('border-bottom', '5px solid #ccc');
		$('#concessao').css('border-bottom', '5px solid #ccc');
		$('#banc').css('display', 'none');
		$('#conc').css('display', 'none'); 
		$('#cli').fadeIn();
		// $('#cli').css('display', 'block');
	}); 

	$('#bancario').click(function() {
		$(this).css('border-bottom', '5px solid #c30b0b');
		$('#cliente').css('border-bottom', '5px solid #ccc');
		$('#concessao').css('border-bottom', '5px solid #ccc');
		$('#cli').css('display', 'none');
		$('#conc').css('display', 'none');
		$('#banc').fadeIn();
		// $('#proj').css('display', 'block');
	});

	$('#concessao').click(function() {
		$(this).css('border-bottom', '5px solid #c30b0b');
		$('#cliente').css('border-bottom', '5px solid #ccc');
		$('#bancario').css('border-bottom', '5px solid #ccc');
		$('#cli').css('display', 'none');
		$('#banc').css('display', 'none');
		$('#conc').fadeIn();
		// $('#proj').css('display', 'block');
	});

}

function dataAtualFormatada(){
	var data = new Date();
	var dia = data.getDate();
	if (dia.toString().length == 1)
		dia = "0"+dia;
	var mes = data.getMonth()+1;
	if (mes.toString().length == 1)
		mes = "0"+mes;
	var ano = data.getFullYear();  
	return dia+""+mes+""+ano;
}


function listaBancos() {

	$.ajax({
		url: services,
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'listabancos'},
	})
	.done(function(res) {
		var retorno = "";
		for (var i = 0; i < res.length; i++) {
			var banco = res[i].nome_idb;
			var id = res[i].id_idb;
			retorno += '<option value="'+id+'">';
			retorno += banco;
			retorno += '</option>';
		}
		$('#id_idb').append(retorno);
	})
	.fail(function(res) {
		console.log("error");
	})
}

function tipoConta() {

	$.ajax({
		url: services,
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'tipoconta'},
	})
	.done(function(res) {
		var retorno = "";
		for (var i = 0; i < res.length; i++) {
			var tipo = res[i].desc_tc;
			var id = res[i].id_tc;
			retorno += '<option value="'+id+'">';
			retorno += tipo;
			retorno += '</option>';
		}
		$('#tipo_conta').append(retorno);
	})
	.fail(function(res) {
		console.log("error");
	});
}

function setPessoa() {
	var nome_pes 		= $('#nome_pes').val();
	var fone_pes 		= $('#fone_pes').cleanVal();
	var cpf_pes 		= $('#cpf_pes').cleanVal();
	var cep 			= $('#cep').cleanVal();
	var logradouro 		= $('#logradouro').val();
	var bairro 			= $('#bairro').val();
	var numero 			= $('#numero').val();
	var municipio 		= $('#municipio').val();
	var uf 				= $('#uf').val();
	var ibge 			= $('#ibge').val();
	var cookie 			= $.cookie('token');

	$.ajax({
		url: insert,
		type: 'POST',
		dataType: 'json',
		data: {	
			tipo: 			'setpessoa',
			nome_pes: 		nome_pes,
			fone_pes: 		fone_pes,
			cpf_pes: 		cpf_pes,
			cep: 			cep,
			logradouro: 	logradouro,
			bairro: 		bairro,
			numero: 		numero,
			municipio: 		municipio,
			uf: 			uf,
			ibge: 			ibge,
			cookie: 		cookie
		},
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
			title: 'Registro inserido com sucesso!!'
		});
	})
	.fail(function(res) {
		const toast = swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		});
		toast({
			type: 'error',
			title: 'Falha ao inserir o registro!!'
		});
	})
}

function setBanco() {
	var id_pes	 		= $('#id_pes option:selected').val();	
	var id_idb	 		= $('#id_idb option:selected').val();	
	var agencia_bco 	= $('#agencia_bco').val();
	var conta_bco 		= $('#conta_bco').cleanVal();
	var tipo_conta 		= $('#tipo_conta option:selected').val();
	$.ajax({
		url: insert,
		type: 'POST',
		dataType: 'json',
		data: {
			tipo: 			'setbanco',
			id_pes: 		id_pes,
			id_idb: 		id_idb,
			agencia_bco: 	agencia_bco,
			conta_bco: 		conta_bco,
			tipo_conta:		tipo_conta
		},
	})
	.done(function(res) {
		alert(res);
	})
	.fail(function(res) {
		alert(res);
	})
}

function getPessoa() {
	$.ajax({
		url: services,
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'getpessoa'},
	})
	.done(function(res) {
		var retorno = "";
		for (var i = 0; i < res.length; i++) {
			var id = res[i].id_pes;
			var nome = res[i].nome_pes;
			retorno += '<option value="'+id+'">';
			retorno += nome;
			retorno += '</option>';
		}
		$('#id_pes').append(retorno);
		$('#id_pes2').append(retorno);
	})
	.fail(function(res) {
		console.log("error");
	})
}

function juroMontante() {
	var valor = $('#valor_conc').cleanVal();
	var prazo = $('#prazo_conc').val();
	var taxa = $('#taxa_conc').cleanVal();
	
	$.each($('#prazo_conc'), function(index, val) {
		if (typeof(prazo) == 'undefined' ||  prazo =='') {
			prazo  = 0;
		}
	});

	var juro = parseFloat(valor/100)*parseInt(prazo)*parseFloat(taxa/10000);
	var montante = parseFloat(juro) + parseFloat(valor/100);
	
	$('#juro_total_conc').val(juro);
	$('#montante_estimado_conc').val(montante);

}

function setConcessao() {

	var valor_conc 					= parseFloat($('#valor_conc').cleanVal()/100);
	var aquisicao_conc 				= $('#aquisicao_conc').val();
	var prazo_conc 					= $('#prazo_conc').val();
	var taxa_conc 					= parseFloat($('#taxa_conc').cleanVal());
	var juro_total_estimado_conc 	= parseFloat($('#juro_total_conc').cleanVal());
	var montante_estimado_conc 		= parseFloat($('#montante_estimado_conc').cleanVal());
	var vencimento_conc 			= $('#vencimento_conc').val();
	var pessoa 						= $('#id_pes2').val();

	$.ajax({
		url: insert,
		type: 'POST',
		dataType: 'json',
		data: {
			tipo: 						'setconcessao',
			valor_conc: 				valor_conc,
			aquisicao_conc: 			aquisicao_conc,
			prazo_conc:					prazo_conc,
			taxa_conc:					taxa_conc,
			juro_total_estimado_conc:	juro_total_estimado_conc,
			montante_estimado_conc:		montante_estimado_conc,
			vencimento_conc:			vencimento_conc,
			pessoa:						pessoa

		},
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
			title: 'Registro inserido com sucesso!!'
		})
	})
	.fail(function(res) {
		const toast = swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		});
		toast({
			type: 'error',
			title: 'Registro não inserido!!'
		})
	});
	
}

function listCli() {
	$.ajax({
		url: services,
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'getpessoa'},
	})
	.done(function(res) {
		var retorno = "";
		for (var i = 0; i < res.length; i++) {
			var id = res[i].id_pes;
			var nome = res[i].nome_pes;
			var cpf = res[i].cpf_pes;
			var fone = res[i].fone_pes;
			var bairro = res[i].bairro;

			retorno += '<tr id="'+id+'">';
			retorno += '<td>'+nome+'</td>';
			retorno += '<td>'+cpf+'</td>';
			retorno += '<td>'+fone+'</td>';
			retorno += '<td>'+bairro+'</td>';
			retorno += '</tr>';
		}
		$('#listcli').append(retorno);
	})
	.fail(function(res) {
		console.log("error");
	})				
}

function getCocn() {
	$.ajax({
		url: services,
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'getconc'},
	})
	.done(function(res) {
		var retorno = "";
		for (var i = 0; i < res.length; i++) {
			var id = res[i].id_pes;
			var nome = res[i].nome_pes;
			var valor = res[i].valor_conc;
			var vencimento = res[i].vencimento_conc;
			var prazo = res[i].prazo_conc;
			var montante = res[i].montante_estimado_conc;

			retorno += '<tr id="'+id+'">';
			retorno += '<td>'+nome+'</td>';
			retorno += '<td>'+valor+'</td>';
			retorno += '<td>'+vencimento+'</td>';
			retorno += '<td>'+prazo+'</td>';
			retorno += '<td>'+montante+'</td>';
			retorno += '</tr>';
		}
		$('#listconc').append(retorno);
	})
	.fail(function(res) {
		console.log("error");
	})				
}

function getControle() {
	$.ajax({
		url: services,
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'getcontrole'},
	})
	.done(function(res) {
		$('#getcontrol').append(res);
	})
	.fail(function(res) {
		console.log("error");
	})
}

function validaCookie(){
	var cookie = $.cookie('token');

	if(typeof(cookie) != undefined && cookie > ''){
		$.ajax({
			url: services,
			type: 'POST',
			dataType: 'json',
			data: {tipo: 'validacookie', cookie: cookie},
		})
		.done(function(res) {
			logout = res['logout_time'];
			$('#pessoa').text(res['nome_usuario']);
			setInterval(function(){
				swal('Sua sessão foi encerrada', 'Faça login novamanete!', 'info');
				$.removeCookie("token"); 
				var index = "";
				window.location.href = index;
			},60*60*1000);
		})
		.fail(function(res) {
			// alert('Efetue login!');
			$.removeCookie("token");
			var index = "index.html"; 
			window.location.href = index;
		});
	}
	else{
		// alert('Efetue login com uma conta válida!');
		$.removeCookie("token");
		var index = "index.html";
		window.location.href = index;
	}
}

function ecerraSessao(argument) {
	var horaatual = $.now();
}

function collapse(){
	$(".collapse.in").each(function(){
		$(this).siblings(".panel-heading").find(".fa").addClass("fa fa-minus").removeClass("fa fa-plus");
	});

	$(".collapse").on('show.bs.collapse', function(){
		$(this).parent().find(".fa").removeClass("fa fa-plus").addClass("fa fa-minus");
	}).on('hide.bs.collapse', function(){
		$(this).parent().find(".fa").removeClass("fa fa-minus").addClass("fa fa-plus");
	});
}

function upControl() {
	$('#upcontrol').on('show.bs.modal', function (event) {
		var button 		= $(event.relatedTarget) 
		var id 			= button.data('id') 
		var valor 		= button.data('valor') 
		var vencimento	= button.data('vencimento') 
		var datapag		= button.data('datapag') 
		var modal 		= $(this)
		modal.find('#id').val(id)
		modal.find('#valor').val(valor)
		modal.find('#vencimento').text(vencimento)
		modal.find('#datapag').text(datapag)
	})
}

function upControl_() {
	var id = $('#id').val();
	var sts = $('#sts').val();
	var valor = $('#valor').val();
	var datapag = $('#datapag').text();

	$.ajax({
		url: 'php/up.php',
		type: 'POST',
		dataType: 'json',
		data: {
			tipo: 'upcontrol_',
			id: id,
			valor: valor,
			sts: sts,
			datapag: datapag
		},
	})
	.done(function(res) {
		alert(res);
		// const toast = swal.mixin({
		// 	toast: true,
		// 	position: 'top-end',
		// 	showConfirmButton: false,
		// 	timer: 3000
		// });

		// toast({
		// 	type: 'success',
		// 	title: res
		// })
	})
	.fail(function(res) {
		alert(res);
	// 	const toast = swal.mixin({
	// 		toast: true,
	// 		position: 'top-end',
	// 		showConfirmButton: false,
	// 		timer: 3000
	// 	});

	// 	toast({
	// 		type: 'danger',
	// 		title: res
	// 	})	
	 })
}

function checked() {
	$('#Y').click(function() {
		$('#sts').val('Y')
		$(this).children().addClass('text-success');
		$('#N').children().removeClass('text-danger');
	});
	$('#N').click(function() {
		$('#sts').val('N')
		$(this).children().addClass('text-danger');
		$('#Y').children().removeClass('text-success');
	});
}

function logout(){

	$('#logout').click(function() {
		swal({
			title: 'Voce deseja realmente sair?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ok!',
			cancelButtonText: 'Não',
		}).then((result) => {
			if (result.value) {
				$.removeCookie("token");
				var index = "index.html";
				window.location.href = index;
			}
		})
	});
}

Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this, 
	negative = number < 0 ? "-" : "",
	i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};