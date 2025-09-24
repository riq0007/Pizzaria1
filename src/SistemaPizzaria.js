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
exports.SistemaPizzaria = void 0;
var readline = require("readline-sync");
var Cliente_1 = require("./models/Cliente");
var Produto_1 = require("./models/Produto");
var Pedido_1 = require("./models/Pedido");
var RelatorioService_1 = require("./services/RelatorioService");
var ComprovanteService_1 = require("./services/ComprovanteService");
var PromocaoService_1 = require("./services/PromocaoService");
var SistemaPizzaria = /** @class */ (function () {
    function SistemaPizzaria() {
        this.gerenciadorClientes = new Cliente_1.GerenciadorClientes();
        this.gerenciadorProdutos = new Produto_1.GerenciadorProdutos();
        this.gerenciadorPedidos = new Pedido_1.GerenciadorPedidos();
        this.comprovanteService = new ComprovanteService_1.ComprovanteService();
        this.promocaoService = new PromocaoService_1.PromocaoService();
        this.relatorioService = new RelatorioService_1.RelatorioService([], []);
        this.inicializarDados();
    }
    SistemaPizzaria.prototype.inicializarDados = function () {
        // Criar produtos padrão
        this.criarProdutosPadrao();
        // Criar promoções padrão
        this.promocaoService.criarPromocoesPadrao();
    };
    SistemaPizzaria.prototype.criarProdutosPadrao = function () {
        // Pizzas
        this.gerenciadorProdutos.adicionarProduto({
            nome: 'Pizza Margherita',
            descricao: 'Molho de tomate, mussarela, manjericão fresco',
            preco: 35.90,
            categoria: Produto_1.CategoriaProduto.PIZZA,
            estoque: 50,
            ingredientes: ['Molho de tomate', 'Mussarela', 'Manjericão'],
            tamanho: 'Grande',
            calorias: 280
        });
        this.gerenciadorProdutos.adicionarProduto({
            nome: 'Pizza Portuguesa',
            descricao: 'Presunto, ovos, cebola, azeitona, mussarela',
            preco: 42.90,
            categoria: Produto_1.CategoriaProduto.PIZZA,
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
            categoria: Produto_1.CategoriaProduto.BEBIDA,
            estoque: 100
        });
        this.gerenciadorProdutos.adicionarProduto({
            nome: 'Suco de Laranja',
            descricao: 'Suco natural de laranja 500ml',
            preco: 6.50,
            categoria: Produto_1.CategoriaProduto.BEBIDA,
            estoque: 50
        });
        // Sobremesas
        this.gerenciadorProdutos.adicionarProduto({
            nome: 'Pudim de Leite',
            descricao: 'Pudim caseiro com calda de caramelo',
            preco: 12.90,
            categoria: Produto_1.CategoriaProduto.SOBREMESA,
            estoque: 20,
            calorias: 180
        });
    };
    SistemaPizzaria.prototype.executar = function () {
        var executando = true;
        while (executando) {
            this.exibirMenuPrincipal();
            var opcao = readline.questionInt('Escolha uma opção: ') || 0;
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
    };
    SistemaPizzaria.prototype.exibirMenuPrincipal = function () {
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
    };
    SistemaPizzaria.prototype.menuClientes = function () {
        var executando = true;
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
            var opcao = readline.questionInt('Escolha uma opção: ') || 0;
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
    };
    SistemaPizzaria.prototype.cadastrarCliente = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ➕ CADASTRAR CLIENTE                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var nome = readline.question('Nome completo: ');
        var email = readline.question('Email: ');
        var telefone = readline.question('Telefone: ');
        var endereco = readline.question('Endereço: ');
        try {
            var cliente = this.gerenciadorClientes.adicionarCliente({
                nome: nome,
                email: email,
                telefone: telefone,
                endereco: endereco
            });
            console.log('\n✅ Cliente cadastrado com sucesso!');
            console.log("ID: ".concat(cliente.id, " | Nome: ").concat(cliente.nome));
        }
        catch (error) {
            console.log('\n❌ Erro ao cadastrar cliente:', error);
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.listarClientes = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📋 LISTAR CLIENTES                        ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var clientes = this.gerenciadorClientes.listarClientes();
        if (clientes.length === 0) {
            console.log('📭 Nenhum cliente cadastrado.');
        }
        else {
            clientes.forEach(function (cliente) {
                console.log("ID: ".concat(cliente.id, " | Nome: ").concat(cliente.nome, " | Email: ").concat(cliente.email, " | Telefone: ").concat(cliente.telefone));
            });
            console.log("\n\uD83D\uDCCA Total de clientes: ".concat(clientes.length));
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.buscarCliente = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🔍 BUSCAR CLIENTE                         ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID do cliente: ');
        var cliente = this.gerenciadorClientes.buscarClientePorId(id);
        if (cliente) {
            console.log('\n✅ Cliente encontrado:');
            console.log("ID: ".concat(cliente.id));
            console.log("Nome: ".concat(cliente.nome));
            console.log("Email: ".concat(cliente.email));
            console.log("Telefone: ".concat(cliente.telefone));
            console.log("Endere\u00E7o: ".concat(cliente.endereco));
            console.log("Data de Cadastro: ".concat(cliente.dataCadastro.toLocaleDateString('pt-BR')));
        }
        else {
            console.log('\n❌ Cliente não encontrado.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.atualizarCliente = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ✏️  ATUALIZAR CLIENTE                     ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID do cliente: ');
        var cliente = this.gerenciadorClientes.buscarClientePorId(id);
        if (cliente) {
            console.log("\nCliente atual: ".concat(cliente.nome, " (").concat(cliente.email, ")"));
            var nome = readline.question('Novo nome (ou Enter para manter): ') || cliente.nome;
            var email = readline.question('Novo email (ou Enter para manter): ') || cliente.email;
            var telefone = readline.question('Novo telefone (ou Enter para manter): ') || cliente.telefone;
            var endereco = readline.question('Novo endereço (ou Enter para manter): ') || cliente.endereco;
            var sucesso = this.gerenciadorClientes.atualizarCliente(id, {
                nome: nome,
                email: email,
                telefone: telefone,
                endereco: endereco
            });
            if (sucesso) {
                console.log('\n✅ Cliente atualizado com sucesso!');
            }
            else {
                console.log('\n❌ Erro ao atualizar cliente.');
            }
        }
        else {
            console.log('\n❌ Cliente não encontrado.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.excluirCliente = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🗑️  EXCLUIR CLIENTE                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID do cliente: ');
        var cliente = this.gerenciadorClientes.buscarClientePorId(id);
        if (cliente) {
            console.log("\nCliente: ".concat(cliente.nome, " (").concat(cliente.email, ")"));
            var confirmacao = readline.keyInYN('Deseja realmente excluir este cliente?');
            if (confirmacao) {
                var sucesso = this.gerenciadorClientes.excluirCliente(id);
                if (sucesso) {
                    console.log('\n✅ Cliente excluído com sucesso!');
                }
                else {
                    console.log('\n❌ Erro ao excluir cliente.');
                }
            }
            else {
                console.log('\n❌ Operação cancelada.');
            }
        }
        else {
            console.log('\n❌ Cliente não encontrado.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    // Métodos para produtos, pedidos, relatórios e promoções serão implementados de forma similar
    // Por brevidade, vou criar versões simplificadas dos outros menus
    SistemaPizzaria.prototype.menuProdutos = function () {
        var executando = true;
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
            var opcao = readline.questionInt('Escolha uma opção: ') || 0;
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
    };
    SistemaPizzaria.prototype.menuPedidos = function () {
        var executando = true;
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
            var opcao = readline.questionInt('Escolha uma opção: ') || 0;
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
    };
    SistemaPizzaria.prototype.menuRelatorios = function () {
        var executando = true;
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
            var opcao = readline.questionInt('Escolha uma opção: ') || 0;
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
    };
    SistemaPizzaria.prototype.menuPromocoes = function () {
        var executando = true;
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
            var opcao = readline.questionInt('Escolha uma opção: ') || 0;
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
    };
    // Métodos para gerenciar produtos
    SistemaPizzaria.prototype.cadastrarProduto = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ➕ CADASTRAR PRODUTO                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var nome = readline.question('Nome do produto: ');
        var descricao = readline.question('Descrição: ');
        var preco = readline.questionFloat('Preço: R$ ');
        var categoria = this.selecionarCategoria();
        var estoque = readline.questionInt('Quantidade em estoque: ') || 0;
        var dadosProduto = {
            nome: nome,
            descricao: descricao,
            preco: preco,
            categoria: categoria,
            estoque: estoque
        };
        // Dados específicos para pizzas
        if (categoria === Produto_1.CategoriaProduto.PIZZA) {
            var ingredientes = readline.question('Ingredientes (separados por vírgula): ').split(',').map(function (i) { return i.trim(); });
            var tamanho = readline.question('Tamanho (Pequena/Média/Grande): ');
            var calorias = readline.questionInt('Calorias: ') || 0;
            dadosProduto = __assign(__assign({}, dadosProduto), { ingredientes: ingredientes, tamanho: tamanho, calorias: calorias });
        }
        // Dados específicos para sobremesas
        if (categoria === Produto_1.CategoriaProduto.SOBREMESA) {
            var calorias = readline.questionInt('Calorias: ') || 0;
            dadosProduto = __assign(__assign({}, dadosProduto), { calorias: calorias });
        }
        try {
            var produto = this.gerenciadorProdutos.adicionarProduto(dadosProduto);
            console.log('\n✅ Produto cadastrado com sucesso!');
            console.log("ID: ".concat(produto.id, " | Nome: ").concat(produto.nome, " | Pre\u00E7o: R$ ").concat(produto.preco.toFixed(2)));
        }
        catch (error) {
            console.log('\n❌ Erro ao cadastrar produto:', error);
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.selecionarCategoria = function () {
        console.log('\nCategorias disponíveis:');
        console.log('1. Pizza');
        console.log('2. Bebida');
        console.log('3. Sobremesa');
        var opcao = readline.questionInt('Escolha uma categoria: ') || 1;
        switch (opcao) {
            case 1: return Produto_1.CategoriaProduto.PIZZA;
            case 2: return Produto_1.CategoriaProduto.BEBIDA;
            case 3: return Produto_1.CategoriaProduto.SOBREMESA;
            default: return Produto_1.CategoriaProduto.PIZZA;
        }
    };
    SistemaPizzaria.prototype.listarProdutos = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📋 LISTAR PRODUTOS                        ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var produtos = this.gerenciadorProdutos.listarProdutos();
        if (produtos.length === 0) {
            console.log('📭 Nenhum produto cadastrado.');
        }
        else {
            produtos.forEach(function (produto) {
                console.log("ID: ".concat(produto.id, " | ").concat(produto.nome, " | R$ ").concat(produto.preco.toFixed(2), " | Estoque: ").concat(produto.estoque));
                console.log("   Categoria: ".concat(produto.categoria, " | Status: ").concat(produto.status));
                if (produto.descricao) {
                    console.log("   Descri\u00E7\u00E3o: ".concat(produto.descricao));
                }
                console.log('');
            });
            console.log("\uD83D\uDCCA Total de produtos: ".concat(produtos.length));
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.buscarProduto = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🔍 BUSCAR PRODUTO                         ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID do produto: ');
        var produto = this.gerenciadorProdutos.buscarProdutoPorId(id);
        if (produto) {
            console.log('\n✅ Produto encontrado:');
            console.log("ID: ".concat(produto.id));
            console.log("Nome: ".concat(produto.nome));
            console.log("Descri\u00E7\u00E3o: ".concat(produto.descricao));
            console.log("Pre\u00E7o: R$ ".concat(produto.preco.toFixed(2)));
            console.log("Categoria: ".concat(produto.categoria));
            console.log("Estoque: ".concat(produto.estoque));
            console.log("Status: ".concat(produto.status));
            if (produto.ingredientes && produto.ingredientes.length > 0) {
                console.log("Ingredientes: ".concat(produto.ingredientes.join(', ')));
            }
            if (produto.tamanho) {
                console.log("Tamanho: ".concat(produto.tamanho));
            }
            if (produto.calorias) {
                console.log("Calorias: ".concat(produto.calorias));
            }
        }
        else {
            console.log('\n❌ Produto não encontrado.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.atualizarProduto = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ✏️  ATUALIZAR PRODUTO                     ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID do produto: ');
        var produto = this.gerenciadorProdutos.buscarProdutoPorId(id);
        if (produto) {
            console.log("\nProduto atual: ".concat(produto.nome, " (R$ ").concat(produto.preco.toFixed(2), ")"));
            var nome = readline.question('Novo nome (ou Enter para manter): ') || produto.nome;
            var descricao = readline.question('Nova descrição (ou Enter para manter): ') || produto.descricao;
            var preco = readline.questionFloat('Novo preço (ou Enter para manter): ') || produto.preco;
            var estoque = readline.questionInt('Nova quantidade em estoque (ou Enter para manter): ') || produto.estoque;
            var sucesso = this.gerenciadorProdutos.atualizarProduto(id, {
                nome: nome,
                descricao: descricao,
                preco: preco,
                estoque: estoque
            });
            if (sucesso) {
                console.log('\n✅ Produto atualizado com sucesso!');
            }
            else {
                console.log('\n❌ Erro ao atualizar produto.');
            }
        }
        else {
            console.log('\n❌ Produto não encontrado.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.excluirProduto = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🗑️  EXCLUIR PRODUTO                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID do produto: ');
        var produto = this.gerenciadorProdutos.buscarProdutoPorId(id);
        if (produto) {
            console.log("\nProduto: ".concat(produto.nome, " (R$ ").concat(produto.preco.toFixed(2), ")"));
            var confirmacao = readline.keyInYN('Deseja realmente excluir este produto?');
            if (confirmacao) {
                var sucesso = this.gerenciadorProdutos.excluirProduto(id);
                if (sucesso) {
                    console.log('\n✅ Produto excluído com sucesso!');
                }
                else {
                    console.log('\n❌ Erro ao excluir produto.');
                }
            }
            else {
                console.log('\n❌ Operação cancelada.');
            }
        }
        else {
            console.log('\n❌ Produto não encontrado.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.relatorioEstoque = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📊 RELATÓRIO DE ESTOQUE                   ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var produtos = this.gerenciadorProdutos.listarProdutos();
        if (produtos.length === 0) {
            console.log('📭 Nenhum produto cadastrado.');
        }
        else {
            console.log('📊 RELATÓRIO DE ESTOQUE\n');
            // Produtos com estoque baixo
            var estoqueBaixo = produtos.filter(function (p) { return p.estoque < 10; });
            if (estoqueBaixo.length > 0) {
                console.log('⚠️  PRODUTOS COM ESTOQUE BAIXO (< 10 unidades):');
                estoqueBaixo.forEach(function (produto) {
                    console.log("   ".concat(produto.nome, ": ").concat(produto.estoque, " unidades"));
                });
                console.log('');
            }
            // Produtos sem estoque
            var semEstoque = produtos.filter(function (p) { return p.estoque === 0; });
            if (semEstoque.length > 0) {
                console.log('❌ PRODUTOS SEM ESTOQUE:');
                semEstoque.forEach(function (produto) {
                    console.log("   ".concat(produto.nome, ": ").concat(produto.estoque, " unidades"));
                });
                console.log('');
            }
            // Resumo por categoria
            var porCategoria = produtos.reduce(function (acc, produto) {
                if (!acc[produto.categoria]) {
                    acc[produto.categoria] = { total: 0, valor: 0 };
                }
                var categoria = acc[produto.categoria];
                if (categoria) {
                    categoria.total += produto.estoque;
                    categoria.valor += produto.preco * produto.estoque;
                }
                return acc;
            }, {});
            console.log('📈 RESUMO POR CATEGORIA:');
            Object.entries(porCategoria).forEach(function (_a) {
                var categoria = _a[0], dados = _a[1];
                console.log("   ".concat(categoria, ": ").concat(dados.total, " unidades | Valor total: R$ ").concat(dados.valor.toFixed(2)));
            });
            console.log("\n\uD83D\uDCCA Total de produtos: ".concat(produtos.length));
            console.log("\uD83D\uDCE6 Total em estoque: ".concat(produtos.reduce(function (acc, p) { return acc + p.estoque; }, 0), " unidades"));
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    // Métodos para gerenciar pedidos
    SistemaPizzaria.prototype.criarPedido = function () {
        var _this = this;
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ➕ CRIAR NOVO PEDIDO                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        // Selecionar cliente
        var clientes = this.gerenciadorClientes.listarClientes();
        if (clientes.length === 0) {
            console.log('❌ Nenhum cliente cadastrado. Cadastre um cliente primeiro.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        console.log('Clientes disponíveis:');
        clientes.forEach(function (cliente) {
            console.log("ID: ".concat(cliente.id, " | ").concat(cliente.nome, " | ").concat(cliente.telefone));
        });
        var clienteId = readline.questionInt('\nDigite o ID do cliente: ');
        var cliente = this.gerenciadorClientes.buscarClientePorId(clienteId);
        if (!cliente) {
            console.log('❌ Cliente não encontrado.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        // Selecionar produtos
        var itens = [];
        var adicionandoItens = true;
        while (adicionandoItens) {
            var produtos = this.gerenciadorProdutos.listarProdutos();
            if (produtos.length === 0) {
                console.log('❌ Nenhum produto cadastrado.');
                break;
            }
            console.log('\nProdutos disponíveis:');
            produtos.forEach(function (produto) {
                console.log("ID: ".concat(produto.id, " | ").concat(produto.nome, " | R$ ").concat(produto.preco.toFixed(2), " | Estoque: ").concat(produto.estoque));
            });
            var produtoId = readline.questionInt('\nDigite o ID do produto (0 para finalizar): ');
            if (produtoId === 0) {
                adicionandoItens = false;
                break;
            }
            var produto = this.gerenciadorProdutos.buscarProdutoPorId(produtoId);
            if (!produto) {
                console.log('❌ Produto não encontrado.');
                continue;
            }
            var quantidade = readline.questionInt('Quantidade: ') || 1;
            if (quantidade > produto.estoque) {
                console.log("\u274C Estoque insuficiente. Dispon\u00EDvel: ".concat(produto.estoque));
                continue;
            }
            itens.push({
                produto: produto,
                quantidade: quantidade,
                precoUnitario: produto.preco
            });
            console.log("\u2705 ".concat(produto.nome, " adicionado ao pedido!"));
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
        var formaPagamentoOpcao = readline.questionInt('Escolha a forma de pagamento: ') || 1;
        var formaPagamento;
        switch (formaPagamentoOpcao) {
            case 1:
                formaPagamento = Pedido_1.FormaPagamento.DINHEIRO;
                break;
            case 2:
                formaPagamento = Pedido_1.FormaPagamento.CARTAO_DEBITO;
                break;
            case 3:
                formaPagamento = Pedido_1.FormaPagamento.CARTAO_CREDITO;
                break;
            case 4:
                formaPagamento = Pedido_1.FormaPagamento.PIX;
                break;
            default: formaPagamento = Pedido_1.FormaPagamento.DINHEIRO;
        }
        // Observações
        var observacoes = readline.question('Observações (opcional): ') || '';
        try {
            var pedido = this.gerenciadorPedidos.criarPedido({
                cliente: cliente,
                itens: itens,
                status: Pedido_1.StatusPedido.PENDENTE,
                formaPagamento: formaPagamento,
                taxaEntrega: 0,
                desconto: 0,
                observacoes: observacoes
            });
            console.log('\n✅ Pedido criado com sucesso!');
            console.log("ID do Pedido: ".concat(pedido.id));
            console.log("Cliente: ".concat(pedido.cliente.nome));
            console.log("Total: R$ ".concat(pedido.valorTotal.toFixed(2)));
            console.log("Status: ".concat(pedido.status));
            // Atualizar estoque
            itens.forEach(function (item) {
                _this.gerenciadorProdutos.atualizarEstoque(item.produto.id, -item.quantidade);
            });
        }
        catch (error) {
            console.log('\n❌ Erro ao criar pedido:', error);
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.listarPedidos = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📋 LISTAR PEDIDOS                         ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var pedidos = this.gerenciadorPedidos.listarPedidos();
        if (pedidos.length === 0) {
            console.log('📭 Nenhum pedido cadastrado.');
        }
        else {
            pedidos.forEach(function (pedido) {
                console.log("ID: ".concat(pedido.id, " | Cliente: ").concat(pedido.cliente.nome, " | Total: R$ ").concat(pedido.valorTotal.toFixed(2)));
                console.log("   Status: ".concat(pedido.status, " | Data: ").concat(pedido.dataPedido.toLocaleDateString('pt-BR')));
                console.log("   Forma de Pagamento: ".concat(pedido.formaPagamento));
                if (pedido.observacoes) {
                    console.log("   Observa\u00E7\u00F5es: ".concat(pedido.observacoes));
                }
                console.log('');
            });
            console.log("\uD83D\uDCCA Total de pedidos: ".concat(pedidos.length));
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.buscarPedido = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🔍 BUSCAR PEDIDO                          ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID do pedido: ');
        var pedido = this.gerenciadorPedidos.buscarPedidoPorId(id);
        if (pedido) {
            console.log('\n✅ Pedido encontrado:');
            console.log("ID: ".concat(pedido.id));
            console.log("Cliente: ".concat(pedido.cliente.nome, " (").concat(pedido.cliente.telefone, ")"));
            console.log("Data: ".concat(pedido.dataPedido.toLocaleString('pt-BR')));
            console.log("Status: ".concat(pedido.status));
            console.log("Forma de Pagamento: ".concat(pedido.formaPagamento));
            console.log("Total: R$ ".concat(pedido.valorTotal.toFixed(2)));
            if (pedido.observacoes) {
                console.log("Observa\u00E7\u00F5es: ".concat(pedido.observacoes));
            }
            console.log('\nItens do pedido:');
            pedido.itens.forEach(function (item, index) {
                console.log("   ".concat(index + 1, ". ").concat(item.produto.nome, " x").concat(item.quantidade, " = R$ ").concat((item.precoUnitario * item.quantidade).toFixed(2)));
            });
            if (pedido.dataEntrega) {
                console.log("Data de Entrega: ".concat(pedido.dataEntrega.toLocaleString('pt-BR')));
            }
        }
        else {
            console.log('\n❌ Pedido não encontrado.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.atualizarStatusPedido = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ✏️  ATUALIZAR STATUS DO PEDIDO            ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID do pedido: ');
        var pedido = this.gerenciadorPedidos.buscarPedidoPorId(id);
        if (pedido) {
            console.log("\nPedido atual: ".concat(pedido.id, " | Cliente: ").concat(pedido.cliente.nome, " | Status: ").concat(pedido.status));
            console.log('\nStatus disponíveis:');
            console.log('1. Pendente');
            console.log('2. Confirmado');
            console.log('3. Em Preparo');
            console.log('4. Pronto para Entrega');
            console.log('5. Em Trânsito');
            console.log('6. Entregue');
            console.log('7. Cancelado');
            var novoStatusOpcao = readline.questionInt('Escolha o novo status: ') || 1;
            var novoStatus = void 0;
            switch (novoStatusOpcao) {
                case 1:
                    novoStatus = Pedido_1.StatusPedido.PENDENTE;
                    break;
                case 2:
                    novoStatus = Pedido_1.StatusPedido.CONFIRMADO;
                    break;
                case 3:
                    novoStatus = Pedido_1.StatusPedido.EM_PREPARO;
                    break;
                case 4:
                    novoStatus = Pedido_1.StatusPedido.PRONTO_PARA_ENTREGA;
                    break;
                case 5:
                    novoStatus = Pedido_1.StatusPedido.EM_TRANSITO;
                    break;
                case 6:
                    novoStatus = Pedido_1.StatusPedido.ENTREGUE;
                    break;
                case 7:
                    novoStatus = Pedido_1.StatusPedido.CANCELADO;
                    break;
                default: novoStatus = Pedido_1.StatusPedido.PENDENTE;
            }
            var sucesso = this.gerenciadorPedidos.atualizarStatusPedido(id, novoStatus);
            if (sucesso) {
                console.log('\n✅ Status do pedido atualizado com sucesso!');
                console.log("Novo status: ".concat(novoStatus));
            }
            else {
                console.log('\n❌ Erro ao atualizar status do pedido.');
            }
        }
        else {
            console.log('\n❌ Pedido não encontrado.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.gerarComprovante = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🧾 GERAR COMPROVANTE                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID do pedido: ');
        var pedido = this.gerenciadorPedidos.buscarPedidoPorId(id);
        if (pedido) {
            var comprovante = this.comprovanteService.gerarComprovante(pedido);
            console.log('\n' + comprovante);
        }
        else {
            console.log('\n❌ Pedido não encontrado.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.relatorioPedidos = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📊 RELATÓRIO DE PEDIDOS                   ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var pedidos = this.gerenciadorPedidos.listarPedidos();
        if (pedidos.length === 0) {
            console.log('📭 Nenhum pedido cadastrado.');
        }
        else {
            console.log('📊 RELATÓRIO DE PEDIDOS\n');
            // Resumo por status
            var porStatus = pedidos.reduce(function (acc, pedido) {
                if (!acc[pedido.status]) {
                    acc[pedido.status] = { quantidade: 0, valor: 0 };
                }
                var status = acc[pedido.status];
                if (status) {
                    status.quantidade++;
                    status.valor += pedido.valorTotal;
                }
                return acc;
            }, {});
            console.log('📈 RESUMO POR STATUS:');
            Object.entries(porStatus).forEach(function (_a) {
                var status = _a[0], dados = _a[1];
                console.log("   ".concat(status, ": ").concat(dados.quantidade, " pedidos | R$ ").concat(dados.valor.toFixed(2)));
            });
            // Pedidos do dia
            var hoje_1 = new Date();
            var pedidosHoje = pedidos.filter(function (p) {
                return p.dataPedido.toDateString() === hoje_1.toDateString();
            });
            console.log("\n\uD83D\uDCC5 PEDIDOS DE HOJE: ".concat(pedidosHoje.length));
            if (pedidosHoje.length > 0) {
                var totalHoje = pedidosHoje.reduce(function (acc, p) { return acc + p.valorTotal; }, 0);
                console.log("   Total vendido hoje: R$ ".concat(totalHoje.toFixed(2)));
            }
            // Top clientes
            var clientesFrequentes = pedidos.reduce(function (acc, pedido) {
                var clienteId = pedido.cliente.id;
                if (!acc[clienteId]) {
                    acc[clienteId] = { nome: pedido.cliente.nome, pedidos: 0, total: 0 };
                }
                acc[clienteId].pedidos++;
                acc[clienteId].total += pedido.valorTotal;
                return acc;
            }, {});
            var topClientes = Object.values(clientesFrequentes)
                .sort(function (a, b) { return b.total - a.total; })
                .slice(0, 5);
            if (topClientes.length > 0) {
                console.log('\n🏆 TOP 5 CLIENTES:');
                topClientes.forEach(function (cliente, index) {
                    console.log("   ".concat(index + 1, ". ").concat(cliente.nome, ": ").concat(cliente.pedidos, " pedidos | R$ ").concat(cliente.total.toFixed(2)));
                });
            }
            console.log("\n\uD83D\uDCCA Total de pedidos: ".concat(pedidos.length));
            console.log("\uD83D\uDCB0 Faturamento total: R$ ".concat(pedidos.reduce(function (acc, p) { return acc + p.valorTotal; }, 0).toFixed(2)));
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    // Métodos para relatórios
    SistemaPizzaria.prototype.relatorioDiario = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📅 RELATÓRIO DIÁRIO                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var hoje = new Date();
        var pedidos = this.gerenciadorPedidos.listarPedidos();
        var pedidosHoje = pedidos.filter(function (p) {
            return p.dataPedido.toDateString() === hoje.toDateString();
        });
        if (pedidosHoje.length === 0) {
            console.log('📭 Nenhum pedido realizado hoje.');
        }
        else {
            var totalVendas = pedidosHoje.reduce(function (acc, p) { return acc + p.valorTotal; }, 0);
            var pedidosEntregues = pedidosHoje.filter(function (p) { return p.status === Pedido_1.StatusPedido.ENTREGUE; });
            console.log("\uD83D\uDCCA RESUMO DO DIA - ".concat(hoje.toLocaleDateString('pt-BR')));
            console.log("   Total de pedidos: ".concat(pedidosHoje.length));
            console.log("   Pedidos entregues: ".concat(pedidosEntregues.length));
            console.log("   Faturamento: R$ ".concat(totalVendas.toFixed(2)));
            console.log('\n📋 PEDIDOS DE HOJE:');
            pedidosHoje.forEach(function (pedido) {
                console.log("   ID: ".concat(pedido.id, " | Cliente: ").concat(pedido.cliente.nome, " | Total: R$ ").concat(pedido.valorTotal.toFixed(2), " | Status: ").concat(pedido.status));
            });
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.relatorioMensal = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📆 RELATÓRIO MENSAL                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var agora = new Date();
        var mesAtual = agora.getMonth();
        var anoAtual = agora.getFullYear();
        var pedidos = this.gerenciadorPedidos.listarPedidos();
        var pedidosMes = pedidos.filter(function (p) {
            return p.dataPedido.getMonth() === mesAtual && p.dataPedido.getFullYear() === anoAtual;
        });
        if (pedidosMes.length === 0) {
            console.log('📭 Nenhum pedido realizado este mês.');
        }
        else {
            var totalVendas = pedidosMes.reduce(function (acc, p) { return acc + p.valorTotal; }, 0);
            var pedidosEntregues = pedidosMes.filter(function (p) { return p.status === Pedido_1.StatusPedido.ENTREGUE; });
            console.log("\uD83D\uDCCA RESUMO DO M\u00CAS - ".concat(agora.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })));
            console.log("   Total de pedidos: ".concat(pedidosMes.length));
            console.log("   Pedidos entregues: ".concat(pedidosEntregues.length));
            console.log("   Faturamento: R$ ".concat(totalVendas.toFixed(2)));
            // Vendas por dia
            var vendasPorDia = pedidosMes.reduce(function (acc, pedido) {
                var dia = pedido.dataPedido.getDate();
                if (!acc[dia]) {
                    acc[dia] = { pedidos: 0, valor: 0 };
                }
                acc[dia].pedidos++;
                acc[dia].valor += pedido.valorTotal;
                return acc;
            }, {});
            console.log('\n📈 VENDAS POR DIA:');
            Object.entries(vendasPorDia)
                .sort(function (_a, _b) {
                var a = _a[0];
                var b = _b[0];
                return parseInt(a) - parseInt(b);
            })
                .forEach(function (_a) {
                var dia = _a[0], dados = _a[1];
                console.log("   Dia ".concat(dia, ": ").concat(dados.pedidos, " pedidos | R$ ").concat(dados.valor.toFixed(2)));
            });
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.topProdutosVendidos = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🏆 TOP PRODUTOS MAIS VENDIDOS             ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var pedidos = this.gerenciadorPedidos.listarPedidos();
        var vendasPorProduto = new Map();
        pedidos.forEach(function (pedido) {
            pedido.itens.forEach(function (item) {
                var produtoId = item.produto.id;
                var atual = vendasPorProduto.get(produtoId) || {
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
        }
        else {
            var topProdutos = Array.from(vendasPorProduto.values())
                .sort(function (a, b) { return b.quantidade - a.quantidade; })
                .slice(0, 10);
            console.log('🏆 TOP 10 PRODUTOS MAIS VENDIDOS:\n');
            topProdutos.forEach(function (produto, index) {
                console.log("".concat(index + 1, ". ").concat(produto.nome));
                console.log("   Quantidade vendida: ".concat(produto.quantidade, " unidades"));
                console.log("   Faturamento: R$ ".concat(produto.valor.toFixed(2)));
                console.log('');
            });
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.analiseClientes = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    👥 ANÁLISE DE CLIENTES                    ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var clientes = this.gerenciadorClientes.listarClientes();
        var pedidos = this.gerenciadorPedidos.listarPedidos();
        if (clientes.length === 0) {
            console.log('📭 Nenhum cliente cadastrado.');
        }
        else {
            console.log("\uD83D\uDCCA AN\u00C1LISE DE CLIENTES\n");
            console.log("Total de clientes cadastrados: ".concat(clientes.length));
            console.log("Total de pedidos realizados: ".concat(pedidos.length));
            // Clientes com mais pedidos
            var clientesComPedidos = pedidos.reduce(function (acc, pedido) {
                var clienteId = pedido.cliente.id;
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
            }, {});
            var topClientes = Object.values(clientesComPedidos)
                .sort(function (a, b) { return b.valor - a.valor; })
                .slice(0, 5);
            if (topClientes.length > 0) {
                console.log('\n🏆 TOP 5 CLIENTES (POR FATURAMENTO):');
                topClientes.forEach(function (cliente, index) {
                    console.log("".concat(index + 1, ". ").concat(cliente.nome));
                    console.log("   Pedidos: ".concat(cliente.pedidos, " | Faturamento: R$ ").concat(cliente.valor.toFixed(2)));
                    console.log("   \u00DAltimo pedido: ".concat(cliente.ultimoPedido.toLocaleDateString('pt-BR')));
                    console.log('');
                });
            }
            // Clientes sem pedidos
            var clientesSemPedidos = clientes.filter(function (cliente) {
                return !pedidos.some(function (pedido) { return pedido.cliente.id === cliente.id; });
            });
            if (clientesSemPedidos.length > 0) {
                console.log("\n\uD83D\uDCED CLIENTES SEM PEDIDOS (".concat(clientesSemPedidos.length, "):"));
                clientesSemPedidos.forEach(function (cliente) {
                    console.log("   ".concat(cliente.nome, " (").concat(cliente.email, ")"));
                });
            }
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.faturamentoPeriodo = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    💰 FATURAMENTO POR PERÍODO                ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var pedidos = this.gerenciadorPedidos.listarPedidos();
        if (pedidos.length === 0) {
            console.log('📭 Nenhum pedido registrado.');
        }
        else {
            // Faturamento por mês
            var faturamentoPorMes = pedidos.reduce(function (acc, pedido) {
                var mes = pedido.dataPedido.getMonth() + 1;
                var ano = pedido.dataPedido.getFullYear();
                var chave = "".concat(mes, "/").concat(ano);
                if (!acc[chave]) {
                    acc[chave] = { pedidos: 0, valor: 0 };
                }
                acc[chave].pedidos++;
                acc[chave].valor += pedido.valorTotal;
                return acc;
            }, {});
            console.log('📈 FATURAMENTO POR MÊS:\n');
            Object.entries(faturamentoPorMes)
                .sort(function (_a, _b) {
                var a = _a[0];
                var b = _b[0];
                var _c = a.split('/').map(Number), mesA = _c[0], anoA = _c[1];
                var _d = b.split('/').map(Number), mesB = _d[0], anoB = _d[1];
                return (anoA || 0) - (anoB || 0) || (mesA || 0) - (mesB || 0);
            })
                .forEach(function (_a) {
                var mes = _a[0], dados = _a[1];
                console.log("".concat(mes, ": ").concat(dados.pedidos, " pedidos | R$ ").concat(dados.valor.toFixed(2)));
            });
            var totalFaturamento = pedidos.reduce(function (acc, p) { return acc + p.valorTotal; }, 0);
            console.log("\n\uD83D\uDCB0 FATURAMENTO TOTAL: R$ ".concat(totalFaturamento.toFixed(2)));
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.relatorioEstoqueCompleto = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📈 RELATÓRIO DE ESTOQUE COMPLETO          ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var produtos = this.gerenciadorProdutos.listarProdutos();
        if (produtos.length === 0) {
            console.log('📭 Nenhum produto cadastrado.');
        }
        else {
            console.log('📊 RELATÓRIO COMPLETO DE ESTOQUE\n');
            // Produtos por categoria
            var porCategoria = produtos.reduce(function (acc, produto) {
                if (!acc[produto.categoria]) {
                    acc[produto.categoria] = { produtos: 0, estoque: 0, valor: 0 };
                }
                var categoria = acc[produto.categoria];
                if (categoria) {
                    categoria.produtos++;
                    categoria.estoque += produto.estoque;
                    categoria.valor += produto.preco * produto.estoque;
                }
                return acc;
            }, {});
            console.log('📦 RESUMO POR CATEGORIA:');
            Object.entries(porCategoria).forEach(function (_a) {
                var categoria = _a[0], dados = _a[1];
                console.log("   ".concat(categoria, ": ").concat(dados.produtos, " produtos | ").concat(dados.estoque, " unidades | R$ ").concat(dados.valor.toFixed(2)));
            });
            // Produtos com estoque baixo
            var estoqueBaixo = produtos.filter(function (p) { return p.estoque < 10 && p.estoque > 0; });
            if (estoqueBaixo.length > 0) {
                console.log('\n⚠️  PRODUTOS COM ESTOQUE BAIXO:');
                estoqueBaixo.forEach(function (produto) {
                    console.log("   ".concat(produto.nome, ": ").concat(produto.estoque, " unidades"));
                });
            }
            // Produtos sem estoque
            var semEstoque = produtos.filter(function (p) { return p.estoque === 0; });
            if (semEstoque.length > 0) {
                console.log('\n❌ PRODUTOS SEM ESTOQUE:');
                semEstoque.forEach(function (produto) {
                    console.log("   ".concat(produto.nome, ": ").concat(produto.estoque, " unidades"));
                });
            }
            console.log("\n\uD83D\uDCCA Total de produtos: ".concat(produtos.length));
            console.log("\uD83D\uDCE6 Total em estoque: ".concat(produtos.reduce(function (acc, p) { return acc + p.estoque; }, 0), " unidades"));
            console.log("\uD83D\uDCB0 Valor total do estoque: R$ ".concat(produtos.reduce(function (acc, p) { return acc + (p.preco * p.estoque); }, 0).toFixed(2)));
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    // Métodos para promoções
    SistemaPizzaria.prototype.criarPromocao = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ➕ CRIAR NOVA PROMOÇÃO                    ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var nome = readline.question('Nome da promoção: ');
        var descricao = readline.question('Descrição: ');
        console.log('\nTipos de promoção:');
        console.log('1. Desconto Percentual');
        console.log('2. Desconto Fixo');
        console.log('3. Produto Grátis');
        var tipoOpcao = readline.questionInt('Escolha o tipo: ') || 1;
        var tipo;
        switch (tipoOpcao) {
            case 1:
                tipo = 'DESCONTO_PERCENTUAL';
                break;
            case 2:
                tipo = 'DESCONTO_FIXO';
                break;
            case 3:
                tipo = 'PRODUTO_GRATIS';
                break;
            default: tipo = 'DESCONTO_PERCENTUAL';
        }
        var valorDesconto = readline.questionFloat('Valor do desconto/produto: ');
        var dataInicio = new Date();
        var dataFim = new Date();
        dataFim.setDate(dataFim.getDate() + 30); // 30 dias por padrão
        var ativa = true;
        try {
            var promocao = this.promocaoService.criarPromocao({
                nome: nome,
                descricao: descricao,
                tipo: tipo,
                valorDesconto: valorDesconto,
                dataInicio: dataInicio,
                dataFim: dataFim,
                ativa: ativa
            });
            console.log('\n✅ Promoção criada com sucesso!');
            console.log("ID: ".concat(promocao.id, " | Nome: ").concat(promocao.nome));
        }
        catch (error) {
            console.log('\n❌ Erro ao criar promoção:', error);
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.listarPromocoes = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    📋 LISTAR PROMOÇÕES                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var promocoes = this.promocaoService.listarPromocoes();
        if (promocoes.length === 0) {
            console.log('📭 Nenhuma promoção cadastrada.');
        }
        else {
            promocoes.forEach(function (promocao) {
                console.log("ID: ".concat(promocao.id, " | ").concat(promocao.nome));
                console.log("   Tipo: ".concat(promocao.tipo, " | Valor: ").concat(promocao.valorDesconto));
                console.log("   Status: ".concat(promocao.ativa ? 'Ativa' : 'Inativa'));
                console.log("   Per\u00EDodo: ".concat(promocao.dataInicio.toLocaleDateString('pt-BR'), " a ").concat(promocao.dataFim.toLocaleDateString('pt-BR')));
                console.log('');
            });
            console.log("\uD83D\uDCCA Total de promo\u00E7\u00F5es: ".concat(promocoes.length));
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.buscarPromocao = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🔍 BUSCAR PROMOÇÃO                        ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID da promoção: ');
        var promocao = this.promocaoService.buscarPromocaoPorId(id);
        if (promocao) {
            console.log('\n✅ Promoção encontrada:');
            console.log("ID: ".concat(promocao.id));
            console.log("Nome: ".concat(promocao.nome));
            console.log("Descri\u00E7\u00E3o: ".concat(promocao.descricao));
            console.log("Tipo: ".concat(promocao.tipo));
            console.log("Valor: ".concat(promocao.valorDesconto));
            console.log("Status: ".concat(promocao.ativa ? 'Ativa' : 'Inativa'));
            console.log("Data de In\u00EDcio: ".concat(promocao.dataInicio.toLocaleDateString('pt-BR')));
            console.log("Data de Fim: ".concat(promocao.dataFim.toLocaleDateString('pt-BR')));
        }
        else {
            console.log('\n❌ Promoção não encontrada.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.atualizarPromocao = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    ✏️  ATUALIZAR PROMOÇÃO                    ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID da promoção: ');
        var promocao = this.promocaoService.buscarPromocaoPorId(id);
        if (promocao) {
            console.log("\nPromo\u00E7\u00E3o atual: ".concat(promocao.nome));
            var nome = readline.question('Novo nome (ou Enter para manter): ') || promocao.nome;
            var descricao = readline.question('Nova descrição (ou Enter para manter): ') || promocao.descricao;
            var valorDesconto = readline.questionFloat('Novo valor (ou Enter para manter): ') || promocao.valorDesconto;
            var ativaResposta = readline.keyInYN('Promoção ativa? (Y/N): ');
            var ativa = ativaResposta === true ? true : ativaResposta === false ? false : promocao.ativa;
            var sucesso = this.promocaoService.atualizarPromocao(id, {
                nome: nome,
                descricao: descricao,
                valorDesconto: valorDesconto,
                ativa: ativa
            });
            if (sucesso) {
                console.log('\n✅ Promoção atualizada com sucesso!');
            }
            else {
                console.log('\n❌ Erro ao atualizar promoção.');
            }
        }
        else {
            console.log('\n❌ Promoção não encontrada.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.excluirPromocao = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🗑️  EXCLUIR PROMOÇÃO                      ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var id = readline.questionInt('Digite o ID da promoção: ');
        var promocao = this.promocaoService.buscarPromocaoPorId(id);
        if (promocao) {
            console.log("\nPromo\u00E7\u00E3o: ".concat(promocao.nome));
            var confirmacao = readline.keyInYN('Deseja realmente excluir esta promoção?');
            if (confirmacao) {
                var sucesso = this.promocaoService.excluirPromocao(id);
                if (sucesso) {
                    console.log('\n✅ Promoção excluída com sucesso!');
                }
                else {
                    console.log('\n❌ Erro ao excluir promoção.');
                }
            }
            else {
                console.log('\n❌ Operação cancelada.');
            }
        }
        else {
            console.log('\n❌ Promoção não encontrada.');
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    SistemaPizzaria.prototype.aplicarPromocao = function () {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    🎯 APLICAR PROMOÇÃO                       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        var promocoes = this.promocaoService.listarPromocoes().filter(function (p) { return p.ativa; });
        if (promocoes.length === 0) {
            console.log('📭 Nenhuma promoção ativa disponível.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        console.log('Promoções ativas disponíveis:');
        promocoes.forEach(function (promocao) {
            console.log("ID: ".concat(promocao.id, " | ").concat(promocao.nome, " | ").concat(promocao.tipo, " | Valor: ").concat(promocao.valorDesconto));
        });
        var promocaoId = readline.questionInt('\nDigite o ID da promoção: ');
        var promocao = this.promocaoService.buscarPromocaoPorId(promocaoId);
        if (!promocao || !promocao.ativa) {
            console.log('❌ Promoção não encontrada ou inativa.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        var pedidoId = readline.questionInt('Digite o ID do pedido: ');
        var pedido = this.gerenciadorPedidos.buscarPedidoPorId(pedidoId);
        if (!pedido) {
            console.log('❌ Pedido não encontrado.');
            readline.keyInPause('\nPressione qualquer tecla para continuar...');
            return;
        }
        try {
            var valorDesconto = this.promocaoService.calcularDesconto(promocao, pedido);
            console.log("\n\u2705 Promo\u00E7\u00E3o aplicada com sucesso!");
            console.log("Valor do desconto: R$ ".concat(valorDesconto.toFixed(2)));
            console.log("Total original: R$ ".concat(pedido.valorTotal.toFixed(2)));
            console.log("Total com desconto: R$ ".concat((pedido.valorTotal - valorDesconto).toFixed(2)));
        }
        catch (error) {
            console.log('\n❌ Erro ao aplicar promoção:', error);
        }
        readline.keyInPause('\nPressione qualquer tecla para continuar...');
    };
    return SistemaPizzaria;
}());
exports.SistemaPizzaria = SistemaPizzaria;
// Executar o sistema
var sistema = new SistemaPizzaria();
sistema.executar();
