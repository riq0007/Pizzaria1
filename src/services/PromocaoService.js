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
exports.PromocaoService = exports.TipoPromocao = void 0;
var TipoPromocao;
(function (TipoPromocao) {
    TipoPromocao["DESCONTO_PERCENTUAL"] = "Desconto Percentual";
    TipoPromocao["DESCONTO_FIXO"] = "Desconto Fixo";
    TipoPromocao["PRODUTO_GRATIS"] = "Produto Gr\u00E1tis";
    TipoPromocao["FRETE_GRATIS"] = "Frete Gr\u00E1tis";
    TipoPromocao["COMBO"] = "Combo";
})(TipoPromocao || (exports.TipoPromocao = TipoPromocao = {}));
var PromocaoService = /** @class */ (function () {
    function PromocaoService() {
        this.promocoes = [];
        this.proximoId = 1;
    }
    PromocaoService.prototype.criarPromocao = function (dadosPromocao) {
        var novaPromocao = __assign(__assign({}, dadosPromocao), { id: this.proximoId++, usosRealizados: 0 });
        this.promocoes.push(novaPromocao);
        return novaPromocao;
    };
    PromocaoService.prototype.listarPromocoesAtivas = function () {
        var agora = new Date();
        return this.promocoes.filter(function (promocao) {
            return promocao.ativa &&
                promocao.dataInicio <= agora &&
                promocao.dataFim >= agora &&
                (!promocao.limiteUsos || promocao.usosRealizados < promocao.limiteUsos);
        });
    };
    PromocaoService.prototype.aplicarPromocao = function (pedido, codigoPromocao) {
        var promocoesAtivas = this.listarPromocoesAtivas();
        var melhorDesconto = 0;
        var promocaoAplicada;
        var _loop_1 = function (promocao) {
            if (codigoPromocao && !promocao.nome.toLowerCase().includes(codigoPromocao.toLowerCase())) {
                return "continue";
            }
            if (promocao.valorMinimo && this_1.calcularSubtotal(pedido) < promocao.valorMinimo) {
                return "continue";
            }
            if (promocao.produtosAplicaveis && promocao.produtosAplicaveis.length > 0) {
                var temProdutoAplicavel = pedido.itens.some(function (item) {
                    return promocao.produtosAplicaveis.includes(item.produto.id);
                });
                if (!temProdutoAplicavel)
                    return "continue";
            }
            var desconto = 0;
            switch (promocao.tipo) {
                case TipoPromocao.DESCONTO_PERCENTUAL:
                    desconto = this_1.calcularSubtotal(pedido) * (promocao.valorDesconto / 100);
                    break;
                case TipoPromocao.DESCONTO_FIXO:
                    desconto = promocao.valorDesconto;
                    break;
                case TipoPromocao.FRETE_GRATIS:
                    desconto = pedido.taxaEntrega;
                    break;
            }
            if (desconto > melhorDesconto) {
                melhorDesconto = desconto;
                promocaoAplicada = promocao;
            }
        };
        var this_1 = this;
        for (var _i = 0, promocoesAtivas_1 = promocoesAtivas; _i < promocoesAtivas_1.length; _i++) {
            var promocao = promocoesAtivas_1[_i];
            _loop_1(promocao);
        }
        if (promocaoAplicada) {
            promocaoAplicada.usosRealizados++;
        }
        return __assign({ desconto: melhorDesconto }, (promocaoAplicada && { promocaoAplicada: promocaoAplicada }));
    };
    PromocaoService.prototype.calcularSubtotal = function (pedido) {
        return pedido.itens.reduce(function (total, item) {
            return total + (item.precoUnitario * item.quantidade);
        }, 0);
    };
    PromocaoService.prototype.criarPromocoesPadrao = function () {
        var hoje = new Date();
        var proximoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDate());
        // Promoção de primeira compra
        this.criarPromocao({
            nome: 'Primeira Compra',
            descricao: '10% de desconto na primeira compra',
            tipo: TipoPromocao.DESCONTO_PERCENTUAL,
            valorDesconto: 10,
            dataInicio: hoje,
            dataFim: proximoMes,
            ativa: true,
            limiteUsos: 1
        });
        // Promoção de frete grátis
        this.criarPromocao({
            nome: 'Frete Grátis',
            descricao: 'Frete grátis para pedidos acima de R$ 50,00',
            tipo: TipoPromocao.FRETE_GRATIS,
            valorDesconto: 0,
            valorMinimo: 50,
            dataInicio: hoje,
            dataFim: proximoMes,
            ativa: true
        });
        // Promoção de pizza do dia
        this.criarPromocao({
            nome: 'Pizza do Dia',
            descricao: '15% de desconto em pizzas',
            tipo: TipoPromocao.DESCONTO_PERCENTUAL,
            valorDesconto: 15,
            dataInicio: hoje,
            dataFim: proximoMes,
            ativa: true
        });
    };
    PromocaoService.prototype.getPromocoesExpiradas = function () {
        var agora = new Date();
        return this.promocoes.filter(function (promocao) { return promocao.dataFim < agora; });
    };
    PromocaoService.prototype.desativarPromocao = function (id) {
        var promocao = this.promocoes.find(function (p) { return p.id === id; });
        if (promocao) {
            promocao.ativa = false;
            return true;
        }
        return false;
    };
    PromocaoService.prototype.listarPromocoes = function () {
        return this.promocoes;
    };
    PromocaoService.prototype.buscarPromocaoPorId = function (id) {
        return this.promocoes.find(function (p) { return p.id === id; });
    };
    PromocaoService.prototype.atualizarPromocao = function (id, dados) {
        var promocao = this.promocoes.find(function (p) { return p.id === id; });
        if (promocao) {
            Object.assign(promocao, dados);
            return true;
        }
        return false;
    };
    PromocaoService.prototype.excluirPromocao = function (id) {
        var index = this.promocoes.findIndex(function (p) { return p.id === id; });
        if (index !== -1) {
            this.promocoes.splice(index, 1);
            return true;
        }
        return false;
    };
    PromocaoService.prototype.calcularDesconto = function (promocao, pedido) {
        if (promocao.valorMinimo && this.calcularSubtotal(pedido) < promocao.valorMinimo) {
            return 0;
        }
        if (promocao.produtosAplicaveis && promocao.produtosAplicaveis.length > 0) {
            var temProdutoAplicavel = pedido.itens.some(function (item) {
                return promocao.produtosAplicaveis.includes(item.produto.id);
            });
            if (!temProdutoAplicavel)
                return 0;
        }
        var desconto = 0;
        switch (promocao.tipo) {
            case TipoPromocao.DESCONTO_PERCENTUAL:
                desconto = this.calcularSubtotal(pedido) * (promocao.valorDesconto / 100);
                break;
            case TipoPromocao.DESCONTO_FIXO:
                desconto = promocao.valorDesconto;
                break;
            case TipoPromocao.PRODUTO_GRATIS:
                // Implementar lógica para produto grátis
                desconto = 0;
                break;
            case TipoPromocao.FRETE_GRATIS:
                desconto = pedido.taxaEntrega;
                break;
        }
        return Math.min(desconto, this.calcularSubtotal(pedido));
    };
    return PromocaoService;
}());
exports.PromocaoService = PromocaoService;
