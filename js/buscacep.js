function teste() {
    var cep = $('#cep').cleanVal();
    $.ajax({
        url: 'php/buscacep.php',
        type: 'POST',
        dataType: 'json',
        data: {logradouro: 'logradouro', bairro: 'bairro', municipio: 'localidade', uf: 'uf', ibge: 'ibge', cep: cep},
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