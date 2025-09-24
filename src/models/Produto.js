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
exports.GerenciadorProdutos = exports.StatusProduto = exports.CategoriaProduto = void 0;
var CategoriaProduto;
(function (CategoriaProduto) {
    CategoriaProduto["PIZZA"] = "Pizza";
    CategoriaProduto["BEBIDA"] = "Bebida";
    CategoriaProduto["SOBREMESA"] = "Sobremesa";
    CategoriaProduto["ACOMPANHAMENTO"] = "Acompanhamento";
})(CategoriaProduto || (exports.CategoriaProduto = CategoriaProduto = {}));
var StatusProduto;
(function (StatusProduto) {
    StatusProduto["ATIVO"] = "Ativo";
    StatusProduto["INATIVO"] = "Inativo";
    StatusProduto["ESGOTADO"] = "Esgotado";
})(StatusProduto || (exports.StatusProduto = StatusProduto = {}));
var GerenciadorProdutos = /** @class */ (function () {
    function GerenciadorProdutos() {
        this.produtos = [];
        this.proximoId = 1;
    }
    GerenciadorProdutos.prototype.adicionarProduto = function (produto) {
        var novoProduto = __assign(__assign({}, produto), { id: this.proximoId++, dataCadastro: new Date(), status: StatusProduto.ATIVO });
        this.produtos.push(novoProduto);
        return novoProduto;
    };
    GerenciadorProdutos.prototype.listarProdutos = function () {
        return this.produtos.filter(function (produto) { return produto.status === StatusProduto.ATIVO; });
    };
    GerenciadorProdutos.prototype.listarProdutosPorCategoria = function (categoria) {
        return this.produtos.filter(function (produto) {
            return produto.categoria === categoria && produto.status === StatusProduto.ATIVO;
        });
    };
    GerenciadorProdutos.prototype.buscarProdutoPorId = function (id) {
        return this.produtos.find(function (produto) { return produto.id === id; });
    };
    GerenciadorProdutos.prototype.atualizarProduto = function (id, dadosAtualizacao) {
        var produto = this.buscarProdutoPorId(id);
        if (produto) {
            Object.assign(produto, dadosAtualizacao);
            return true;
        }
        return false;
    };
    GerenciadorProdutos.prototype.excluirProduto = function (id) {
        var produto = this.buscarProdutoPorId(id);
        if (produto) {
            produto.status = StatusProduto.INATIVO;
            return true;
        }
        return false;
    };
    GerenciadorProdutos.prototype.atualizarEstoque = function (id, quantidade) {
        var produto = this.buscarProdutoPorId(id);
        if (produto) {
            produto.estoque += quantidade;
            if (produto.estoque <= 0) {
                produto.status = StatusProduto.ESGOTADO;
            }
            else if (produto.status === StatusProduto.ESGOTADO) {
                produto.status = StatusProduto.ATIVO;
            }
            return true;
        }
        return false;
    };
    GerenciadorProdutos.prototype.getTotalProdutos = function () {
        return this.produtos.filter(function (produto) { return produto.status === StatusProduto.ATIVO; }).length;
    };
    GerenciadorProdutos.prototype.getProdutosEsgotados = function () {
        return this.produtos.filter(function (produto) { return produto.status === StatusProduto.ESGOTADO; });
    };
    return GerenciadorProdutos;
}());
exports.GerenciadorProdutos = GerenciadorProdutos;
