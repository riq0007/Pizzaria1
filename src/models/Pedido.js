"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GerenciadorPedidos = exports.FormaPagamento = exports.StatusPedido = void 0;
var StatusPedido;
(function (StatusPedido) {
    StatusPedido["PENDENTE"] = "Pendente";
    StatusPedido["CONFIRMADO"] = "Confirmado";
    StatusPedido["EM_PREPARO"] = "Em Preparo";
    StatusPedido["PRONTO_PARA_ENTREGA"] = "Pronto para Entrega";
    StatusPedido["EM_TRANSITO"] = "Em Tr\u00E2nsito";
    StatusPedido["ENTREGUE"] = "Entregue";
    StatusPedido["CANCELADO"] = "Cancelado";
})(StatusPedido || (exports.StatusPedido = StatusPedido = {}));
var FormaPagamento;
(function (FormaPagamento) {
    FormaPagamento["DINHEIRO"] = "Dinheiro";
    FormaPagamento["CARTAO_CREDITO"] = "Cart\u00E3o de Cr\u00E9dito";
    FormaPagamento["CARTAO_DEBITO"] = "Cart\u00E3o de D\u00E9bito";
    FormaPagamento["PIX"] = "PIX";
    FormaPagamento["VALE_REFEICAO"] = "Vale Refei\u00E7\u00E3o";
})(FormaPagamento || (exports.FormaPagamento = FormaPagamento = {}));
var GerenciadorPedidos = /** @class */ (function () {
    function GerenciadorPedidos() {
        this.pedidos = [];
        this.proximoId = 1;
    }
    GerenciadorPedidos.prototype.criarPedido = function (dadosPedido) {
        var valorTotal = this.calcularValorTotal(dadosPedido.itens, dadosPedido.taxaEntrega, dadosPedido.desconto);
        var novoPedido = __assign(__assign({}, dadosPedido), { id: this.proximoId++, dataPedido: new Date(), valorTotal: valorTotal });
        this.pedidos.push(novoPedido);
        return novoPedido;
    };
    GerenciadorPedidos.prototype.calcularValorTotal = function (itens, taxaEntrega, desconto) {
        var subtotal = itens.reduce(function (total, item) { return total + (item.precoUnitario * item.quantidade); }, 0);
        return subtotal + taxaEntrega - desconto;
    };
    GerenciadorPedidos.prototype.listarPedidos = function () {
        return this.pedidos;
    };
    GerenciadorPedidos.prototype.buscarPedidoPorId = function (id) {
        return this.pedidos.find(function (pedido) { return pedido.id === id; });
    };
    GerenciadorPedidos.prototype.buscarPedidosPorCliente = function (clienteId) {
        return this.pedidos.filter(function (pedido) { return pedido.cliente.id === clienteId; });
    };
    GerenciadorPedidos.prototype.atualizarStatusPedido = function (id, novoStatus) {
        var pedido = this.buscarPedidoPorId(id);
        if (pedido) {
            pedido.status = novoStatus;
            if (novoStatus === StatusPedido.ENTREGUE) {
                pedido.dataEntrega = new Date();
            }
            return true;
        }
        return false;
    };
    GerenciadorPedidos.prototype.cancelarPedido = function (id) {
        var pedido = this.buscarPedidoPorId(id);
        if (pedido && pedido.status !== StatusPedido.ENTREGUE && pedido.status !== StatusPedido.CANCELADO) {
            pedido.status = StatusPedido.CANCELADO;
            return true;
        }
        return false;
    };
    GerenciadorPedidos.prototype.getPedidosPorStatus = function (status) {
        return this.pedidos.filter(function (pedido) { return pedido.status === status; });
    };
    GerenciadorPedidos.prototype.getTotalPedidos = function () {
        return this.pedidos.length;
    };
    GerenciadorPedidos.prototype.getFaturamentoTotal = function () {
        return this.pedidos
            .filter(function (pedido) { return pedido.status === StatusPedido.ENTREGUE; })
            .reduce(function (total, pedido) { return total + pedido.valorTotal; }, 0);
    };
    GerenciadorPedidos.prototype.getFaturamentoPorPeriodo = function (dataInicio, dataFim) {
        return this.pedidos
            .filter(function (pedido) {
            return pedido.status === StatusPedido.ENTREGUE &&
                pedido.dataPedido >= dataInicio &&
                pedido.dataPedido <= dataFim;
        })
            .reduce(function (total, pedido) { return total + pedido.valorTotal; }, 0);
    };
    return GerenciadorPedidos;
}());
exports.GerenciadorPedidos = GerenciadorPedidos;
