$(document).ready(function () {
 

    const URL_GET_BOLOS = "https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/get-produtos.php?idCategoria=1";

    const URL_GET_CAFES = "https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/get-produtos.php?idCategoria=2";

    const URL_ADD_PRODUTO ="https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/add-produto.php?";
    
    const URL_DEL_PRODUTO = "https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/del-produto.php";
    
    AdicionarModalBolos();
    AdicionarModalCafes();
    realizarPedido();
    listarProdutosBolos();
    listarProdutosCafes();
    
    


 // Mexendo na Pagina Admin
        //Adicionar Modal Bolos
        function AdicionarModalBolos(){
            $('#btn-adicionar-bolos').click(function () {
                    // $('#resumo-pedido').html('');
                    $('#resumo-pedido').empty();
                    let totalPedido = 0;
                    let content = '';
                    $('.ui.modal').modal('show');
                    $('.quantidade').each(function () {
                        let quantidadeProduto = $(this).text();
                        if (quantidadeProduto > 0) {
                            let objProduto = {};
                            let nomeProduto = $(this).attr('data-product-name');
                            let valorProduto = $(this).attr('data-price');
                            let totalProduto = Number(valorProduto * quantidadeProduto);
                            totalPedido = totalPedido + totalProduto;
                            // objProduto.nome = nomeProduto;
                            objProduto["nome"] = nomeProduto;
                            objProduto["quantidade"] = quantidadeProduto;
                            arrayProdutosPedidos.push(objProduto);
        
                            content += `<tr>
                                        <td class="collapsing">${nomeProduto}</td>
                                        <td class="collapsing ui center aligned">${quantidadeProduto}</td>
                                        <td class="collapsing right">${dolarParaReal(totalProduto)}</td>
                                    </tr>
                                    `;
                        }
                    });
                    $('#resumo-pedido').append(content);
                    $('#valor-total').text(dolarParaReal(totalPedido));
                });
        }
    
        
    
    
        //Adicionar Modal Cafes
        function AdicionarModalCafes(){
            $('#btn-adicionar-cafes').click(function () {
                    // $('#resumo-pedido').html('');
                    $('#resumo-pedido').empty();
                    let totalPedido = 0;
                    let content = '';
                    $('.ui.modal').modal('show');
                    $('.quantidade').each(function () {
                        let quantidadeProduto = $(this).text();
                        if (quantidadeProduto > 0) {
                            let objProduto = {};
                            let nomeProduto = $(this).attr('data-product-name');
                            let valorProduto = $(this).attr('data-price');
                            let totalProduto = Number(valorProduto * quantidadeProduto);
                            totalPedido = totalPedido + totalProduto;
                            // objProduto.nome = nomeProduto;
                            objProduto["nome"] = nomeProduto;
                            objProduto["quantidade"] = quantidadeProduto;
                            arrayProdutosPedidos.push(objProduto);
        
                            content += `<tr>
                                        <td class="collapsing">${nomeProduto}</td>
                                        <td class="collapsing ui center aligned">${quantidadeProduto}</td>
                                        <td class="collapsing right">${dolarParaReal(totalProduto)}</td>
                                    </tr>
                                    `;
                        }
                    });
                    $('#resumo-pedido').append(content);
                    $('#valor-total').text(dolarParaReal(totalPedido));
                });
        }
    
        
    
    
    
        //RealizarPedido
        function realizarPedido() {
            $('#btn-realizar-pedido').click(function () {
               
                $.ajax({
                    url: URL_ADD_PRODUTO,
                    data: {
                        nome: $('#nome').val(),
                        preco: $('#preco').val(),
                        descricao: $('#descricao').val(),
                        foto: $('#foto').val(),
                    idCategoria:$('#idCategoria').val(), 

                    
                }, 
    
                    success: function (mensagem) {
                        if (mensagem == "ok") {
                            swal({
                                title: "Sucesso",
                                text: "Pedido realizado com sucesso!",
                                icon: "success",
                                timer: "3000",
                                buttons: false
                            });
                            
                        $('#nome').val(''),
                             $('#preco').val(''),
                             $('#descricao').val(''),
                             $('#foto').val(''),
                        $('#idCategoria').val(''),

                            listarProdutosBolos()
                            listarProdutosCafes()
                        } else {
                            swal({
                                title: "Erro",
                                text: "Não foi possível realizar o seu pedido!",
                                icon: "error",
                                timer: "3000",
                                buttons: false
                            });
                        }
                    },
                    error: function () {
                        swal({
                            title: "Erro",
                            text: "Não foi possível realizar o seu pedido!",
                            icon: "error",
                            timer: "3000",
                            buttons: false
                        });
                    }
                });
            });
        }
    
    
    
    
    
    
    
    
    
    
          function listarProdutosBolos() {
            $('#ListarBolo').empty()
            $.getJSON(URL_GET_BOLOS, function (data) {
                
                let menuBolos = '';
                $.each(data, function (index, item) {
                   
                    menuBolos += `
                     <tr>
                       <td data-label="name">${item.nome}</td>
                       <td data-label="preco">${item.preco}</td>
                       <td data-label="/Excluir">
                           
                            <button class="ui icon button btn-remove" data-id="${item.idProduto}">
                               <i class="icon delete large red"></i>
                            </button>
                       </td>
                     </tr>`;
                });
                
                $('#ListarBolo').append(menuBolos);
            });
        }


         function listarProdutosCafes() {
            $('#ListarCafe').empty()
            $.getJSON(URL_GET_CAFES, function (data) {
                
                let menuBolos = '';
                $.each(data, function (index, item) {
                   
                    menuBolos += `
                     <tr>
                       <td data-label="name">${item.nome}</td>
                       <td data-label="preco">${item.preco}</td>
                       <td data-label="/Excluir">
                            <button class="ui icon button btn-remove" data-id="${item.idProduto}">
                               <i class="icon delete large red "></i>
                            </button>
                       </td>
                     </tr>`;
                });
              
                $('#ListarCafe').append(menuBolos);
            });
        }



        function excluirProdutos(id) {
            console.log(id)
            $.ajax({
                url: URL_DEL_PRODUTO,
                data: { idProduto: id},
                success: function (mensagem) {
                    if (mensagem == "ok") {
                        swal({
                            title: "Sucesso",
                            text: "Pedido realizado com sucesso!",
                            icon: "success",
                            timer: "3000",
                            buttons: false
                        });
                        listarProdutosBolos();
                        listarProdutosCafes();
                    } else {
                        swal({
                            title: "Erro",
                            text: "Não foi possível realizar o seu pedido!",
                            icon: "error",
                            timer: "3000",
                            buttons: false
                        });
                    }
                },
                error: function () {
                    swal({
                        title: "Erro",
                        text: "Não foi possível realizar o seu pedido!",
                        icon: "error",
                        timer: "3000",
                        buttons: false
                    });
                }
            });
        }

        $('table').on("click", ".btn-remove",function () {
            excluirProdutos($(this).attr('data-id'));
        });


    });