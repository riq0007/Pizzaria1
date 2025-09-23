import type { Cliente } from './Cliente';
import type { Produto } from './Produto';

export enum StatusPedido {
    PENDENTE = 'Pendente',
    CONFIRMADO = 'Confirmado',
    EM_PREPARO = 'Em Preparo',
    PRONTO_PARA_ENTREGA = 'Pronto para Entrega',
    EM_TRANSITO = 'Em Trânsito',
    ENTREGUE = 'Entregue',
    CANCELADO = 'Cancelado'
}

export enum FormaPagamento {
    DINHEIRO = 'Dinheiro',
    CARTAO_CREDITO = 'Cartão de Crédito',
    CARTAO_DEBITO = 'Cartão de Débito',
    PIX = 'PIX',
    VALE_REFEICAO = 'Vale Refeição'
}

export interface ItemPedido {
    produto: Produto;
    quantidade: number;
    precoUnitario: number;
    observacoes?: string;
}

export interface Pedido {
    id: number;
    cliente: Cliente;
    itens: ItemPedido[];
    status: StatusPedido;
    formaPagamento: FormaPagamento;
    valorTotal: number;
    taxaEntrega: number;
    desconto: number;
    dataPedido: Date;
    dataEntrega?: Date;
    observacoes?: string;
    enderecoEntrega?: string;
}

export class GerenciadorPedidos {
    private pedidos: Pedido[] = [];
    private proximoId: number = 1;

    criarPedido(dadosPedido: Omit<Pedido, 'id' | 'dataPedido' | 'valorTotal'>): Pedido {
        const valorTotal = this.calcularValorTotal(dadosPedido.itens, dadosPedido.taxaEntrega, dadosPedido.desconto);
        
        const novoPedido: Pedido = {
            ...dadosPedido,
            id: this.proximoId++,
            dataPedido: new Date(),
            valorTotal
        };
        
        this.pedidos.push(novoPedido);
        return novoPedido;
    }

    private calcularValorTotal(itens: ItemPedido[], taxaEntrega: number, desconto: number): number {
        const subtotal = itens.reduce((total, item) => total + (item.precoUnitario * item.quantidade), 0);
        return subtotal + taxaEntrega - desconto;
    }

    listarPedidos(): Pedido[] {
        return this.pedidos;
    }

    buscarPedidoPorId(id: number): Pedido | undefined {
        return this.pedidos.find(pedido => pedido.id === id);
    }

    buscarPedidosPorCliente(clienteId: number): Pedido[] {
        return this.pedidos.filter(pedido => pedido.cliente.id === clienteId);
    }

    atualizarStatusPedido(id: number, novoStatus: StatusPedido): boolean {
        const pedido = this.buscarPedidoPorId(id);
        if (pedido) {
            pedido.status = novoStatus;
            if (novoStatus === StatusPedido.ENTREGUE) {
                pedido.dataEntrega = new Date();
            }
            return true;
        }
        return false;
    }

    cancelarPedido(id: number): boolean {
        const pedido = this.buscarPedidoPorId(id);
        if (pedido && pedido.status !== StatusPedido.ENTREGUE && pedido.status !== StatusPedido.CANCELADO) {
            pedido.status = StatusPedido.CANCELADO;
            return true;
        }
        return false;
    }

    getPedidosPorStatus(status: StatusPedido): Pedido[] {
        return this.pedidos.filter(pedido => pedido.status === status);
    }

    getTotalPedidos(): number {
        return this.pedidos.length;
    }

    getFaturamentoTotal(): number {
        return this.pedidos
            .filter(pedido => pedido.status === StatusPedido.ENTREGUE)
            .reduce((total, pedido) => total + pedido.valorTotal, 0);
    }

    getFaturamentoPorPeriodo(dataInicio: Date, dataFim: Date): number {
        return this.pedidos
            .filter(pedido => 
                pedido.status === StatusPedido.ENTREGUE &&
                pedido.dataPedido >= dataInicio &&
                pedido.dataPedido <= dataFim
            )
            .reduce((total, pedido) => total + pedido.valorTotal, 0);
    }
}
