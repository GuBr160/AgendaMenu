$(document).ready(function() {
    $('.tabs').tabs();
    //SEU CÓDIGO AQUI


    let postId = 1;
    $('#btn-add').click(function() {

        let nome = $('#addNome').val();
        let telefone = $('#addTelefone').val();
        let AdicionarOuNao = checarTelefone(telefone);
        let possuiClasseRed = $('input#addTelefone').hasClass('red');
        var content = `<tr>
     <td>${postId}</td> 
     <td id-nome="${postId}" nome="${nome}">${nome}</td>
     <td id-telefone="${postId}">${telefone}</td>
     <td class="editarId"><a href="#"><i class="material-icons" data-id="${postId}" data-telefone="${telefone}" data-nome="${nome}" >edit</i></a></td>
     <td class="excluirId"><a href="#"><i class="material-icons" >delete_forever</i></a></td>
     </tr>`;



        if (AdicionarOuNao == true) { //Adiciona conteudo se for maior que 9 qntd de caracteres em telefone
            postId++;

            $('#lista').append(content);
            if (possuiClasseRed) {
                $('input#addTelefone').removeClass('red');
            }
        } else { //Nao adiciona conteudo se for menor que 9 qntd de caracteres em telefone
            if (!possuiClasseRed) {
                $('input#addTelefone').addClass('red');
            }

        }
    });

    $('#lista').on('click', '.editarId .material-icons', function() {
        $('.tabs').tabs('select', 'up');
        let Id = $(this).attr('data-id');
        let nome = $(this).attr('data-nome');
        let telef = $(this).attr('data-telefone');

        $('#upId').val(Id);
        $('#upNome').val(nome);
        $('#upTelefone').val(telef);



    });

    $('#btn-up').click(function() {
        let Id = $('#upId').val();
        let nome = $('#upNome').val();
        let telef = $('#upTelefone').val();
        // Não preciso adicionar por on pois o atualizar já existe. Preciso de um modo pra selecionar o id do content.

        $(`td[id-nome="${Id}"]`).text(nome);
        $(`td[id-telefone="${Id}"]`).text(telef);


    });


    $('#lista').on('click', '.excluirId .material-icons', function() {
        $(this).parent().parent().parent().remove();
    });

    
    $('#btn-find').click(function (){
        
        $(`tr`).each(function (postId) {

        let busca = $('#findNome').val();

        let buscaTelefone = $(`td[id-telefone="${postId}"]`).text();

        let nomeContent = $(`td[id-nome="${postId}"]`).text(); // Se o valor do nome digitado for igual ao do Content adiciona na var nomeContent
        

      if (busca === nomeContent){
        $('#lista *').hide()
      
        $('#lista').append(`<tr class="procura">
        <td>${postId}</td> 
        <td id-nome="${postId}" nome="${busca}" >${busca}</td>
        <td id-telefone="${postId}">${buscaTelefone}</td>
        <td class="editarId"><a href="#"><i class="material-icons" data-id="${postId}" data-telefone="${buscaTelefone}" data-nome="${busca}" >edit</i></a></td>
        <td class="excluirId"><a href="#"><i class="material-icons" >delete_forever</i></a></td>
        </tr>`);
   
      }

    
    });


    });


  $('#btn-show-all').click(function () {
    $('.procura').remove();
    $('#findNome').val(' ');
    $('#lista *').show(); // mostro a lista em oposto com o de cima
  });


});