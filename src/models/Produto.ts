export enum CategoriaProduto {
    PIZZA = 'Pizza',
    BEBIDA = 'Bebida',
    SOBREMESA = 'Sobremesa',
    ACOMPANHAMENTO = 'Acompanhamento'
}

export enum StatusProduto {
    ATIVO = 'Ativo',
    INATIVO = 'Inativo',
    ESGOTADO = 'Esgotado'
}

export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoria: CategoriaProduto;
    status: StatusProduto;
    estoque: number;
    dataCadastro: Date;
    ingredientes?: string[];
    tamanho?: string;
    calorias?: number;
}

export class GerenciadorProdutos {
    private produtos: Produto[] = [];
    private proximoId: number = 1;

    adicionarProduto(produto: Omit<Produto, 'id' | 'dataCadastro' | 'status'>): Produto {
        const novoProduto: Produto = {
            ...produto,
            id: this.proximoId++,
            dataCadastro: new Date(),
            status: StatusProduto.ATIVO
        };
        this.produtos.push(novoProduto);
        return novoProduto;
    }

    listarProdutos(apenasAtivos: boolean = false): Produto[] {
        if (apenasAtivos) {
            return this.produtos.filter(produto => produto.status === StatusProduto.ATIVO);
        }
        return this.produtos;
    }

    listarProdutosPorCategoria(categoria: CategoriaProduto): Produto[] {
        return this.produtos.filter(produto => 
            produto.categoria === categoria && produto.status === StatusProduto.ATIVO
        );
    }

    buscarProdutoPorId(id: number): Produto | undefined {
        return this.produtos.find(produto => produto.id === id);
    }

    atualizarProduto(id: number, dadosAtualizacao: Partial<Omit<Produto, 'id' | 'dataCadastro'>>): boolean {
        const produto = this.buscarProdutoPorId(id);
        if (produto) {
            Object.assign(produto, dadosAtualizacao);
            return true;
        }
        return false;
    }

    excluirProduto(id: number): boolean {
        const produto = this.buscarProdutoPorId(id);
        if (produto) {
            produto.status = StatusProduto.INATIVO;
            return true;
        }
        return false;
    }

    atualizarEstoque(id: number, quantidade: number): boolean {
        const produto = this.buscarProdutoPorId(id);
        if (produto) {
            produto.estoque += quantidade;
            if (produto.estoque <= 0) {
                produto.status = StatusProduto.ESGOTADO;
            } else if (produto.status === StatusProduto.ESGOTADO) {
                produto.status = StatusProduto.ATIVO;
            }
            return true;
        }
        return false;
    }

    getTotalProdutos(): number {
        return this.produtos.filter(produto => produto.status === StatusProduto.ATIVO).length;
    }

    getProdutosEsgotados(): Produto[] {
        return this.produtos.filter(produto => produto.status === StatusProduto.ESGOTADO);
    }
}
