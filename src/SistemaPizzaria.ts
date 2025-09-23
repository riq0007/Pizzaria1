import * as readline from 'readline-sync';
import { GerenciadorClientes } from './models/Cliente';
import { GerenciadorProdutos, CategoriaProduto, StatusProduto } from './models/Produto';
import { GerenciadorPedidos, StatusPedido, FormaPagamento } from './models/Pedido';
import type { ItemPedido } from './models/Pedido';
import { RelatorioService } from './services/RelatorioService';
import { ComprovanteService } from './services/ComprovanteService';
import { PromocaoService } from './services/PromocaoService';

export class SistemaPizzaria {
    private gerenciadorClientes: GerenciadorClientes;
    private gerenciadorProdutos: GerenciadorProdutos;
    private gerenciadorPedidos: GerenciadorPedidos;
    private relatorioService: RelatorioService;
    private comprovanteService: ComprovanteService;
    private promocaoService: PromocaoService;

    constructor() {
        this.gerenciadorClientes = new GerenciadorClientes();
        this.gerenciadorProdutos = new GerenciadorProdutos();
        this.gerenciadorPedidos = new GerenciadorPedidos();
        this.comprovanteService = new ComprovanteService();
        this.promocaoService = new PromocaoService();
        this.relatorioService = new RelatorioService([], []);
        this.inicializarDados();
    }

    private inicializarDados(): void {
        // Criar produtos padrão
        this.criarProdutosPadrao();
        // Criar promoções padrão
        this.promocaoService.criarPromocoesPadrao();
    }

    private criarProdutosPadrao(): void {
        // Pizzas
        this.gerenciadorProdutos.adicionarProduto({
            nome: 'Pizza Margherita',
            descricao: 'Molho de tomate, mussarela, manjericão fresco',
            preco: 35.90,
            categoria: CategoriaProduto.PIZZA,
            estoque: 50,
            ingredientes: ['Molho de tomate', 'Mussarela', 'Manjericão'],
            tamanho: 'Grande',
            calorias: 280
        });

        this.gerenciadorProdutos.adicionarProduto({
            nome: 'Pizza Portuguesa',
            descricao: 'Presunto, ovos, cebola, azeitona, mussarela',
            preco: 42.90,
            categoria: CategoriaProduto.PIZZA,
            estoque: 30,
            ingredientes: ['Presunto', 'Ovos', 'Cebola', 'Azeitona', 'Mussarela'],
            tamanho: 'Grande',
            calorias: 320
        });

        // Bebidas
        this.gerenciadorProdutos.adicionarProduto({
            nome: 'Coca-Cola 2L',
            descricao: 'Refrigerante Coca-Cola 2 litros',
            preco: 8.90,
            categoria: CategoriaProduto.BEBIDA,
            estoque: 100
        });

        this.gerenciadorProdutos.adicionarProduto({
            nome: 'Suco de Laranja',
            descricao: 'Suco natural de laranja 500ml',
            preco: 6.50,
            categoria: CategoriaProduto.BEBIDA,
            estoque: 50
        });

        // Sobremesas
        this.gerenciadorProdutos.adicionarProduto({
            nome: 'Pudim de Leite',
            descricao: 'Pudim caseiro com calda de caramelo',
            preco: 12.90,
            categoria: CategoriaProduto.SOBREMESA,
            estoque: 20,
            calorias: 180
        });
    }

    public executar(): void {
        let executando = true;
        
        while (executando) {
            this.exibirMenuPrincipal();
            const opcao = readline.questionInt('Escolha uma opção: ') || 0;
            
            switch (opcao) {
                case 1:
                    this.menuClientes();
                    break;
                case 2:
                    this.menuProdutos();
                    break;
                case 3:
                    this.menuPedidos();
                    break;
                case 4:
                    this.menuRelatorios();
                    break;
                case 5:
                    this.menuPromocoes();
                    break;
                case 0:
                    executando = false;
                    console.log('\n🍕 Obrigado por usar o Sistema Pizzaria! Volte sempre! 🍕');
                    break;
                default:
                    console.log('\n❌ Opção inválida! Tente novamente.');
                    readline.keyInPause('\nPressione qualquer tecla para continuar...');
            }
        }
    }

    private exibirMenuPrincipal(): void {
        // Clear screen more reliably
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🍕 SISTEMA PIZZARIA 🍕                   ║');
        console.log('║                    Menu Principal                            ║');
        console.log('╠══════════════════════════════════════════════════════════════╣');
        console.log('║                                                              ║');
        console.log('║ 1️⃣  👤 Gerenciar Clientes                                   ║');
        console.log('║ 2️⃣  🍕 Gerenciar Produtos                                   ║');
        console.log('║ 3️⃣  📋 Gerenciar Pedidos                                    ║');
        console.log('║ 4️⃣  📊 Relatórios de Vendas                                 ║');
        console.log('║ 5️⃣  🎉 Promoções                                            ║');
        console.log('║ 0️⃣  🚪 Sair                                                 ║');
        console.log('║                                                              ║');
        console.log('╚══════════════════════════════════════════════════════════════╝');
    }

    private menuClientes(): void {
        let executando = true;
        
        while (executando) {
            // Clear screen more reliably
            process.stdout.write('\x1B[2J\x1B[0f');
            console.log('╔══════════════════════════════════════════════════════════════╗');
            console.log('║                    👤 GERENCIAR CLIENTES                     ║');
            console.log('╠══════════════════════════════════════════════════════════════╣');
            console.log('║                                                              ║');
            console.log('║ 1️⃣  ➕ Cadastrar Cliente                                    ║');
            console.log('║ 2️⃣  📋 Listar Clientes                                      ║');
            console.log('║ 3️⃣  🔍 Buscar Cliente                                       ║');
            console.log('║ 4️⃣  ✏️  Atualizar Cliente                                   ║');
            console.log('║ 5️⃣  🗑️  Excluir Cliente                                     ║');
            console.log('║ 0️⃣  ⬅️  Voltar ao Menu Principal                            ║');
            console.log('║                                                              ║');
            console.log('╚══════════════════════════════════════════════════════════════╝');
            
            const opcao = readline.questionInt('Escolha uma opção: ') || 0;
            
            switch (opcao) {
                case 1:
                    this.cadastrarCliente();
                    break;
                case 2:
                    this.listarClientes();
                    break;
                case 3:
                    this.buscarCliente();
                    break;
                case 4:
                    this.atualizarCliente();
                    break;
                case 5:
                    this.excluirCliente();
                    break;
                case 0:
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida!');
                    readline.keyInPause('\nPressione qualquer tecla para continuar...');
            }
        }
    }

    private cadastrarCliente(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ➕ CADASTRAR CLIENTE                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const nome = readline.question('Nome completo: ');
        const email = readline.question('Email: ');
        const telefone = readline.question('Telefone: ');
        const endereco = readline.question('Endereço: ');
        
        try {
            const cliente = this.gerenciadorClientes.adicionarCliente({
                nome, email, telefone, endereco
            });
            
            console.log('\n✅ Cliente cadastrado com sucesso!');
            console.log(`ID: ${cliente.id} | Nome: ${cliente.nome}`);
        } catch (error) {
            console.log('\n❌ Erro ao cadastrar cliente:', error);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private listarClientes(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📋 LISTAR CLIENTES                        ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const clientes = this.gerenciadorClientes.listarClientes();
        
        if (clientes.length === 0) {
            console.log('📭 Nenhum cliente cadastrado.');
        } else {
            clientes.forEach(cliente => {
                console.log(`ID: ${cliente.id} | Nome: ${cliente.nome} | Email: ${cliente.email} | Telefone: ${cliente.telefone}`);
            });
            console.log(`\n📊 Total de clientes: ${clientes.length}`);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private buscarCliente(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🔍 BUSCAR CLIENTE                         ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID do cliente: ');
        const cliente = this.gerenciadorClientes.buscarClientePorId(id);
        
        if (cliente) {
            console.log('\n✅ Cliente encontrado:');
            console.log(`ID: ${cliente.id}`);
            console.log(`Nome: ${cliente.nome}`);
            console.log(`Email: ${cliente.email}`);
            console.log(`Telefone: ${cliente.telefone}`);
            console.log(`Endereço: ${cliente.endereco}`);
            console.log(`Data de Cadastro: ${cliente.dataCadastro.toLocaleDateString('pt-BR')}`);
        } else {
            console.log('\n❌ Cliente não encontrado.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private atualizarCliente(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ✏️  ATUALIZAR CLIENTE                     ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID do cliente: ');
        const cliente = this.gerenciadorClientes.buscarClientePorId(id);
        
        if (cliente) {
            console.log(`\nCliente atual: ${cliente.nome} (${cliente.email})`);
            
            const nome = readline.question('Novo nome (ou Enter para manter): ') || cliente.nome;
            const email = readline.question('Novo email (ou Enter para manter): ') || cliente.email;
            const telefone = readline.question('Novo telefone (ou Enter para manter): ') || cliente.telefone;
            const endereco = readline.question('Novo endereço (ou Enter para manter): ') || cliente.endereco;
            
            const sucesso = this.gerenciadorClientes.atualizarCliente(id, {
                nome, email, telefone, endereco
            });
            
            if (sucesso) {
                console.log('\n✅ Cliente atualizado com sucesso!');
            } else {
                console.log('\n❌ Erro ao atualizar cliente.');
            }
        } else {
            console.log('\n❌ Cliente não encontrado.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private excluirCliente(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🗑️  EXCLUIR CLIENTE                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID do cliente: ');
        const cliente = this.gerenciadorClientes.buscarClientePorId(id);
        
        if (cliente) {
            console.log(`\nCliente: ${cliente.nome} (${cliente.email})`);
            const confirmacao = readline.keyInYN('Deseja realmente excluir este cliente?');
            
            if (confirmacao) {
                const sucesso = this.gerenciadorClientes.excluirCliente(id);
                if (sucesso) {
                    console.log('\n✅ Cliente excluído com sucesso!');
                } else {
                    console.log('\n❌ Erro ao excluir cliente.');
                }
            } else {
                console.log('\n❌ Operação cancelada.');
            }
        } else {
            console.log('\n❌ Cliente não encontrado.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    // Métodos para produtos, pedidos, relatórios e promoções serão implementados de forma similar
    // Por brevidade, vou criar versões simplificadas dos outros menus

    private menuProdutos(): void {
        let executando = true;
        
        while (executando) {
            process.stdout.write('\x1B[2J\x1B[0f');
            console.log('╔══════════════════════════════════════════════════════════════╗');
            console.log('║                    🍕 GERENCIAR PRODUTOS                     ║');
            console.log('╠══════════════════════════════════════════════════════════════╣');
            console.log('║                                                              ║');
            console.log('║ 1️⃣  ➕ Cadastrar Produto                                    ║');
            console.log('║ 2️⃣  📋 Listar Produtos                                      ║');
            console.log('║ 3️⃣  🔍 Buscar Produto                                       ║');
            console.log('║ 4️⃣  ✏️  Atualizar Produto                                   ║');
            console.log('║ 5️⃣  🗑️  Excluir Produto                                     ║');
            console.log('║ 6️⃣  📊 Relatório de Estoque                                 ║');
            console.log('║ 0️⃣  ⬅️  Voltar ao Menu Principal                            ║');
            console.log('║                                                              ║');
            console.log('╚══════════════════════════════════════════════════════════════╝');
            
            const opcao = readline.questionInt('Escolha uma opção: ') || 0;
            
            switch (opcao) {
                case 1:
                    this.cadastrarProduto();
                    break;
                case 2:
                    this.listarProdutos();
                    break;
                case 3:
                    this.buscarProduto();
                    break;
                case 4:
                    this.atualizarProduto();
                    break;
                case 5:
                    this.excluirProduto();
                    break;
                case 6:
                    this.relatorioEstoque();
                    break;
                case 0:
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida!');
                    readline.keyInPause('\nPressione qualquer tecla para continuar...');
            }
        }
    }

    private menuPedidos(): void {
        let executando = true;
        
        while (executando) {
            process.stdout.write('\x1B[2J\x1B[0f');
            console.log('╔══════════════════════════════════════════════════════════════╗');
            console.log('║                    📋 GERENCIAR PEDIDOS                      ║');
            console.log('╠══════════════════════════════════════════════════════════════╣');
            console.log('║                                                              ║');
            console.log('║ 1️⃣  ➕ Criar Novo Pedido                                    ║');
            console.log('║ 2️⃣  📋 Listar Pedidos                                       ║');
            console.log('║ 3️⃣  🔍 Buscar Pedido                                        ║');
            console.log('║ 4️⃣  ✏️  Atualizar Status do Pedido                          ║');
            console.log('║ 5️⃣  🧾 Gerar Comprovante                                    ║');
            console.log('║ 6️⃣  📊 Relatório de Pedidos                                 ║');
            console.log('║ 0️⃣  ⬅️  Voltar ao Menu Principal                            ║');
            console.log('║                                                              ║');
            console.log('╚══════════════════════════════════════════════════════════════╝');
            
            const opcao = readline.questionInt('Escolha uma opção: ') || 0;
            
            switch (opcao) {
                case 1:
                    this.criarPedido();
                    break;
                case 2:
                    this.listarPedidos();
                    break;
                case 3:
                    this.buscarPedido();
                    break;
                case 4:
                    this.atualizarStatusPedido();
                    break;
                case 5:
                    this.gerarComprovante();
                    break;
                case 6:
                    this.relatorioPedidos();
                    break;
                case 0:
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida!');
                    readline.keyInPause('\nPressione qualquer tecla para continuar...');
            }
        }
    }

    private menuRelatorios(): void {
        let executando = true;
        
        while (executando) {
            process.stdout.write('\x1B[2J\x1B[0f');
            console.log('╔══════════════════════════════════════════════════════════════╗');
            console.log('║                    📊 RELATÓRIOS DE VENDAS                   ║');
            console.log('╠══════════════════════════════════════════════════════════════╣');
            console.log('║                                                              ║');
            console.log('║ 1️⃣  📅 Relatório Diário                                     ║');
            console.log('║ 2️⃣  📆 Relatório Mensal                                     ║');
            console.log('║ 3️⃣  🏆 Top Produtos Mais Vendidos                           ║');
            console.log('║ 4️⃣  👥 Análise de Clientes                                  ║');
            console.log('║ 5️⃣  💰 Faturamento por Período                              ║');
            console.log('║ 6️⃣  📈 Relatório de Estoque                                 ║');
            console.log('║ 0️⃣  ⬅️  Voltar ao Menu Principal                            ║');
            console.log('║                                                              ║');
            console.log('╚══════════════════════════════════════════════════════════════╝');
            
            const opcao = readline.questionInt('Escolha uma opção: ') || 0;
            
            switch (opcao) {
                case 1:
                    this.relatorioDiario();
                    break;
                case 2:
                    this.relatorioMensal();
                    break;
                case 3:
                    this.topProdutosVendidos();
                    break;
                case 4:
                    this.analiseClientes();
                    break;
                case 5:
                    this.faturamentoPeriodo();
                    break;
                case 6:
                    this.relatorioEstoqueCompleto();
                    break;
                case 0:
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida!');
                    readline.keyInPause('\nPressione qualquer tecla para continuar...');
            }
        }
    }

    private menuPromocoes(): void {
        let executando = true;
        
        while (executando) {
            process.stdout.write('\x1B[2J\x1B[0f');
            console.log('╔══════════════════════════════════════════════════════════════╗');
            console.log('║                    🎉 PROMOÇÕES                              ║');
            console.log('╠══════════════════════════════════════════════════════════════╣');
            console.log('║                                                              ║');
            console.log('║ 1️⃣  ➕ Criar Nova Promoção                                  ║');
            console.log('║ 2️⃣  📋 Listar Promoções                                     ║');
            console.log('║ 3️⃣  🔍 Buscar Promoção                                      ║');
            console.log('║ 4️⃣  ✏️  Atualizar Promoção                                  ║');
            console.log('║ 5️⃣  🗑️  Excluir Promoção                                    ║');
            console.log('║ 6️⃣  🎯 Aplicar Promoção a Pedido                            ║');
            console.log('║ 0️⃣  ⬅️  Voltar ao Menu Principal                            ║');
            console.log('║                                                              ║');
            console.log('╚══════════════════════════════════════════════════════════════╝');
            
            const opcao = readline.questionInt('Escolha uma opção: ') || 0;
            
            switch (opcao) {
                case 1:
                    this.criarPromocao();
                    break;
                case 2:
                    this.listarPromocoes();
                    break;
                case 3:
                    this.buscarPromocao();
                    break;
                case 4:
                    this.atualizarPromocao();
                    break;
                case 5:
                    this.excluirPromocao();
                    break;
                case 6:
                    this.aplicarPromocao();
                    break;
                case 0:
                    executando = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida!');
                    readline.keyInPause('\nPressione qualquer tecla para continuar...');
            }
        }
    }

    // Métodos para gerenciar produtos
    private cadastrarProduto(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ➕ CADASTRAR PRODUTO                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const nome = readline.question('Nome do produto: ');
        const descricao = readline.question('Descrição: ');
        const preco = readline.questionFloat('Preço: R$ ');
        const categoria = this.selecionarCategoria();
        const estoque = readline.questionInt('Quantidade em estoque: ') || 0;
        
        let dadosProduto: any = {
            nome, descricao, preco, categoria, estoque
        };
        
        // Dados específicos para pizzas
        if (categoria === CategoriaProduto.PIZZA) {
            const ingredientes = readline.question('Ingredientes (separados por vírgula): ').split(',').map(i => i.trim());
            const tamanho = readline.question('Tamanho (Pequena/Média/Grande): ');
            const calorias = readline.questionInt('Calorias: ') || 0;
            
            dadosProduto = { ...dadosProduto, ingredientes, tamanho, calorias };
        }
        
        // Dados específicos para sobremesas
        if (categoria === CategoriaProduto.SOBREMESA) {
            const calorias = readline.questionInt('Calorias: ') || 0;
            dadosProduto = { ...dadosProduto, calorias };
        }
        
        try {
            const produto = this.gerenciadorProdutos.adicionarProduto(dadosProduto);
            console.log('\n✅ Produto cadastrado com sucesso!');
            console.log(`ID: ${produto.id} | Nome: ${produto.nome} | Preço: R$ ${produto.preco.toFixed(2)}`);
        } catch (error) {
            console.log('\n❌ Erro ao cadastrar produto:', error);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private selecionarCategoria(): CategoriaProduto {
        console.log('\nCategorias disponíveis:');
        console.log('1. Pizza');
        console.log('2. Bebida');
        console.log('3. Sobremesa');
        
        const opcao = readline.questionInt('Escolha uma categoria: ') || 1;
        
        switch (opcao) {
            case 1: return CategoriaProduto.PIZZA;
            case 2: return CategoriaProduto.BEBIDA;
            case 3: return CategoriaProduto.SOBREMESA;
            default: return CategoriaProduto.PIZZA;
        }
    }

    private listarProdutos(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📋 LISTAR PRODUTOS                        ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const produtos = this.gerenciadorProdutos.listarProdutos();
        
        if (produtos.length === 0) {
            console.log('📭 Nenhum produto cadastrado.');
        } else {
            produtos.forEach(produto => {
                console.log(`ID: ${produto.id} | ${produto.nome} | R$ ${produto.preco.toFixed(2)} | Estoque: ${produto.estoque}`);
                console.log(`   Categoria: ${produto.categoria} | Status: ${produto.status}`);
                if (produto.descricao) {
                    console.log(`   Descrição: ${produto.descricao}`);
                }
                console.log('');
            });
            console.log(`📊 Total de produtos: ${produtos.length}`);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private buscarProduto(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🔍 BUSCAR PRODUTO                         ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID do produto: ');
        const produto = this.gerenciadorProdutos.buscarProdutoPorId(id);
        
        if (produto) {
            console.log('\n✅ Produto encontrado:');
            console.log(`ID: ${produto.id}`);
            console.log(`Nome: ${produto.nome}`);
            console.log(`Descrição: ${produto.descricao}`);
            console.log(`Preço: R$ ${produto.preco.toFixed(2)}`);
            console.log(`Categoria: ${produto.categoria}`);
            console.log(`Estoque: ${produto.estoque}`);
            console.log(`Status: ${produto.status}`);
            
            if (produto.ingredientes && produto.ingredientes.length > 0) {
                console.log(`Ingredientes: ${produto.ingredientes.join(', ')}`);
            }
            if (produto.tamanho) {
                console.log(`Tamanho: ${produto.tamanho}`);
            }
            if (produto.calorias) {
                console.log(`Calorias: ${produto.calorias}`);
            }
        } else {
            console.log('\n❌ Produto não encontrado.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private atualizarProduto(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ✏️  ATUALIZAR PRODUTO                     ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID do produto: ');
        const produto = this.gerenciadorProdutos.buscarProdutoPorId(id);
        
        if (produto) {
            console.log(`\nProduto atual: ${produto.nome} (R$ ${produto.preco.toFixed(2)})`);
            
            const nome = readline.question('Novo nome (ou Enter para manter): ') || produto.nome;
            const descricao = readline.question('Nova descrição (ou Enter para manter): ') || produto.descricao;
            const preco = readline.questionFloat('Novo preço (ou Enter para manter): ') || produto.preco;
            const estoque = readline.questionInt('Nova quantidade em estoque (ou Enter para manter): ') || produto.estoque;
            
            const sucesso = this.gerenciadorProdutos.atualizarProduto(id, {
                nome, descricao, preco, estoque
            });
            
            if (sucesso) {
                console.log('\n✅ Produto atualizado com sucesso!');
            } else {
                console.log('\n❌ Erro ao atualizar produto.');
            }
        } else {
            console.log('\n❌ Produto não encontrado.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private excluirProduto(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🗑️  EXCLUIR PRODUTO                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID do produto: ');
        const produto = this.gerenciadorProdutos.buscarProdutoPorId(id);
        
        if (produto) {
            console.log(`\nProduto: ${produto.nome} (R$ ${produto.preco.toFixed(2)})`);
            const confirmacao = readline.keyInYN('Deseja realmente excluir este produto?');
            
            if (confirmacao) {
                const sucesso = this.gerenciadorProdutos.excluirProduto(id);
                if (sucesso) {
                    console.log('\n✅ Produto excluído com sucesso!');
                } else {
                    console.log('\n❌ Erro ao excluir produto.');
                }
            } else {
                console.log('\n❌ Operação cancelada.');
            }
        } else {
            console.log('\n❌ Produto não encontrado.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private relatorioEstoque(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📊 RELATÓRIO DE ESTOQUE                   ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const produtos = this.gerenciadorProdutos.listarProdutos();
        
        if (produtos.length === 0) {
            console.log('📭 Nenhum produto cadastrado.');
        } else {
            console.log('📊 RELATÓRIO DE ESTOQUE\n');
            
            // Produtos com estoque baixo
            const estoqueBaixo = produtos.filter(p => p.estoque < 10);
            if (estoqueBaixo.length > 0) {
                console.log('⚠️  PRODUTOS COM ESTOQUE BAIXO (< 10 unidades):');
                estoqueBaixo.forEach(produto => {
                    console.log(`   ${produto.nome}: ${produto.estoque} unidades`);
                });
                console.log('');
            }
            
            // Produtos sem estoque
            const semEstoque = produtos.filter(p => p.estoque === 0);
            if (semEstoque.length > 0) {
                console.log('❌ PRODUTOS SEM ESTOQUE:');
                semEstoque.forEach(produto => {
                    console.log(`   ${produto.nome}: ${produto.estoque} unidades`);
                });
                console.log('');
            }
            
            // Resumo por categoria
            const porCategoria = produtos.reduce((acc, produto) => {
                if (!acc[produto.categoria]) {
                    acc[produto.categoria] = { total: 0, valor: 0 };
                }
                const categoria = acc[produto.categoria];
                if (categoria) {
                    categoria.total += produto.estoque;
                    categoria.valor += produto.preco * produto.estoque;
                }
                return acc;
            }, {} as Record<string, { total: number; valor: number }>);
            
            console.log('📈 RESUMO POR CATEGORIA:');
            Object.entries(porCategoria).forEach(([categoria, dados]) => {
                console.log(`   ${categoria}: ${dados.total} unidades | Valor total: R$ ${dados.valor.toFixed(2)}`);
            });
            
            console.log(`\n📊 Total de produtos: ${produtos.length}`);
            console.log(`📦 Total em estoque: ${produtos.reduce((acc, p) => acc + p.estoque, 0)} unidades`);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    // Métodos para gerenciar pedidos
    private criarPedido(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ➕ CRIAR NOVO PEDIDO                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        // Selecionar cliente
        const clientes = this.gerenciadorClientes.listarClientes();
        if (clientes.length === 0) {
            console.log('❌ Nenhum cliente cadastrado. Cadastre um cliente primeiro.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        
        console.log('Clientes disponíveis:');
        clientes.forEach(cliente => {
            console.log(`ID: ${cliente.id} | ${cliente.nome} | ${cliente.telefone}`);
        });
        
        const clienteId = readline.questionInt('\nDigite o ID do cliente: ');
        const cliente = this.gerenciadorClientes.buscarClientePorId(clienteId);
        
        if (!cliente) {
            console.log('❌ Cliente não encontrado.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        
        // Selecionar produtos
        const itens: ItemPedido[] = [];
        let adicionandoItens = true;
        
        while (adicionandoItens) {
            const produtos = this.gerenciadorProdutos.listarProdutos();
            if (produtos.length === 0) {
                console.log('❌ Nenhum produto cadastrado.');
                break;
            }
            
            console.log('\nProdutos disponíveis:');
            produtos.forEach(produto => {
                console.log(`ID: ${produto.id} | ${produto.nome} | R$ ${produto.preco.toFixed(2)} | Estoque: ${produto.estoque}`);
            });
            
            const produtoId = readline.questionInt('\nDigite o ID do produto (0 para finalizar): ');
            
            if (produtoId === 0) {
                adicionandoItens = false;
                break;
            }
            
            const produto = this.gerenciadorProdutos.buscarProdutoPorId(produtoId);
            if (!produto) {
                console.log('❌ Produto não encontrado.');
                continue;
            }
            
            const quantidade = readline.questionInt('Quantidade: ') || 1;
            
            if (quantidade > produto.estoque) {
                console.log(`❌ Estoque insuficiente. Disponível: ${produto.estoque}`);
                continue;
            }
            
            itens.push({
                produto,
                quantidade,
                precoUnitario: produto.preco
            });
            
            console.log(`✅ ${produto.nome} adicionado ao pedido!`);
        }
        
        if (itens.length === 0) {
            console.log('❌ Nenhum item adicionado ao pedido.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        
        // Forma de pagamento
        console.log('\nFormas de pagamento:');
        console.log('1. Dinheiro');
        console.log('2. Cartão de Débito');
        console.log('3. Cartão de Crédito');
        console.log('4. PIX');
        
        const formaPagamentoOpcao = readline.questionInt('Escolha a forma de pagamento: ') || 1;
        let formaPagamento: FormaPagamento;
        
        switch (formaPagamentoOpcao) {
            case 1: formaPagamento = FormaPagamento.DINHEIRO; break;
            case 2: formaPagamento = FormaPagamento.CARTAO_DEBITO; break;
            case 3: formaPagamento = FormaPagamento.CARTAO_CREDITO; break;
            case 4: formaPagamento = FormaPagamento.PIX; break;
            default: formaPagamento = FormaPagamento.DINHEIRO;
        }
        
        // Observações
        const observacoes = readline.question('Observações (opcional): ') || '';
        
        try {
            const pedido = this.gerenciadorPedidos.criarPedido({
                cliente,
                itens,
                status: StatusPedido.PENDENTE,
                formaPagamento,
                taxaEntrega: 0,
                desconto: 0,
                observacoes
            });
            
            console.log('\n✅ Pedido criado com sucesso!');
            console.log(`ID do Pedido: ${pedido.id}`);
            console.log(`Cliente: ${pedido.cliente.nome}`);
            console.log(`Total: R$ ${pedido.valorTotal.toFixed(2)}`);
            console.log(`Status: ${pedido.status}`);
            
            // Atualizar estoque
            itens.forEach(item => {
                this.gerenciadorProdutos.atualizarEstoque(item.produto.id, -item.quantidade);
            });
            
        } catch (error) {
            console.log('\n❌ Erro ao criar pedido:', error);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private listarPedidos(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📋 LISTAR PEDIDOS                         ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const pedidos = this.gerenciadorPedidos.listarPedidos();
        
        if (pedidos.length === 0) {
            console.log('📭 Nenhum pedido cadastrado.');
        } else {
            pedidos.forEach(pedido => {
                console.log(`ID: ${pedido.id} | Cliente: ${pedido.cliente.nome} | Total: R$ ${pedido.valorTotal.toFixed(2)}`);
                console.log(`   Status: ${pedido.status} | Data: ${pedido.dataPedido.toLocaleDateString('pt-BR')}`);
                console.log(`   Forma de Pagamento: ${pedido.formaPagamento}`);
                if (pedido.observacoes) {
                    console.log(`   Observações: ${pedido.observacoes}`);
                }
                console.log('');
            });
            console.log(`📊 Total de pedidos: ${pedidos.length}`);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private buscarPedido(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🔍 BUSCAR PEDIDO                          ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID do pedido: ');
        const pedido = this.gerenciadorPedidos.buscarPedidoPorId(id);
        
        if (pedido) {
            console.log('\n✅ Pedido encontrado:');
            console.log(`ID: ${pedido.id}`);
            console.log(`Cliente: ${pedido.cliente.nome} (${pedido.cliente.telefone})`);
            console.log(`Data: ${pedido.dataPedido.toLocaleString('pt-BR')}`);
            console.log(`Status: ${pedido.status}`);
            console.log(`Forma de Pagamento: ${pedido.formaPagamento}`);
            console.log(`Total: R$ ${pedido.valorTotal.toFixed(2)}`);
            
            if (pedido.observacoes) {
                console.log(`Observações: ${pedido.observacoes}`);
            }
            
            console.log('\nItens do pedido:');
            pedido.itens.forEach((item, index) => {
                console.log(`   ${index + 1}. ${item.produto.nome} x${item.quantidade} = R$ ${(item.precoUnitario * item.quantidade).toFixed(2)}`);
            });
            
            if (pedido.dataEntrega) {
                console.log(`Data de Entrega: ${pedido.dataEntrega.toLocaleString('pt-BR')}`);
            }
        } else {
            console.log('\n❌ Pedido não encontrado.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private atualizarStatusPedido(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ✏️  ATUALIZAR STATUS DO PEDIDO            ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID do pedido: ');
        const pedido = this.gerenciadorPedidos.buscarPedidoPorId(id);
        
        if (pedido) {
            console.log(`\nPedido atual: ${pedido.id} | Cliente: ${pedido.cliente.nome} | Status: ${pedido.status}`);
            
            console.log('\nStatus disponíveis:');
            console.log('1. Pendente');
            console.log('2. Confirmado');
            console.log('3. Em Preparo');
            console.log('4. Pronto para Entrega');
            console.log('5. Em Trânsito');
            console.log('6. Entregue');
            console.log('7. Cancelado');
            
            const novoStatusOpcao = readline.questionInt('Escolha o novo status: ') || 1;
            let novoStatus: StatusPedido;
            
            switch (novoStatusOpcao) {
                case 1: novoStatus = StatusPedido.PENDENTE; break;
                case 2: novoStatus = StatusPedido.CONFIRMADO; break;
                case 3: novoStatus = StatusPedido.EM_PREPARO; break;
                case 4: novoStatus = StatusPedido.PRONTO_PARA_ENTREGA; break;
                case 5: novoStatus = StatusPedido.EM_TRANSITO; break;
                case 6: novoStatus = StatusPedido.ENTREGUE; break;
                case 7: novoStatus = StatusPedido.CANCELADO; break;
                default: novoStatus = StatusPedido.PENDENTE;
            }
            
            const sucesso = this.gerenciadorPedidos.atualizarStatusPedido(id, novoStatus);
            
            if (sucesso) {
                console.log('\n✅ Status do pedido atualizado com sucesso!');
                console.log(`Novo status: ${novoStatus}`);
            } else {
                console.log('\n❌ Erro ao atualizar status do pedido.');
            }
        } else {
            console.log('\n❌ Pedido não encontrado.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private gerarComprovante(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🧾 GERAR COMPROVANTE                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID do pedido: ');
        const pedido = this.gerenciadorPedidos.buscarPedidoPorId(id);
        
        if (pedido) {
            const comprovante = this.comprovanteService.gerarComprovante(pedido);
            console.log('\n' + comprovante);
        } else {
            console.log('\n❌ Pedido não encontrado.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private relatorioPedidos(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📊 RELATÓRIO DE PEDIDOS                   ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const pedidos = this.gerenciadorPedidos.listarPedidos();
        
        if (pedidos.length === 0) {
            console.log('📭 Nenhum pedido cadastrado.');
        } else {
            console.log('📊 RELATÓRIO DE PEDIDOS\n');
            
            // Resumo por status
            const porStatus = pedidos.reduce((acc, pedido) => {
                if (!acc[pedido.status]) {
                    acc[pedido.status] = { quantidade: 0, valor: 0 };
                }
                const status = acc[pedido.status];
                if (status) {
                    status.quantidade++;
                    status.valor += pedido.valorTotal;
                }
                return acc;
            }, {} as Record<string, { quantidade: number; valor: number }>);
            
            console.log('📈 RESUMO POR STATUS:');
            Object.entries(porStatus).forEach(([status, dados]) => {
                console.log(`   ${status}: ${dados.quantidade} pedidos | R$ ${dados.valor.toFixed(2)}`);
            });
            
            // Pedidos do dia
            const hoje = new Date();
            const pedidosHoje = pedidos.filter(p => 
                p.dataPedido.toDateString() === hoje.toDateString()
            );
            
            console.log(`\n📅 PEDIDOS DE HOJE: ${pedidosHoje.length}`);
            if (pedidosHoje.length > 0) {
                const totalHoje = pedidosHoje.reduce((acc, p) => acc + p.valorTotal, 0);
                console.log(`   Total vendido hoje: R$ ${totalHoje.toFixed(2)}`);
            }
            
            // Top clientes
            const clientesFrequentes = pedidos.reduce((acc, pedido) => {
                const clienteId = pedido.cliente.id;
                if (!acc[clienteId]) {
                    acc[clienteId] = { nome: pedido.cliente.nome, pedidos: 0, total: 0 };
                }
                acc[clienteId].pedidos++;
                acc[clienteId].total += pedido.valorTotal;
                return acc;
            }, {} as Record<number, { nome: string; pedidos: number; total: number }>);
            
            const topClientes = Object.values(clientesFrequentes)
                .sort((a, b) => b.total - a.total)
                .slice(0, 5);
            
            if (topClientes.length > 0) {
                console.log('\n🏆 TOP 5 CLIENTES:');
                topClientes.forEach((cliente, index) => {
                    console.log(`   ${index + 1}. ${cliente.nome}: ${cliente.pedidos} pedidos | R$ ${cliente.total.toFixed(2)}`);
                });
            }
            
            console.log(`\n📊 Total de pedidos: ${pedidos.length}`);
            console.log(`💰 Faturamento total: R$ ${pedidos.reduce((acc, p) => acc + p.valorTotal, 0).toFixed(2)}`);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    // Métodos para relatórios
    private relatorioDiario(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📅 RELATÓRIO DIÁRIO                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const hoje = new Date();
        const pedidos = this.gerenciadorPedidos.listarPedidos();
        const pedidosHoje = pedidos.filter(p => 
            p.dataPedido.toDateString() === hoje.toDateString()
        );
        
        if (pedidosHoje.length === 0) {
            console.log('📭 Nenhum pedido realizado hoje.');
        } else {
            const totalVendas = pedidosHoje.reduce((acc, p) => acc + p.valorTotal, 0);
            const pedidosEntregues = pedidosHoje.filter(p => p.status === StatusPedido.ENTREGUE);
            
            console.log(`📊 RESUMO DO DIA - ${hoje.toLocaleDateString('pt-BR')}`);
            console.log(`   Total de pedidos: ${pedidosHoje.length}`);
            console.log(`   Pedidos entregues: ${pedidosEntregues.length}`);
            console.log(`   Faturamento: R$ ${totalVendas.toFixed(2)}`);
            
            console.log('\n📋 PEDIDOS DE HOJE:');
            pedidosHoje.forEach(pedido => {
                console.log(`   ID: ${pedido.id} | Cliente: ${pedido.cliente.nome} | Total: R$ ${pedido.valorTotal.toFixed(2)} | Status: ${pedido.status}`);
            });
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private relatorioMensal(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📆 RELATÓRIO MENSAL                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const agora = new Date();
        const mesAtual = agora.getMonth();
        const anoAtual = agora.getFullYear();
        
        const pedidos = this.gerenciadorPedidos.listarPedidos();
        const pedidosMes = pedidos.filter(p => 
            p.dataPedido.getMonth() === mesAtual && p.dataPedido.getFullYear() === anoAtual
        );
        
        if (pedidosMes.length === 0) {
            console.log('📭 Nenhum pedido realizado este mês.');
        } else {
            const totalVendas = pedidosMes.reduce((acc, p) => acc + p.valorTotal, 0);
            const pedidosEntregues = pedidosMes.filter(p => p.status === StatusPedido.ENTREGUE);
            
            console.log(`📊 RESUMO DO MÊS - ${agora.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`);
            console.log(`   Total de pedidos: ${pedidosMes.length}`);
            console.log(`   Pedidos entregues: ${pedidosEntregues.length}`);
            console.log(`   Faturamento: R$ ${totalVendas.toFixed(2)}`);
            
            // Vendas por dia
            const vendasPorDia = pedidosMes.reduce((acc, pedido) => {
                const dia = pedido.dataPedido.getDate();
                if (!acc[dia]) {
                    acc[dia] = { pedidos: 0, valor: 0 };
                }
                acc[dia].pedidos++;
                acc[dia].valor += pedido.valorTotal;
                return acc;
            }, {} as Record<number, { pedidos: number; valor: number }>);
            
            console.log('\n📈 VENDAS POR DIA:');
            Object.entries(vendasPorDia)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .forEach(([dia, dados]) => {
                    console.log(`   Dia ${dia}: ${dados.pedidos} pedidos | R$ ${dados.valor.toFixed(2)}`);
                });
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private topProdutosVendidos(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🏆 TOP PRODUTOS MAIS VENDIDOS             ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const pedidos = this.gerenciadorPedidos.listarPedidos();
        const vendasPorProduto = new Map<number, { nome: string; quantidade: number; valor: number }>();
        
        pedidos.forEach(pedido => {
            pedido.itens.forEach(item => {
                const produtoId = item.produto.id;
                const atual = vendasPorProduto.get(produtoId) || { 
                    nome: item.produto.nome, 
                    quantidade: 0, 
                    valor: 0 
                };
                atual.quantidade += item.quantidade;
                atual.valor += item.precoUnitario * item.quantidade;
                vendasPorProduto.set(produtoId, atual);
            });
        });
        
        if (vendasPorProduto.size === 0) {
            console.log('📭 Nenhuma venda registrada.');
        } else {
            const topProdutos = Array.from(vendasPorProduto.values())
                .sort((a, b) => b.quantidade - a.quantidade)
                .slice(0, 10);
            
            console.log('🏆 TOP 10 PRODUTOS MAIS VENDIDOS:\n');
            topProdutos.forEach((produto, index) => {
                console.log(`${index + 1}. ${produto.nome}`);
                console.log(`   Quantidade vendida: ${produto.quantidade} unidades`);
                console.log(`   Faturamento: R$ ${produto.valor.toFixed(2)}`);
                console.log('');
            });
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private analiseClientes(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    👥 ANÁLISE DE CLIENTES                    ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const clientes = this.gerenciadorClientes.listarClientes();
        const pedidos = this.gerenciadorPedidos.listarPedidos();
        
        if (clientes.length === 0) {
            console.log('📭 Nenhum cliente cadastrado.');
        } else {
            console.log(`📊 ANÁLISE DE CLIENTES\n`);
            console.log(`Total de clientes cadastrados: ${clientes.length}`);
            console.log(`Total de pedidos realizados: ${pedidos.length}`);
            
            // Clientes com mais pedidos
            const clientesComPedidos = pedidos.reduce((acc, pedido) => {
                const clienteId = pedido.cliente.id;
                if (!acc[clienteId]) {
                    acc[clienteId] = { 
                        nome: pedido.cliente.nome, 
                        pedidos: 0, 
                        valor: 0,
                        ultimoPedido: pedido.dataPedido
                    };
                }
                acc[clienteId].pedidos++;
                acc[clienteId].valor += pedido.valorTotal;
                if (pedido.dataPedido > acc[clienteId].ultimoPedido) {
                    acc[clienteId].ultimoPedido = pedido.dataPedido;
                }
                return acc;
            }, {} as Record<number, { nome: string; pedidos: number; valor: number; ultimoPedido: Date }>);
            
            const topClientes = Object.values(clientesComPedidos)
                .sort((a, b) => b.valor - a.valor)
                .slice(0, 5);
            
            if (topClientes.length > 0) {
                console.log('\n🏆 TOP 5 CLIENTES (POR FATURAMENTO):');
                topClientes.forEach((cliente, index) => {
                    console.log(`${index + 1}. ${cliente.nome}`);
                    console.log(`   Pedidos: ${cliente.pedidos} | Faturamento: R$ ${cliente.valor.toFixed(2)}`);
                    console.log(`   Último pedido: ${cliente.ultimoPedido.toLocaleDateString('pt-BR')}`);
                    console.log('');
                });
            }
            
            // Clientes sem pedidos
            const clientesSemPedidos = clientes.filter(cliente => 
                !pedidos.some(pedido => pedido.cliente.id === cliente.id)
            );
            
            if (clientesSemPedidos.length > 0) {
                console.log(`\n📭 CLIENTES SEM PEDIDOS (${clientesSemPedidos.length}):`);
                clientesSemPedidos.forEach(cliente => {
                    console.log(`   ${cliente.nome} (${cliente.email})`);
                });
            }
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private faturamentoPeriodo(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    💰 FATURAMENTO POR PERÍODO                ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const pedidos = this.gerenciadorPedidos.listarPedidos();
        
        if (pedidos.length === 0) {
            console.log('📭 Nenhum pedido registrado.');
        } else {
            // Faturamento por mês
            const faturamentoPorMes = pedidos.reduce((acc, pedido) => {
                const mes = pedido.dataPedido.getMonth() + 1;
                const ano = pedido.dataPedido.getFullYear();
                const chave = `${mes}/${ano}`;
                
                if (!acc[chave]) {
                    acc[chave] = { pedidos: 0, valor: 0 };
                }
                acc[chave].pedidos++;
                acc[chave].valor += pedido.valorTotal;
                return acc;
            }, {} as Record<string, { pedidos: number; valor: number }>);
            
            console.log('📈 FATURAMENTO POR MÊS:\n');
            Object.entries(faturamentoPorMes)
                .sort(([a], [b]) => {
                    const [mesA, anoA] = a.split('/').map(Number);
                    const [mesB, anoB] = b.split('/').map(Number);
                    return (anoA || 0) - (anoB || 0) || (mesA || 0) - (mesB || 0);
                })
                .forEach(([mes, dados]) => {
                    console.log(`${mes}: ${dados.pedidos} pedidos | R$ ${dados.valor.toFixed(2)}`);
                });
            
            const totalFaturamento = pedidos.reduce((acc, p) => acc + p.valorTotal, 0);
            console.log(`\n💰 FATURAMENTO TOTAL: R$ ${totalFaturamento.toFixed(2)}`);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private relatorioEstoqueCompleto(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📈 RELATÓRIO DE ESTOQUE COMPLETO          ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const produtos = this.gerenciadorProdutos.listarProdutos();
        
        if (produtos.length === 0) {
            console.log('📭 Nenhum produto cadastrado.');
        } else {
            console.log('📊 RELATÓRIO COMPLETO DE ESTOQUE\n');
            
            // Produtos por categoria
            const porCategoria = produtos.reduce((acc, produto) => {
                if (!acc[produto.categoria]) {
                    acc[produto.categoria] = { produtos: 0, estoque: 0, valor: 0 };
                }
                const categoria = acc[produto.categoria];
                if (categoria) {
                    categoria.produtos++;
                    categoria.estoque += produto.estoque;
                    categoria.valor += produto.preco * produto.estoque;
                }
                return acc;
            }, {} as Record<string, { produtos: number; estoque: number; valor: number }>);
            
            console.log('📦 RESUMO POR CATEGORIA:');
            Object.entries(porCategoria).forEach(([categoria, dados]) => {
                console.log(`   ${categoria}: ${dados.produtos} produtos | ${dados.estoque} unidades | R$ ${dados.valor.toFixed(2)}`);
            });
            
            // Produtos com estoque baixo
            const estoqueBaixo = produtos.filter(p => p.estoque < 10 && p.estoque > 0);
            if (estoqueBaixo.length > 0) {
                console.log('\n⚠️  PRODUTOS COM ESTOQUE BAIXO:');
                estoqueBaixo.forEach(produto => {
                    console.log(`   ${produto.nome}: ${produto.estoque} unidades`);
                });
            }
            
            // Produtos sem estoque
            const semEstoque = produtos.filter(p => p.estoque === 0);
            if (semEstoque.length > 0) {
                console.log('\n❌ PRODUTOS SEM ESTOQUE:');
                semEstoque.forEach(produto => {
                    console.log(`   ${produto.nome}: ${produto.estoque} unidades`);
                });
            }
            
            console.log(`\n📊 Total de produtos: ${produtos.length}`);
            console.log(`📦 Total em estoque: ${produtos.reduce((acc, p) => acc + p.estoque, 0)} unidades`);
            console.log(`💰 Valor total do estoque: R$ ${produtos.reduce((acc, p) => acc + (p.preco * p.estoque), 0).toFixed(2)}`);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    // Métodos para promoções
    private criarPromocao(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ➕ CRIAR NOVA PROMOÇÃO                    ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const nome = readline.question('Nome da promoção: ');
        const descricao = readline.question('Descrição: ');
        
        console.log('\nTipos de promoção:');
        console.log('1. Desconto Percentual');
        console.log('2. Desconto Fixo');
        console.log('3. Produto Grátis');
        
        const tipoOpcao = readline.questionInt('Escolha o tipo: ') || 1;
        let tipo: any;
        
        switch (tipoOpcao) {
            case 1: tipo = 'DESCONTO_PERCENTUAL'; break;
            case 2: tipo = 'DESCONTO_FIXO'; break;
            case 3: tipo = 'PRODUTO_GRATIS'; break;
            default: tipo = 'DESCONTO_PERCENTUAL';
        }
        
        const valorDesconto = readline.questionFloat('Valor do desconto/produto: ');
        const dataInicio = new Date();
        const dataFim = new Date();
        dataFim.setDate(dataFim.getDate() + 30); // 30 dias por padrão
        
        const ativa = true;
        
        try {
            const promocao = this.promocaoService.criarPromocao({
                nome, descricao, tipo, valorDesconto, dataInicio, dataFim, ativa
            });
            
            console.log('\n✅ Promoção criada com sucesso!');
            console.log(`ID: ${promocao.id} | Nome: ${promocao.nome}`);
        } catch (error) {
            console.log('\n❌ Erro ao criar promoção:', error);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private listarPromocoes(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📋 LISTAR PROMOÇÕES                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const promocoes = this.promocaoService.listarPromocoes();
        
        if (promocoes.length === 0) {
            console.log('📭 Nenhuma promoção cadastrada.');
        } else {
            promocoes.forEach(promocao => {
                console.log(`ID: ${promocao.id} | ${promocao.nome}`);
                console.log(`   Tipo: ${promocao.tipo} | Valor: ${promocao.valorDesconto}`);
                console.log(`   Status: ${promocao.ativa ? 'Ativa' : 'Inativa'}`);
                console.log(`   Período: ${promocao.dataInicio.toLocaleDateString('pt-BR')} a ${promocao.dataFim.toLocaleDateString('pt-BR')}`);
                console.log('');
            });
            console.log(`📊 Total de promoções: ${promocoes.length}`);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private buscarPromocao(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🔍 BUSCAR PROMOÇÃO                        ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID da promoção: ');
        const promocao = this.promocaoService.buscarPromocaoPorId(id);
        
        if (promocao) {
            console.log('\n✅ Promoção encontrada:');
            console.log(`ID: ${promocao.id}`);
            console.log(`Nome: ${promocao.nome}`);
            console.log(`Descrição: ${promocao.descricao}`);
            console.log(`Tipo: ${promocao.tipo}`);
            console.log(`Valor: ${promocao.valorDesconto}`);
            console.log(`Status: ${promocao.ativa ? 'Ativa' : 'Inativa'}`);
            console.log(`Data de Início: ${promocao.dataInicio.toLocaleDateString('pt-BR')}`);
            console.log(`Data de Fim: ${promocao.dataFim.toLocaleDateString('pt-BR')}`);
        } else {
            console.log('\n❌ Promoção não encontrada.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private atualizarPromocao(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ✏️  ATUALIZAR PROMOÇÃO                    ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID da promoção: ');
        const promocao = this.promocaoService.buscarPromocaoPorId(id);
        
        if (promocao) {
            console.log(`\nPromoção atual: ${promocao.nome}`);
            
            const nome = readline.question('Novo nome (ou Enter para manter): ') || promocao.nome;
            const descricao = readline.question('Nova descrição (ou Enter para manter): ') || promocao.descricao;
            const valorDesconto = readline.questionFloat('Novo valor (ou Enter para manter): ') || promocao.valorDesconto;
            const ativaResposta = readline.keyInYN('Promoção ativa? (Y/N): ');
            const ativa = ativaResposta === true ? true : ativaResposta === false ? false : promocao.ativa;
            
            const sucesso = this.promocaoService.atualizarPromocao(id, {
                nome, descricao, valorDesconto, ativa
            });
            
            if (sucesso) {
                console.log('\n✅ Promoção atualizada com sucesso!');
            } else {
                console.log('\n❌ Erro ao atualizar promoção.');
            }
        } else {
            console.log('\n❌ Promoção não encontrada.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private excluirPromocao(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🗑️  EXCLUIR PROMOÇÃO                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const id = readline.questionInt('Digite o ID da promoção: ');
        const promocao = this.promocaoService.buscarPromocaoPorId(id);
        
        if (promocao) {
            console.log(`\nPromoção: ${promocao.nome}`);
            const confirmacao = readline.keyInYN('Deseja realmente excluir esta promoção?');
            
            if (confirmacao) {
                const sucesso = this.promocaoService.excluirPromocao(id);
                if (sucesso) {
                    console.log('\n✅ Promoção excluída com sucesso!');
                } else {
                    console.log('\n❌ Erro ao excluir promoção.');
                }
            } else {
                console.log('\n❌ Operação cancelada.');
            }
        } else {
            console.log('\n❌ Promoção não encontrada.');
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }

    private aplicarPromocao(): void {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🎯 APLICAR PROMOÇÃO                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        const promocoes = this.promocaoService.listarPromocoes().filter(p => p.ativa);
        
        if (promocoes.length === 0) {
            console.log('📭 Nenhuma promoção ativa disponível.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        
        console.log('Promoções ativas disponíveis:');
        promocoes.forEach(promocao => {
            console.log(`ID: ${promocao.id} | ${promocao.nome} | ${promocao.tipo} | Valor: ${promocao.valorDesconto}`);
        });
        
        const promocaoId = readline.questionInt('\nDigite o ID da promoção: ');
        const promocao = this.promocaoService.buscarPromocaoPorId(promocaoId);
        
        if (!promocao || !promocao.ativa) {
            console.log('❌ Promoção não encontrada ou inativa.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        
        const pedidoId = readline.questionInt('Digite o ID do pedido: ');
        const pedido = this.gerenciadorPedidos.buscarPedidoPorId(pedidoId);
        
        if (!pedido) {
            console.log('❌ Pedido não encontrado.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        
        try {
            const valorDesconto = this.promocaoService.calcularDesconto(promocao, pedido);
            console.log(`\n✅ Promoção aplicada com sucesso!`);
            console.log(`Valor do desconto: R$ ${valorDesconto.toFixed(2)}`);
            console.log(`Total original: R$ ${pedido.valorTotal.toFixed(2)}`);
            console.log(`Total com desconto: R$ ${(pedido.valorTotal - valorDesconto).toFixed(2)}`);
        } catch (error) {
            console.log('\n❌ Erro ao aplicar promoção:', error);
        }
        
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    }
}

// Executar o sistema
const sistema = new SistemaPizzaria();
sistema.executar();
