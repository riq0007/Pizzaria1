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
exports.GerenciadorClientes = void 0;
var GerenciadorClientes = /** @class */ (function () {
    function GerenciadorClientes() {
        this.clientes = [];
        this.proximoId = 1;
    }
    GerenciadorClientes.prototype.adicionarCliente = function (cliente) {
        var novoCliente = __assign(__assign({}, cliente), { id: this.proximoId++, dataCadastro: new Date(), ativo: true });
        this.clientes.push(novoCliente);
        return novoCliente;
    };
    GerenciadorClientes.prototype.listarClientes = function () {
        return this.clientes.filter(function (cliente) { return cliente.ativo; });
    };
    GerenciadorClientes.prototype.buscarClientePorId = function (id) {
        return this.clientes.find(function (cliente) { return cliente.id === id && cliente.ativo; });
    };
    GerenciadorClientes.prototype.buscarClientePorEmail = function (email) {
        return this.clientes.find(function (cliente) { return cliente.email === email && cliente.ativo; });
    };
    GerenciadorClientes.prototype.atualizarCliente = function (id, dadosAtualizacao) {
        var cliente = this.buscarClientePorId(id);
        if (cliente) {
            Object.assign(cliente, dadosAtualizacao);
            return true;
        }
        return false;
    };
    GerenciadorClientes.prototype.excluirCliente = function (id) {
        var cliente = this.buscarClientePorId(id);
        if (cliente) {
            cliente.ativo = false;
            return true;
        }
        return false;
    };
    GerenciadorClientes.prototype.getTotalClientes = function () {
        return this.clientes.filter(function (cliente) { return cliente.ativo; }).length;
    };
    return GerenciadorClientes;
}());
exports.GerenciadorClientes = GerenciadorClientes;
