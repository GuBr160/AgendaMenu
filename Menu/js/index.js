$(document).ready(function () {

    let arrayProdutosPedidos = [];
    const URL_GET_BOLOS = "https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/get-produtos.php?idCategoria=1";

    const URL_GET_CAFES = "https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/get-produtos.php?idCategoria=2";

    const URL_POST_PEDIDO = "https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/add-pedido.php";

    
   
    init();

    function init() {
        exibeMenuBolos();
        iniciarComponentes();
        adicionarRemoverItens();
        limparPedido();
        mostrarResumoPedido();
        realizarPedido();
        exibeMenuCafes();
    }


    function dolarParaReal(valor) {
        return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    function exibeMenuBolos() {
        $.getJSON(URL_GET_BOLOS, function (data) {
            let menuBolos = '';
            $.each(data, function (index, item) {
                menuBolos += `<div class="ui card fluid">
            <div class="ui top brown attached label">
            ${item.nome}</div>
            <div class="blurring dimmable image">
                <div class="ui dimmer">
                    <div class="content">
                        <div class="center">
                            <div class="ui inverted button">${item.descricao}</div>
                        </div>
                    </div>
                </div>
                <div class="ui green bottom right attached label">${dolarParaReal(item.preco)}</div>
                <img src="${item.foto}">
            </div>
            <div class="extra content">
                <div class="ui three buttons">
                    <div class="ui icon button basic adicionar-remover-item" data-item="del">
                        <i class="minus icon"></i>
                    </div>
                    <div class="ui basic button quantidade" data-product-name="${item.nome}" data-price="${item.preco}">0
                    </div>
                    <div class="ui icon button basic adicionar-remover-item" data-item="add">
                        <i class="add icon"></i>
                    </div>
                </div>
            </div>
        </div>`;
            });
            $('div[data-tab="tab-bolos"] .cards').append(menuBolos);
        });
    }

    function iniciarComponentes() {
        $.tab();
        $.tab('change tab', 'tab-bolos');
        $('#menu .menu-item').click(function () {
            let abaAtiva = $(this).attr('data-tab-name');
            $.tab('change tab', abaAtiva);
        });
        $('.special.cards .image').dimmer({ on: 'click' });
    }

    function adicionarRemoverItens() {
        $('.tab').on('click', '.adicionar-remover-item', function () {
            let $seletor = $(this).parent().find('.quantidade');
            let quantidade = parseInt($seletor.text());
            // let somarOuDiminuir = $(this).attr('data-item');
            // let total = (somarOuDiminuir == 'add') ? quantidade + 1 : quantidade - 1;
            let eDiminuir = $(this).find('.minus').length;
            let total = (eDiminuir) ? --quantidade : ++quantidade;
            total = total < 0 ? 0 : total;
            $seletor.text(total);
        });
    }


    function limparPedido() {
        $('#btn-limpar-pedido').click(function () {
            $('.quantidade').text(0);
            $('#numero-mesa').val('');
            $('.ui.modal').modal('hide');
        });
    }

    function mostrarResumoPedido(){
        $('#btn-confirmar').click(function () {
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

    function realizarPedido() {
        $('#btn-realizar-pedido').click(function () {
            $.ajax({
                url: URL_POST_PEDIDO,
                data: {
                    mesa: $('#numero-mesa').val(),
                    pedido: JSON.stringify(arrayProdutosPedidos),
                    total: $('#valor-total').text()
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
                        limparPedido();
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


//EXIBIR MENU CAFES NA ABA INDEX
function exibeMenuCafes() {
    
    $.getJSON(URL_GET_CAFES, function (data) {

      let menuCafes = "";

      $.each(data, function (index, item) {

        menuCafes += `<div class="ui card fluid">

            <div class="ui top brown attached label">

            ${item.nome}</div>

            <div class="blurring dimmable image">

                <div class="ui dimmer">

                    <div class="content">

                        <div class="center">

                            <div class="ui inverted button">${

                              item.descricao

                            }</div>

                        </div>

                    </div>

                </div>

                <div class="ui green bottom right attached label">${dolarParaReal(

                  item.preco

                )}</div>

                <img src="${item.foto}">

            </div>

            <div class="extra content">

                <div class="ui three buttons">

                    <div class="ui icon button basic adicionar-remover-item" data-item="del">

                        <i class="minus icon"></i>

                    </div>

                    <div class="ui basic button quantidade" data-product-name="${

                      item.nome

                    }" data-price="${item.preco}">0

                    </div>

                    <div class="ui icon button basic adicionar-remover-item" data-item="add">

                        <i class="add icon"></i>

                    </div>

                </div>

            </div>

        </div>`;

      });

      $('div[data-tab="tab-cafes"] .cards').append(menuCafes);

    });

  }

});

