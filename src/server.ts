import express, { type Request, type Response } from 'express';
import cors from 'cors';
import path from 'node:path';
import { GerenciadorClientes } from './models/Cliente.js';
import { GerenciadorProdutos, CategoriaProduto, StatusProduto } from './models/Produto.js';
import { GerenciadorPedidos, StatusPedido, FormaPagamento } from './models/Pedido.js';
import { RelatorioService } from './services/RelatorioService.js';
import { PromocaoService } from './services/PromocaoService.js';
import { ComprovanteService } from './services/ComprovanteService.js';

const app = express();
const port = Number(process.env.APP_PORT ?? 3000);

app.use(cors());
app.use(express.json());

// Inicializar sistema
const gerenciadorClientes = new GerenciadorClientes();
const gerenciadorProdutos = new GerenciadorProdutos();
const gerenciadorPedidos = new GerenciadorPedidos();
const promocaoService = new PromocaoService();
const comprovanteService = new ComprovanteService();
let relatorioService = new RelatorioService([], []);

// Inicializar dados padrão
function inicializarDados() {
  // Produtos padrão
  gerenciadorProdutos.adicionarProduto({
    nome: 'Pizza Margherita',
    descricao: 'Molho de tomate, mussarela, manjericão fresco',
    preco: 35.90,
    categoria: CategoriaProduto.PIZZA,
    estoque: 50,
    ingredientes: ['Molho de tomate', 'Mussarela', 'Manjericão'],
    tamanho: 'Grande',
    calorias: 280
  });

  gerenciadorProdutos.adicionarProduto({
    nome: 'Pizza Portuguesa',
    descricao: 'Presunto, ovos, cebola, azeitona, mussarela',
    preco: 42.90,
    categoria: CategoriaProduto.PIZZA,
    estoque: 30,
    ingredientes: ['Presunto', 'Ovos', 'Cebola', 'Azeitona', 'Mussarela'],
    tamanho: 'Grande',
    calorias: 320
  });

  gerenciadorProdutos.adicionarProduto({
    nome: 'Coca-Cola 2L',
    descricao: 'Refrigerante Coca-Cola 2 litros',
    preco: 8.90,
    categoria: CategoriaProduto.BEBIDA,
    estoque: 100
  });

  promocaoService.criarPromocoesPadrao();
}

inicializarDados();

// Atualizar relatório service com dados atuais
function atualizarRelatorioService() {
  const pedidos = gerenciadorPedidos.listarPedidos();
  const produtos = gerenciadorProdutos.listarProdutos();
  // Recriar instância com dados atualizados
  relatorioService = new RelatorioService(pedidos, produtos);
}

// ========== API CLIENTES ==========
app.get('/api/clientes', (_req: Request, res: Response) => {
  res.json(gerenciadorClientes.listarClientes());
});

app.get('/api/clientes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cliente = gerenciadorClientes.buscarClientePorId(id);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ message: 'Cliente não encontrado' });
  }
});

app.post('/api/clientes', (req: Request, res: Response) => {
  try {
    const cliente = gerenciadorClientes.adicionarCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar cliente' });
  }
});

app.put('/api/clientes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sucesso = gerenciadorClientes.atualizarCliente(id, req.body);
  if (sucesso) {
    res.json({ message: 'Cliente atualizado com sucesso' });
  } else {
    res.status(404).json({ message: 'Cliente não encontrado' });
  }
});

app.delete('/api/clientes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sucesso = gerenciadorClientes.excluirCliente(id);
  if (sucesso) {
    res.json({ message: 'Cliente excluído com sucesso' });
  } else {
    res.status(404).json({ message: 'Cliente não encontrado' });
  }
});

// ========== API PRODUTOS ==========
app.get('/api/produtos', (req: Request, res: Response) => {
  const apenasAtivos = req.query.ativos === 'true';
  res.json(gerenciadorProdutos.listarProdutos(apenasAtivos));
});

app.get('/api/produtos/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const produto = gerenciadorProdutos.buscarProdutoPorId(id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

app.post('/api/produtos', (req: Request, res: Response) => {
  try {
    const produto = gerenciadorProdutos.adicionarProduto(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar produto' });
  }
});

app.put('/api/produtos/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sucesso = gerenciadorProdutos.atualizarProduto(id, req.body);
  if (sucesso) {
    res.json({ message: 'Produto atualizado com sucesso' });
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

app.delete('/api/produtos/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sucesso = gerenciadorProdutos.excluirProduto(id);
  if (sucesso) {
    res.json({ message: 'Produto excluído com sucesso' });
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// ========== API PEDIDOS ==========
app.get('/api/pedidos', (_req: Request, res: Response) => {
  res.json(gerenciadorPedidos.listarPedidos());
});

app.get('/api/pedidos/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pedido = gerenciadorPedidos.buscarPedidoPorId(id);
  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).json({ message: 'Pedido não encontrado' });
  }
});

app.post('/api/pedidos', (req: Request, res: Response) => {
  try {
    // Verificar estoque antes de criar pedido
    for (const item of req.body.itens) {
      const produto = gerenciadorProdutos.buscarProdutoPorId(item.produto.id);
      if (!produto) {
        return res.status(400).json({ message: `Produto ${item.produto.nome} não encontrado` });
      }
      if (produto.estoque < item.quantidade) {
        return res.status(400).json({ message: `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.estoque}` });
      }
    }
    
    // Reduzir estoque ao criar pedido
    for (const item of req.body.itens) {
      gerenciadorProdutos.atualizarEstoque(item.produto.id, -item.quantidade);
    }
    
    const pedido = gerenciadorPedidos.criarPedido(req.body);
    atualizarRelatorioService();
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar pedido' });
  }
});

app.put('/api/pedidos/:id/status', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pedido = gerenciadorPedidos.buscarPedidoPorId(id);
  
  if (!pedido) {
    return res.status(404).json({ message: 'Pedido não encontrado' });
  }
  
  // Validar se o status recebido é válido
  const statusRecebido = req.body.status as string;
  const statusValidos = Object.values(StatusPedido);
  if (!statusValidos.includes(statusRecebido as StatusPedido)) {
    return res.status(400).json({ message: `Status inválido. Status válidos: ${statusValidos.join(', ')}` });
  }
  
  const statusAnterior = pedido.status;
  const novoStatus = statusRecebido as StatusPedido;
  const sucesso = gerenciadorPedidos.atualizarStatusPedido(id, novoStatus);
  
  if (sucesso) {
    // Se mudou para ENTREGUE e não estava entregue antes, já foi reduzido na criação
    // Se mudou para CANCELADO e estava em preparo, devolver estoque
    if (novoStatus === StatusPedido.CANCELADO && statusAnterior !== StatusPedido.CANCELADO && statusAnterior !== StatusPedido.ENTREGUE) {
      // Devolver estoque ao cancelar
      for (const item of pedido.itens) {
        gerenciadorProdutos.atualizarEstoque(item.produto.id, item.quantidade);
      }
    }
    
    // Atualizar relatório após mudança de status
    atualizarRelatorioService();
    res.json({ message: 'Status atualizado com sucesso', status: novoStatus });
  } else {
    res.status(404).json({ message: 'Pedido não encontrado' });
  }
});

app.get('/api/pedidos/:id/comprovante', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pedido = gerenciadorPedidos.buscarPedidoPorId(id);
  if (pedido) {
    const comprovante = comprovanteService.gerarComprovante(pedido);
    res.json({ comprovante });
  } else {
    res.status(404).json({ message: 'Pedido não encontrado' });
  }
});

// ========== API RELATÓRIOS ==========
app.get('/api/relatorios/dashboard', (_req: Request, res: Response) => {
  atualizarRelatorioService();
  const pedidos = gerenciadorPedidos.listarPedidos();
  const clientes = gerenciadorClientes.listarClientes();
  const produtos = gerenciadorProdutos.listarProdutos(false); // Todos os produtos
  
  const hoje = new Date();
  const pedidosHoje = pedidos.filter(p => 
    p.dataPedido.toDateString() === hoje.toDateString()
  );
  
  // Faturamento apenas de pedidos ENTREGUE
  const totalFaturamento = pedidos
    .filter(p => p.status === StatusPedido.ENTREGUE)
    .reduce((acc, p) => acc + p.valorTotal, 0);
  
  // Faturamento de hoje (apenas entregues)
  const faturamentoHoje = pedidosHoje
    .filter(p => p.status === StatusPedido.ENTREGUE)
    .reduce((acc, p) => acc + p.valorTotal, 0);
  
  const pedidosPendentes = pedidos.filter(p => 
    p.status === StatusPedido.PENDENTE || 
    p.status === StatusPedido.CONFIRMADO || 
    p.status === StatusPedido.EM_PREPARO
  ).length;
  
  res.json({
    totalClientes: clientes.length,
    totalProdutos: produtos.length,
    totalPedidos: pedidos.length,
    pedidosHoje: pedidosHoje.length,
    faturamentoHoje,
    totalFaturamento,
    pedidosPendentes,
    topProdutos: relatorioService.getTopProdutos(5)
  });
});

app.get('/api/relatorios/diario', (req: Request, res: Response) => {
  atualizarRelatorioService();
  const data = req.query.data ? new Date(req.query.data as string) : new Date();
  const relatorio = relatorioService.gerarRelatorioDiario(data);
  
  // Converter Maps para objetos
  const vendasPorCategoria: Record<string, number> = {};
  relatorio.vendasPorCategoria.forEach((valor, key) => {
    vendasPorCategoria[key] = valor;
  });
  
  const vendasPorDia: Record<string, number> = {};
  relatorio.vendasPorDia.forEach((valor, key) => {
    vendasPorDia[key] = valor;
  });
  
  res.json({
    ...relatorio,
    vendasPorCategoria,
    vendasPorDia
  });
});

app.get('/api/relatorios/mensal', (req: Request, res: Response) => {
  atualizarRelatorioService();
  const mes = req.query.mes ? Number(req.query.mes) : new Date().getMonth() + 1;
  const ano = req.query.ano ? Number(req.query.ano) : new Date().getFullYear();
  const relatorio = relatorioService.gerarRelatorioMensal(mes, ano);
  
  const vendasPorDia: Record<string, number> = {};
  relatorio.vendasPorDia.forEach((valor, key) => {
    vendasPorDia[key] = valor;
  });
  
  res.json({
    ...relatorio,
    vendasPorDia
  });
});

// ========== API PROMOÇÕES ==========
app.get('/api/promocoes', (_req: Request, res: Response) => {
  res.json(promocaoService.listarPromocoes());
});

app.get('/api/promocoes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const promocao = promocaoService.buscarPromocaoPorId(id);
  if (promocao) {
    res.json(promocao);
  } else {
    res.status(404).json({ message: 'Promoção não encontrada' });
  }
});

app.post('/api/promocoes', (req: Request, res: Response) => {
  try {
    const promocao = promocaoService.criarPromocao(req.body);
    res.status(201).json(promocao);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar promoção' });
  }
});

app.put('/api/promocoes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sucesso = promocaoService.atualizarPromocao(id, req.body);
  if (sucesso) {
    res.json({ message: 'Promoção atualizada com sucesso' });
  } else {
    res.status(404).json({ message: 'Promoção não encontrada' });
  }
});

app.delete('/api/promocoes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sucesso = promocaoService.excluirPromocao(id);
  if (sucesso) {
    res.json({ message: 'Promoção excluída com sucesso' });
  } else {
    res.status(404).json({ message: 'Promoção não encontrada' });
  }
});

// Servir front-end estático
const publicDir = path.join(process.cwd(), 'public');
app.use(express.static(publicDir));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Web pronta em http://localhost:${port}`);
});
