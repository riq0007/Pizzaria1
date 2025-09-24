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
exports.RelatorioService = void 0;
var Pedido_1 = require("../models/Pedido");
var RelatorioService = /** @class */ (function () {
    function RelatorioService(pedidos, produtos) {
        this.pedidos = pedidos;
        this.produtos = produtos;
    }
    RelatorioService.prototype.gerarRelatorioDiario = function (data) {
        var inicioDia = new Date(data);
        inicioDia.setHours(0, 0, 0, 0);
        var fimDia = new Date(data);
        fimDia.setHours(23, 59, 59, 999);
        var pedidosDoDia = this.pedidos.filter(function (pedido) {
            return pedido.dataPedido >= inicioDia &&
                pedido.dataPedido <= fimDia &&
                pedido.status === Pedido_1.StatusPedido.ENTREGUE;
        });
        var vendasPorCategoria = new Map();
        var vendasPorDia = new Map();
        var totalFaturamento = 0;
        var totalVendas = 0;
        pedidosDoDia.forEach(function (pedido) {
            totalFaturamento += pedido.valorTotal;
            totalVendas += pedido.itens.reduce(function (total, item) { return total + item.quantidade; }, 0);
            pedido.itens.forEach(function (item) {
                var categoria = item.produto.categoria;
                var quantidadeAtual = vendasPorCategoria.get(categoria) || 0;
                vendasPorCategoria.set(categoria, quantidadeAtual + item.quantidade);
            });
        });
        var dataString = data.toISOString().split('T')[0];
        if (dataString) {
            vendasPorDia.set(dataString, totalVendas);
        }
        return {
            totalVendas: totalVendas,
            totalFaturamento: totalFaturamento,
            vendasPorCategoria: vendasPorCategoria,
            vendasPorDia: vendasPorDia,
            pedidosEntregues: pedidosDoDia.length,
            pedidosCancelados: this.pedidos.filter(function (p) {
                return p.dataPedido >= inicioDia &&
                    p.dataPedido <= fimDia &&
                    p.status === Pedido_1.StatusPedido.CANCELADO;
            }).length
        };
    };
    RelatorioService.prototype.gerarRelatorioMensal = function (mes, ano) {
        var inicioMes = new Date(ano, mes - 1, 1);
        var fimMes = new Date(ano, mes, 0, 23, 59, 59, 999);
        var pedidosDoMes = this.pedidos.filter(function (pedido) {
            return pedido.dataPedido >= inicioMes &&
                pedido.dataPedido <= fimMes &&
                pedido.status === Pedido_1.StatusPedido.ENTREGUE;
        });
        var vendasPorDia = new Map();
        var vendasPorCategoria = new Map();
        var vendasPorProduto = new Map();
        var totalFaturamento = 0;
        var totalVendas = 0;
        pedidosDoMes.forEach(function (pedido) {
            var dia = pedido.dataPedido.getDate().toString();
            var vendasDia = vendasPorDia.get(dia) || 0;
            totalFaturamento += pedido.valorTotal;
            totalVendas += pedido.itens.reduce(function (total, item) { return total + item.quantidade; }, 0);
            pedido.itens.forEach(function (item) {
                // Vendas por dia
                vendasPorDia.set(dia, vendasDia + item.quantidade);
                // Vendas por categoria
                var categoria = item.produto.categoria;
                var vendasCategoria = vendasPorCategoria.get(categoria) || 0;
                vendasPorCategoria.set(categoria, vendasCategoria + item.quantidade);
                // Vendas por produto
                var produto = item.produto.nome;
                var vendasProduto = vendasPorProduto.get(produto) || 0;
                vendasPorProduto.set(produto, vendasProduto + item.quantidade);
            });
        });
        // Encontrar produto mais vendido
        var produtoMaisVendido = { produto: 'Nenhum', quantidade: 0 };
        vendasPorProduto.forEach(function (quantidade, produto) {
            if (quantidade > produtoMaisVendido.quantidade) {
                produtoMaisVendido = { produto: produto, quantidade: quantidade };
            }
        });
        // Encontrar categoria mais vendida
        var categoriaMaisVendida = { categoria: 'Nenhuma', quantidade: 0 };
        vendasPorCategoria.forEach(function (quantidade, categoria) {
            if (quantidade > categoriaMaisVendida.quantidade) {
                categoriaMaisVendida = { categoria: categoria, quantidade: quantidade };
            }
        });
        return {
            mes: mes,
            ano: ano,
            totalVendas: totalVendas,
            totalFaturamento: totalFaturamento,
            vendasPorDia: vendasPorDia,
            produtoMaisVendido: produtoMaisVendido,
            categoriaMaisVendida: categoriaMaisVendida
        };
    };
    RelatorioService.prototype.getTopProdutos = function (limite) {
        if (limite === void 0) { limite = 10; }
        var vendasPorProduto = new Map();
        this.pedidos
            .filter(function (pedido) { return pedido.status === Pedido_1.StatusPedido.ENTREGUE; })
            .forEach(function (pedido) {
            pedido.itens.forEach(function (item) {
                var produto = item.produto.nome;
                var atual = vendasPorProduto.get(produto) || { quantidade: 0, faturamento: 0 };
                vendasPorProduto.set(produto, {
                    quantidade: atual.quantidade + item.quantidade,
                    faturamento: atual.faturamento + (item.precoUnitario * item.quantidade)
                });
            });
        });
        return Array.from(vendasPorProduto.entries())
            .map(function (_a) {
            var produto = _a[0], dados = _a[1];
            return (__assign({ produto: produto }, dados));
        })
            .sort(function (a, b) { return b.quantidade - a.quantidade; })
            .slice(0, limite);
    };
    return RelatorioService;
}());
exports.RelatorioService = RelatorioService;
