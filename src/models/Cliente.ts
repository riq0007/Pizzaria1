export interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    dataCadastro: Date;
    ativo: boolean;
}

export class GerenciadorClientes {
    private clientes: Cliente[] = [];
    private proximoId: number = 1;

    adicionarCliente(cliente: Omit<Cliente, 'id' | 'dataCadastro' | 'ativo'>): Cliente {
        const novoCliente: Cliente = {
            ...cliente,
            id: this.proximoId++,
            dataCadastro: new Date(),
            ativo: true
        };
        this.clientes.push(novoCliente);
        return novoCliente;
    }

    listarClientes(): Cliente[] {
        return this.clientes.filter(cliente => cliente.ativo);
    }

    buscarClientePorId(id: number): Cliente | undefined {
        return this.clientes.find(cliente => cliente.id === id && cliente.ativo);
    }

    buscarClientePorEmail(email: string): Cliente | undefined {
        return this.clientes.find(cliente => cliente.email === email && cliente.ativo);
    }

    atualizarCliente(id: number, dadosAtualizacao: Partial<Omit<Cliente, 'id' | 'dataCadastro'>>): boolean {
        const cliente = this.buscarClientePorId(id);
        if (cliente) {
            Object.assign(cliente, dadosAtualizacao);
            return true;
        }
        return false;
    }

    excluirCliente(id: number): boolean {
        const cliente = this.buscarClientePorId(id);
        if (cliente) {
            cliente.ativo = false;
            return true;
        }
        return false;
    }

    getTotalClientes(): number {
        return this.clientes.filter(cliente => cliente.ativo).length;
    }
}
