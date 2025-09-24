"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComprovanteService = void 0;
var ComprovanteService = /** @class */ (function () {
    function ComprovanteService() {
    }
    ComprovanteService.prototype.gerarComprovante = function (pedido) {
        var _a;
        var dataFormatada = pedido.dataPedido.toLocaleString('pt-BR');
        var dataEntregaFormatada = ((_a = pedido.dataEntrega) === null || _a === void 0 ? void 0 : _a.toLocaleString('pt-BR')) || 'Não entregue';
        var comprovante = "\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                    \uD83C\uDF55 PIZZARIA DEL\u00CDCIA \uD83C\uDF55                    \u2551\n\u2551                    COMPROVANTE DE COMPRA                      \u2551\n\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563\n\u2551                                                              \u2551\n\u2551 \uD83D\uDCCB INFORMA\u00C7\u00D5ES DO PEDIDO                                     \u2551\n\u2551 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 \u2551\n\u2551 ID do Pedido: ".concat(pedido.id.toString().padStart(6, '0'), "                                    \u2551\n\u2551 Data/Hora: ").concat(dataFormatada.padEnd(35), "                       \u2551\n\u2551 Status: ").concat(pedido.status.padEnd(40), "                          \u2551\n\u2551                                                              \u2551\n\u2551 \uD83D\uDC64 DADOS DO CLIENTE                                          \u2551\n\u2551 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 \u2551\n\u2551 Nome: ").concat(pedido.cliente.nome.padEnd(45), "                      \u2551\n\u2551 Email: ").concat(pedido.cliente.email.padEnd(44), "                    \u2551\n\u2551 Telefone: ").concat(pedido.cliente.telefone.padEnd(40), "              \u2551\n\u2551                                                              \u2551");
        if (pedido.enderecoEntrega) {
            comprovante += "\n\u2551 \uD83D\uDCCD ENDERE\u00C7O DE ENTREGA                                       \u2551\n\u2551 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 \u2551\n\u2551 ".concat(pedido.enderecoEntrega.padEnd(58), " \u2551\n\u2551                                                              \u2551");
        }
        comprovante += "\n\u2551 \uD83D\uDED2 ITENS DO PEDIDO                                           \u2551\n\u2551 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 \u2551";
        pedido.itens.forEach(function (item, index) {
            var linha = "".concat(item.quantidade, "x ").concat(item.produto.nome);
            var preco = "R$ ".concat((item.precoUnitario * item.quantidade).toFixed(2));
            comprovante += "\n\u2551 ".concat(linha.padEnd(35), " ").concat(preco.padStart(15), "                    \u2551");
            if (item.observacoes) {
                comprovante += "\n\u2551   Obs: ".concat(item.observacoes.padEnd(50), "                        \u2551");
            }
        });
        comprovante += "\n\u2551                                                              \u2551\n\u2551 \uD83D\uDCB0 RESUMO FINANCEIRO                                         \u2551\n\u2551 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 \u2551";
        var subtotal = pedido.itens.reduce(function (total, item) {
            return total + (item.precoUnitario * item.quantidade);
        }, 0);
        comprovante += "\n\u2551 Subtotal: ".concat("R$ ".concat(subtotal.toFixed(2)).padStart(50), "        \u2551");
        if (pedido.taxaEntrega > 0) {
            comprovante += "\n\u2551 Taxa de Entrega: ".concat("R$ ".concat(pedido.taxaEntrega.toFixed(2)).padStart(42), " \u2551");
        }
        if (pedido.desconto > 0) {
            comprovante += "\n\u2551 Desconto: ".concat("-R$ ".concat(pedido.desconto.toFixed(2)).padStart(47), " \u2551");
        }
        comprovante += "\n\u2551 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 \u2551\n\u2551 TOTAL: ".concat("R$ ".concat(pedido.valorTotal.toFixed(2)).padStart(48), " \u2551\n\u2551                                                              \u2551\n\u2551 \uD83D\uDCB3 FORMA DE PAGAMENTO                                        \u2551\n\u2551 ").concat(pedido.formaPagamento.padEnd(58), " \u2551\n\u2551                                                              \u2551");
        if (pedido.observacoes) {
            comprovante += "\n\u2551 \uD83D\uDCDD OBSERVA\u00C7\u00D5ES                                               \u2551\n\u2551 ".concat(pedido.observacoes.padEnd(58), " \u2551\n\u2551                                                              \u2551");
        }
        comprovante += "\n\u2551                                                              \u2551\n\u2551 \uD83D\uDD52 ENTREGA: ".concat(dataEntregaFormatada.padEnd(42), " \u2551\n\u2551                                                              \u2551\n\u2551 Obrigado pela prefer\u00EAncia! \uD83C\uDF55                                \u2551\n\u2551 Volte sempre! \uD83D\uDE0A                                             \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D");
        return comprovante;
    };
    ComprovanteService.prototype.salvarComprovante = function (pedido, caminho) {
        var comprovante = this.gerarComprovante(pedido);
        var nomeArquivo = "comprovante_pedido_".concat(pedido.id, "_").concat(new Date().toISOString().split('T')[0], ".txt");
        var caminhoCompleto = caminho ? "".concat(caminho, "/").concat(nomeArquivo) : nomeArquivo;
        // Em um sistema real, aqui seria salvo em arquivo
        // Por enquanto, apenas retornamos o caminho
        return caminhoCompleto;
    };
    return ComprovanteService;
}());
exports.ComprovanteService = ComprovanteService;
