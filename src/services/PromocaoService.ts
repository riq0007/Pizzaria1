import type { Produto } from '../models/Produto.js';
import type { Pedido } from '../models/Pedido.js';

export enum TipoPromocao {
    DESCONTO_PERCENTUAL = 'Desconto Percentual',
    DESCONTO_FIXO = 'Desconto Fixo',
    PRODUTO_GRATIS = 'Produto Grátis',
    FRETE_GRATIS = 'Frete Grátis',
    COMBO = 'Combo'
}

export interface Promocao {
    id: number;
    nome: string;
    descricao: string;
    tipo: TipoPromocao;
    valorDesconto: number;
    valorMinimo?: number;
    produtosAplicaveis?: number[];
    dataInicio: Date;
    dataFim: Date;
    ativa: boolean;
    limiteUsos?: number;
    usosRealizados: number;
}

export class PromocaoService {
    private promocoes: Promocao[] = [];
    private proximoId: number = 1;

    criarPromocao(dadosPromocao: Omit<Promocao, 'id' | 'usosRealizados'>): Promocao {
        const novaPromocao: Promocao = {
            ...dadosPromocao,
            id: this.proximoId++,
            usosRealizados: 0
        };
        this.promocoes.push(novaPromocao);
        return novaPromocao;
    }

    listarPromocoesAtivas(): Promocao[] {
        const agora = new Date();
        return this.promocoes.filter(promocao => 
            promocao.ativa && 
            promocao.dataInicio <= agora && 
            promocao.dataFim >= agora &&
            (!promocao.limiteUsos || promocao.usosRealizados < promocao.limiteUsos)
        );
    }

    aplicarPromocao(pedido: Pedido, codigoPromocao?: string): { desconto: number; promocaoAplicada?: Promocao } {
        const promocoesAtivas = this.listarPromocoesAtivas();
        let melhorDesconto = 0;
        let promocaoAplicada: Promocao | undefined;

        for (const promocao of promocoesAtivas) {
            if (codigoPromocao && !promocao.nome.toLowerCase().includes(codigoPromocao.toLowerCase())) {
                continue;
            }

            if (promocao.valorMinimo && this.calcularSubtotal(pedido) < promocao.valorMinimo) {
                continue;
            }

            if (promocao.produtosAplicaveis && promocao.produtosAplicaveis.length > 0) {
                const temProdutoAplicavel = pedido.itens.some(item => 
                    promocao.produtosAplicaveis!.includes(item.produto.id)
                );
                if (!temProdutoAplicavel) continue;
            }

            let desconto = 0;
            switch (promocao.tipo) {
                case TipoPromocao.DESCONTO_PERCENTUAL:
                    desconto = this.calcularSubtotal(pedido) * (promocao.valorDesconto / 100);
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
        }

        if (promocaoAplicada) {
            promocaoAplicada.usosRealizados++;
        }

        return { 
            desconto: melhorDesconto, 
            ...(promocaoAplicada && { promocaoAplicada })
        };
    }

    private calcularSubtotal(pedido: Pedido): number {
        return pedido.itens.reduce((total, item) => 
            total + (item.precoUnitario * item.quantidade), 0
        );
    }

    criarPromocoesPadrao(): void {
        const hoje = new Date();
        const proximoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDate());

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
    }

    getPromocoesExpiradas(): Promocao[] {
        const agora = new Date();
        return this.promocoes.filter(promocao => promocao.dataFim < agora);
    }

    desativarPromocao(id: number): boolean {
        const promocao = this.promocoes.find(p => p.id === id);
        if (promocao) {
            promocao.ativa = false;
            return true;
        }
        return false;
    }

    listarPromocoes(): Promocao[] {
        return this.promocoes;
    }

    buscarPromocaoPorId(id: number): Promocao | undefined {
        return this.promocoes.find(p => p.id === id);
    }

    atualizarPromocao(id: number, dados: Partial<Omit<Promocao, 'id' | 'usosRealizados'>>): boolean {
        const promocao = this.promocoes.find(p => p.id === id);
        if (promocao) {
            Object.assign(promocao, dados);
            return true;
        }
        return false;
    }

    excluirPromocao(id: number): boolean {
        const index = this.promocoes.findIndex(p => p.id === id);
        if (index !== -1) {
            this.promocoes.splice(index, 1);
            return true;
        }
        return false;
    }

    calcularDesconto(promocao: Promocao, pedido: Pedido): number {
        if (promocao.valorMinimo && this.calcularSubtotal(pedido) < promocao.valorMinimo) {
            return 0;
        }

        if (promocao.produtosAplicaveis && promocao.produtosAplicaveis.length > 0) {
            const temProdutoAplicavel = pedido.itens.some(item => 
                promocao.produtosAplicaveis!.includes(item.produto.id)
            );
            if (!temProdutoAplicavel) return 0;
        }

        let desconto = 0;
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
    }
}
