function teste() {
    var cep = $('#cep').val();
    $.ajax({
        url: 'https://viacep.com.br/ws/'+cep+'/json/',
        type: 'POST',
        dataType: 'json',
        data: {logradouro: 'logradouro', bairro: 'bairro', municipio: 'localidade', uf: 'uf', ibge: 'ibge'},
    })
    .done(function(res) {
        $('#logradouro').val(res.logradouro);
        $('#bairro').val(res.bairro);
        $('#municipio').val(res.localidade);
        $('#uf').val(res.uf);
        $('#ibge').val(res.ibge);
        
    })
    .fail(function(res) {
        console.log("error");
    })

}