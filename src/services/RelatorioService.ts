import type { Pedido } from '../models/Pedido';
import { StatusPedido } from '../models/Pedido';
import type { Produto, CategoriaProduto } from '../models/Produto';

export interface RelatorioVendas {
    totalVendas: number;
    totalFaturamento: number;
    vendasPorCategoria: Map<CategoriaProduto, number>;
    vendasPorDia: Map<string, number>;
    pedidosEntregues: number;
    pedidosCancelados: number;
}

export interface RelatorioMensal {
    mes: number;
    ano: number;
    totalVendas: number;
    totalFaturamento: number;
    vendasPorDia: Map<string, number>;
    produtoMaisVendido: { produto: string; quantidade: number };
    categoriaMaisVendida: { categoria: string; quantidade: number };
}

export class RelatorioService {
    constructor(
        private pedidos: Pedido[],
        private produtos: Produto[]
    ) {}

    gerarRelatorioDiario(data: Date): RelatorioVendas {
        const inicioDia = new Date(data);
        inicioDia.setHours(0, 0, 0, 0);
        
        const fimDia = new Date(data);
        fimDia.setHours(23, 59, 59, 999);

        const pedidosDoDia = this.pedidos.filter(pedido => 
            pedido.dataPedido >= inicioDia && 
            pedido.dataPedido <= fimDia &&
            pedido.status === StatusPedido.ENTREGUE
        );

        const vendasPorCategoria = new Map<CategoriaProduto, number>();
        const vendasPorDia = new Map<string, number>();
        
        let totalFaturamento = 0;
        let totalVendas = 0;

        pedidosDoDia.forEach(pedido => {
            totalFaturamento += pedido.valorTotal;
            totalVendas += pedido.itens.reduce((total, item) => total + item.quantidade, 0);

            pedido.itens.forEach(item => {
                const categoria = item.produto.categoria;
                const quantidadeAtual = vendasPorCategoria.get(categoria) || 0;
                vendasPorCategoria.set(categoria, quantidadeAtual + item.quantidade);
            });
        });

        const dataString = data.toISOString().split('T')[0];
        if (dataString) {
            vendasPorDia.set(dataString, totalVendas);
        }

        return {
            totalVendas,
            totalFaturamento,
            vendasPorCategoria,
            vendasPorDia,
            pedidosEntregues: pedidosDoDia.length,
            pedidosCancelados: this.pedidos.filter(p => 
                p.dataPedido >= inicioDia && 
                p.dataPedido <= fimDia && 
                p.status === StatusPedido.CANCELADO
            ).length
        };
    }

    gerarRelatorioMensal(mes: number, ano: number): RelatorioMensal {
        const inicioMes = new Date(ano, mes - 1, 1);
        const fimMes = new Date(ano, mes, 0, 23, 59, 59, 999);

        const pedidosDoMes = this.pedidos.filter(pedido => 
            pedido.dataPedido >= inicioMes && 
            pedido.dataPedido <= fimMes &&
            pedido.status === StatusPedido.ENTREGUE
        );

        const vendasPorDia = new Map<string, number>();
        const vendasPorCategoria = new Map<CategoriaProduto, number>();
        const vendasPorProduto = new Map<string, number>();

        let totalFaturamento = 0;
        let totalVendas = 0;

        pedidosDoMes.forEach(pedido => {
            const dia = pedido.dataPedido.getDate().toString();
            const vendasDia = vendasPorDia.get(dia) || 0;
            
            totalFaturamento += pedido.valorTotal;
            totalVendas += pedido.itens.reduce((total, item) => total + item.quantidade, 0);

            pedido.itens.forEach(item => {
                // Vendas por dia
                vendasPorDia.set(dia, vendasDia + item.quantidade);

                // Vendas por categoria
                const categoria = item.produto.categoria;
                const vendasCategoria = vendasPorCategoria.get(categoria) || 0;
                vendasPorCategoria.set(categoria, vendasCategoria + item.quantidade);

                // Vendas por produto
                const produto = item.produto.nome;
                const vendasProduto = vendasPorProduto.get(produto) || 0;
                vendasPorProduto.set(produto, vendasProduto + item.quantidade);
            });
        });

        // Encontrar produto mais vendido
        let produtoMaisVendido = { produto: 'Nenhum', quantidade: 0 };
        vendasPorProduto.forEach((quantidade, produto) => {
            if (quantidade > produtoMaisVendido.quantidade) {
                produtoMaisVendido = { produto, quantidade };
            }
        });

        // Encontrar categoria mais vendida
        let categoriaMaisVendida = { categoria: 'Nenhuma', quantidade: 0 };
        vendasPorCategoria.forEach((quantidade, categoria) => {
            if (quantidade > categoriaMaisVendida.quantidade) {
                categoriaMaisVendida = { categoria, quantidade };
            }
        });

        return {
            mes,
            ano,
            totalVendas,
            totalFaturamento,
            vendasPorDia,
            produtoMaisVendido,
            categoriaMaisVendida
        };
    }

    getTopProdutos(limite: number = 10): Array<{ produto: string; quantidade: number; faturamento: number }> {
        const vendasPorProduto = new Map<string, { quantidade: number; faturamento: number }>();

        this.pedidos
            .filter(pedido => pedido.status === StatusPedido.ENTREGUE)
            .forEach(pedido => {
                pedido.itens.forEach(item => {
                    const produto = item.produto.nome;
                    const atual = vendasPorProduto.get(produto) || { quantidade: 0, faturamento: 0 };
                    vendasPorProduto.set(produto, {
                        quantidade: atual.quantidade + item.quantidade,
                        faturamento: atual.faturamento + (item.precoUnitario * item.quantidade)
                    });
                });
            });

        return Array.from(vendasPorProduto.entries())
            .map(([produto, dados]) => ({ produto, ...dados }))
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, limite);
    }
}
