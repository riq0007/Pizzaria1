const API_BASE = '/api';

// Navegação
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
  document.getElementById(pageId)?.classList.add('active');
  event.target.classList.add('active');
  
  // Carregar dados da página
  switch(pageId) {
    case 'dashboard': loadDashboard(); break;
    case 'clientes': loadClientes(); break;
    case 'produtos': loadProdutos(); break;
    case 'pedidos': loadPedidos(); break;
    case 'relatorios': loadRelatorios(); break;
    case 'promocoes': loadPromocoes(); break;
  }
}

// Dashboard
async function loadDashboard() {
  try {
    const res = await fetch(`${API_BASE}/relatorios/dashboard`);
    const data = await res.json();
    
    const stats = `
      <div class="stat-card">
        <div class="value">${data.totalClientes}</div>
        <div class="label">Clientes</div>
      </div>
      <div class="stat-card">
        <div class="value">${data.totalProdutos}</div>
        <div class="label">Produtos</div>
      </div>
      <div class="stat-card">
        <div class="value">${data.totalPedidos}</div>
        <div class="label">Pedidos</div>
      </div>
      <div class="stat-card">
        <div class="value">R$ ${data.totalFaturamento.toFixed(2)}</div>
        <div class="label">Faturamento Total</div>
      </div>
      ${data.faturamentoHoje !== undefined ? `
      <div class="stat-card">
        <div class="value">R$ ${data.faturamentoHoje.toFixed(2)}</div>
        <div class="label">Faturamento Hoje</div>
      </div>
      ` : ''}
      <div class="stat-card">
        <div class="value">${data.pedidosHoje}</div>
        <div class="label">Pedidos Hoje</div>
      </div>
      <div class="stat-card">
        <div class="value">${data.pedidosPendentes}</div>
        <div class="label">Pedidos Pendentes</div>
      </div>
    `;
    
    document.getElementById('dashboard-stats').innerHTML = stats;
    
    if (data.topProdutos && data.topProdutos.length > 0) {
      const topProdutos = `
        <div class="card" style="margin-top: 2rem;">
          <h2>Top 5 Produtos Mais Vendidos</h2>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Faturamento</th>
              </tr>
            </thead>
            <tbody>
              ${data.topProdutos.map(p => `
                <tr>
                  <td>${p.produto}</td>
                  <td>${p.quantidade}</td>
                  <td>R$ ${p.faturamento.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      document.getElementById('dashboard').innerHTML += topProdutos;
    }
  } catch (error) {
    document.getElementById('dashboard-stats').innerHTML = '<div class="error">Erro ao carregar dashboard</div>';
  }
}

// Clientes
async function loadClientes() {
  try {
    const res = await fetch(`${API_BASE}/clientes`);
    const clientes = await res.json();
    
    if (clientes.length === 0) {
      document.getElementById('clientes-list').innerHTML = '<p>Nenhum cliente cadastrado.</p>';
      return;
    }
    
    const html = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${clientes.map(c => `
            <tr>
              <td>${c.id}</td>
              <td>${c.nome}</td>
              <td>${c.email}</td>
              <td>${c.telefone}</td>
              <td>${c.endereco}</td>
              <td class="actions">
                <button class="btn btn-secondary" onclick="editCliente(${c.id})">✏️ Editar</button>
                <button class="btn btn-secondary" onclick="deleteCliente(${c.id})">🗑️ Excluir</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    document.getElementById('clientes-list').innerHTML = html;
  } catch (error) {
    document.getElementById('clientes-list').innerHTML = '<div class="error">Erro ao carregar clientes</div>';
  }
}

function showClienteForm(cliente = null) {
  document.getElementById('cliente-form').style.display = 'block';
  document.getElementById('cliente-form-title').textContent = cliente ? 'Editar Cliente' : 'Novo Cliente';
  document.getElementById('cliente-id').value = cliente?.id || '';
  document.getElementById('cliente-nome').value = cliente?.nome || '';
  document.getElementById('cliente-email').value = cliente?.email || '';
  document.getElementById('cliente-telefone').value = cliente?.telefone || '';
  document.getElementById('cliente-endereco').value = cliente?.endereco || '';
}

function hideClienteForm() {
  document.getElementById('cliente-form').style.display = 'none';
  document.getElementById('cliente-form-element').reset();
}

async function saveCliente(event) {
  event.preventDefault();
  const id = document.getElementById('cliente-id').value;
  const data = {
    nome: document.getElementById('cliente-nome').value,
    email: document.getElementById('cliente-email').value,
    telefone: document.getElementById('cliente-telefone').value,
    endereco: document.getElementById('cliente-endereco').value
  };
  
  try {
    const url = id ? `${API_BASE}/clientes/${id}` : `${API_BASE}/clientes`;
    const method = id ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (res.ok) {
      hideClienteForm();
      loadClientes();
      alert('Cliente salvo com sucesso!');
    } else {
      alert('Erro ao salvar cliente');
    }
  } catch (error) {
    alert('Erro ao salvar cliente');
  }
}

async function editCliente(id) {
  try {
    const res = await fetch(`${API_BASE}/clientes/${id}`);
    const cliente = await res.json();
    showClienteForm(cliente);
  } catch (error) {
    alert('Erro ao carregar cliente');
  }
}

async function deleteCliente(id) {
  if (!confirm('Deseja realmente excluir este cliente?')) return;
  
  try {
    const res = await fetch(`${API_BASE}/clientes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      loadClientes();
      alert('Cliente excluído com sucesso!');
    } else {
      alert('Erro ao excluir cliente');
    }
  } catch (error) {
    alert('Erro ao excluir cliente');
  }
}

// Produtos
async function loadProdutos() {
  try {
    // Carregar todos os produtos (não apenas ativos)
    const res = await fetch(`${API_BASE}/produtos`);
    const produtos = await res.json();
    
    if (produtos.length === 0) {
      document.getElementById('produtos-list').innerHTML = '<p>Nenhum produto cadastrado.</p>';
      return;
    }
    
    const html = `
      <div class="grid" style="margin-top: 1rem;">
        ${produtos.map(p => `
          <div class="item-card">
            <h3>${p.nome}</h3>
            <p>${p.descricao}</p>
            <p class="price">R$ ${p.preco.toFixed(2)}</p>
            <p><strong>Categoria:</strong> ${p.categoria}</p>
            <p><strong>Estoque:</strong> ${p.estoque}</p>
            <p><strong>Status:</strong> <span class="badge ${p.status === 'Ativo' ? 'badge-success' : p.status === 'Esgotado' ? 'badge-warning' : 'badge-danger'}">${p.status}</span></p>
            <div class="actions" style="margin-top: 1rem;">
              <button class="btn btn-secondary" onclick="editProduto(${p.id})">✏️ Editar</button>
              <button class="btn btn-secondary" onclick="deleteProduto(${p.id})">🗑️ Excluir</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    document.getElementById('produtos-list').innerHTML = html;
  } catch (error) {
    document.getElementById('produtos-list').innerHTML = '<div class="error">Erro ao carregar produtos</div>';
  }
}

function showProdutoForm(produto = null) {
  document.getElementById('produto-form').style.display = 'block';
  document.getElementById('produto-form-title').textContent = produto ? 'Editar Produto' : 'Novo Produto';
  document.getElementById('produto-id').value = produto?.id || '';
  document.getElementById('produto-nome').value = produto?.nome || '';
  document.getElementById('produto-descricao').value = produto?.descricao || '';
  document.getElementById('produto-preco').value = produto?.preco || '';
  document.getElementById('produto-categoria').value = produto?.categoria || 'Pizza';
  document.getElementById('produto-estoque').value = produto?.estoque || '';
  document.getElementById('produto-status').value = produto?.status || 'Ativo';
}

function hideProdutoForm() {
  document.getElementById('produto-form').style.display = 'none';
  document.getElementById('produto-form-element').reset();
}

async function saveProduto(event) {
  event.preventDefault();
  const id = document.getElementById('produto-id').value;
  const data = {
    nome: document.getElementById('produto-nome').value,
    descricao: document.getElementById('produto-descricao').value,
    preco: parseFloat(document.getElementById('produto-preco').value),
    categoria: document.getElementById('produto-categoria').value,
    estoque: parseInt(document.getElementById('produto-estoque').value),
    status: document.getElementById('produto-status').value
  };
  
  try {
    const url = id ? `${API_BASE}/produtos/${id}` : `${API_BASE}/produtos`;
    const method = id ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (res.ok) {
      hideProdutoForm();
      loadProdutos();
      alert('Produto salvo com sucesso!');
    } else {
      alert('Erro ao salvar produto');
    }
  } catch (error) {
    alert('Erro ao salvar produto');
  }
}

async function editProduto(id) {
  try {
    const res = await fetch(`${API_BASE}/produtos/${id}`);
    const produto = await res.json();
    showProdutoForm(produto);
  } catch (error) {
    alert('Erro ao carregar produto');
  }
}

async function deleteProduto(id) {
  if (!confirm('Deseja realmente excluir este produto?')) return;
  
  try {
    const res = await fetch(`${API_BASE}/produtos/${id}`, { method: 'DELETE' });
    if (res.ok) {
      loadProdutos();
      alert('Produto excluído com sucesso!');
    } else {
      alert('Erro ao excluir produto');
    }
  } catch (error) {
    alert('Erro ao excluir produto');
  }
}

// Pedidos
async function loadPedidos() {
  try {
    const res = await fetch(`${API_BASE}/pedidos`);
    const pedidos = await res.json();
    
    if (pedidos.length === 0) {
      document.getElementById('pedidos-list').innerHTML = '<p>Nenhum pedido cadastrado.</p>';
      return;
    }
    
    const html = `
      <table style="margin-top: 1rem;">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Total</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${pedidos.map(p => `
            <tr>
              <td>${p.id}</td>
              <td>${p.cliente.nome}</td>
              <td>${new Date(p.dataPedido).toLocaleDateString('pt-BR')}</td>
              <td>R$ ${p.valorTotal.toFixed(2)}</td>
              <td><span class="badge ${getStatusBadgeClass(p.status)}">${p.status}</span></td>
              <td class="actions">
                <button class="btn btn-secondary" onclick="viewPedido(${p.id})">👁️ Ver</button>
                <button class="btn btn-secondary" onclick="updatePedidoStatus(${p.id})">✏️ Status</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    document.getElementById('pedidos-list').innerHTML = html;
  } catch (error) {
    document.getElementById('pedidos-list').innerHTML = '<div class="error">Erro ao carregar pedidos</div>';
  }
}

function getStatusBadgeClass(status) {
  const statusMap = {
    'Pendente': 'badge-warning',
    'Confirmado': 'badge-warning',
    'Em Preparo': 'badge-warning',
    'Pronto para Entrega': 'badge-success',
    'Em Trânsito': 'badge-success',
    'Entregue': 'badge-success',
    'Cancelado': 'badge-danger'
  };
  return statusMap[status] || 'badge-secondary';
}

async function viewPedido(id) {
  try {
    const res = await fetch(`${API_BASE}/pedidos/${id}`);
    const pedido = await res.json();
    
    const html = `
      <div class="card">
        <h2>Pedido #${pedido.id}</h2>
        <p><strong>Cliente:</strong> ${pedido.cliente.nome}</p>
        <p><strong>Data:</strong> ${new Date(pedido.dataPedido).toLocaleString('pt-BR')}</p>
        <p><strong>Status:</strong> ${pedido.status}</p>
        <p><strong>Forma de Pagamento:</strong> ${pedido.formaPagamento}</p>
        <p><strong>Total:</strong> R$ ${pedido.valorTotal.toFixed(2)}</p>
        <h3 style="margin-top: 1rem;">Itens:</h3>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço Unitário</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${pedido.itens.map(item => `
              <tr>
                <td>${item.produto.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.precoUnitario.toFixed(2)}</td>
                <td>R$ ${(item.precoUnitario * item.quantidade).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    
    document.getElementById('pedidos-list').innerHTML = html + document.getElementById('pedidos-list').innerHTML;
  } catch (error) {
    alert('Erro ao carregar pedido');
  }
}

let pedidoItens = [];

async function showPedidoForm() {
  document.getElementById('pedido-form').style.display = 'block';
  pedidoItens = [];
  document.getElementById('pedido-itens').innerHTML = '';
  
  // Carregar clientes
  try {
    const res = await fetch(`${API_BASE}/clientes`);
    const clientes = await res.json();
    const select = document.getElementById('pedido-cliente');
    select.innerHTML = '<option value="">Selecione um cliente</option>';
    clientes.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = `${c.nome} (${c.email})`;
      select.appendChild(option);
    });
  } catch (error) {
    alert('Erro ao carregar clientes');
  }
  
  // Carregar produtos (apenas ativos para pedidos)
  try {
    const res = await fetch(`${API_BASE}/produtos?ativos=true`);
    const produtos = await res.json();
    const select = document.getElementById('pedido-produto-select');
    select.innerHTML = '<option value="">Selecione um produto</option>';
    produtos.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = `${p.nome} - R$ ${p.preco.toFixed(2)} (Estoque: ${p.estoque})`;
      option.dataset.produto = JSON.stringify(p);
      select.appendChild(option);
    });
  } catch (error) {
    alert('Erro ao carregar produtos');
  }
}

function hidePedidoForm() {
  document.getElementById('pedido-form').style.display = 'none';
  document.getElementById('pedido-form-element').reset();
  pedidoItens = [];
  document.getElementById('pedido-itens').innerHTML = '';
}

function addProdutoPedido() {
  const select = document.getElementById('pedido-produto-select');
  const quantidade = parseInt(document.getElementById('pedido-quantidade').value) || 1;
  
  if (!select.value) {
    alert('Selecione um produto');
    return;
  }
  
  const produto = JSON.parse(select.options[select.selectedIndex].dataset.produto);
  
  if (quantidade > produto.estoque) {
    alert(`Estoque insuficiente. Disponível: ${produto.estoque}`);
    return;
  }
  
  pedidoItens.push({
    produto,
    quantidade,
    precoUnitario: produto.preco
  });
  
  updatePedidoItensList();
  select.value = '';
  document.getElementById('pedido-quantidade').value = 1;
}

function updatePedidoItensList() {
  const div = document.getElementById('pedido-itens');
  if (pedidoItens.length === 0) {
    div.innerHTML = '';
    return;
  }
  
  let total = 0;
  const html = `
    <div class="card">
      <h3>Itens do Pedido</h3>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${pedidoItens.map((item, index) => {
            const subtotal = item.precoUnitario * item.quantidade;
            total += subtotal;
            return `
              <tr>
                <td>${item.produto.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.precoUnitario.toFixed(2)}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
                <td><button type="button" class="btn btn-secondary" onclick="removePedidoItem(${index})">🗑️</button></td>
              </tr>
            `;
          }).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><strong>Subtotal:</strong></td>
            <td><strong>R$ ${total.toFixed(2)}</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
  div.innerHTML = html;
}

function removePedidoItem(index) {
  pedidoItens.splice(index, 1);
  updatePedidoItensList();
}

async function savePedido(event) {
  event.preventDefault();
  
  if (pedidoItens.length === 0) {
    alert('Adicione pelo menos um produto ao pedido');
    return;
  }
  
  const clienteId = parseInt(document.getElementById('pedido-cliente').value);
  const formaPagamento = document.getElementById('pedido-pagamento').value;
  const taxaEntrega = parseFloat(document.getElementById('pedido-taxa').value) || 0;
  const desconto = parseFloat(document.getElementById('pedido-desconto').value) || 0;
  const observacoes = document.getElementById('pedido-observacoes').value;
  
  // Buscar cliente completo
  try {
    const clienteRes = await fetch(`${API_BASE}/clientes/${clienteId}`);
    const cliente = await clienteRes.json();
    
    const data = {
      cliente,
      itens: pedidoItens,
      status: 'Pendente',
      formaPagamento,
      taxaEntrega,
      desconto,
      observacoes
    };
    
    const res = await fetch(`${API_BASE}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (res.ok) {
      hidePedidoForm();
      loadPedidos();
      alert('Pedido criado com sucesso!');
    } else {
      const error = await res.json();
      alert('Erro ao criar pedido: ' + (error.message || 'Erro desconhecido'));
    }
  } catch (error) {
    alert('Erro ao criar pedido');
  }
}

async function updatePedidoStatus(id) {
  const statuses = ['Pendente', 'Confirmado', 'Em Preparo', 'Pronto para Entrega', 'Em Trânsito', 'Entregue', 'Cancelado'];
  const status = prompt('Novo status:\n' + statuses.map((s, i) => `${i + 1}. ${s}`).join('\n'));
  
  if (!status) return;
  
  try {
    const res = await fetch(`${API_BASE}/pedidos/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    
    if (res.ok) {
      loadPedidos();
      alert('Status atualizado com sucesso!');
    } else {
      alert('Erro ao atualizar status');
    }
  } catch (error) {
    alert('Erro ao atualizar status');
  }
}

// Relatórios
async function loadRelatorios() {
  try {
    const res = await fetch(`${API_BASE}/relatorios/diario`);
    const relatorio = await res.json();
    
    const html = `
      <div class="card">
        <h2>Relatório Diário</h2>
        <p><strong>Total de Vendas:</strong> ${relatorio.totalVendas}</p>
        <p><strong>Faturamento:</strong> R$ ${relatorio.totalFaturamento.toFixed(2)}</p>
        <p><strong>Pedidos Entregues:</strong> ${relatorio.pedidosEntregues}</p>
        <p><strong>Pedidos Cancelados:</strong> ${relatorio.pedidosCancelados}</p>
      </div>
    `;
    
    document.getElementById('relatorios-content').innerHTML = html;
  } catch (error) {
    document.getElementById('relatorios-content').innerHTML = '<div class="error">Erro ao carregar relatórios</div>';
  }
}

// Promoções
async function loadPromocoes() {
  try {
    const res = await fetch(`${API_BASE}/promocoes`);
    const promocoes = await res.json();
    
    if (promocoes.length === 0) {
      document.getElementById('promocoes-list').innerHTML = '<p>Nenhuma promoção cadastrada.</p>';
      return;
    }
    
    const html = `
      <div class="grid" style="margin-top: 1rem;">
        ${promocoes.map(p => `
          <div class="item-card">
            <h3>${p.nome}</h3>
            <p>${p.descricao}</p>
            <p><strong>Tipo:</strong> ${p.tipo}</p>
            <p><strong>Desconto:</strong> ${p.valorDesconto}</p>
            <p><strong>Status:</strong> <span class="badge ${p.ativa ? 'badge-success' : 'badge-danger'}">${p.ativa ? 'Ativa' : 'Inativa'}</span></p>
            <p><strong>Período:</strong> ${new Date(p.dataInicio).toLocaleDateString('pt-BR')} a ${new Date(p.dataFim).toLocaleDateString('pt-BR')}</p>
            <div class="actions" style="margin-top: 1rem;">
              <button class="btn btn-secondary" onclick="editPromocao(${p.id})">✏️ Editar</button>
              <button class="btn btn-secondary" onclick="deletePromocao(${p.id})">🗑️ Excluir</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    document.getElementById('promocoes-list').innerHTML = html;
  } catch (error) {
    document.getElementById('promocoes-list').innerHTML = '<div class="error">Erro ao carregar promoções</div>';
  }
}

function showPromocaoForm(promocao = null) {
  document.getElementById('promocao-form').style.display = 'block';
  document.getElementById('promocao-form-title').textContent = promocao ? 'Editar Promoção' : 'Nova Promoção';
  document.getElementById('promocao-id').value = promocao?.id || '';
  document.getElementById('promocao-nome').value = promocao?.nome || '';
  document.getElementById('promocao-descricao').value = promocao?.descricao || '';
  document.getElementById('promocao-tipo').value = promocao?.tipo || 'Desconto Percentual';
  document.getElementById('promocao-valor').value = promocao?.valorDesconto || '';
  document.getElementById('promocao-valor-minimo').value = promocao?.valorMinimo || '';
  document.getElementById('promocao-data-inicio').value = promocao ? new Date(promocao.dataInicio).toISOString().split('T')[0] : '';
  document.getElementById('promocao-data-fim').value = promocao ? new Date(promocao.dataFim).toISOString().split('T')[0] : '';
  document.getElementById('promocao-ativa').value = promocao?.ativa ? 'true' : 'false';
}

function hidePromocaoForm() {
  document.getElementById('promocao-form').style.display = 'none';
  document.getElementById('promocao-form-element').reset();
}

async function savePromocao(event) {
  event.preventDefault();
  const id = document.getElementById('promocao-id').value;
  const data = {
    nome: document.getElementById('promocao-nome').value,
    descricao: document.getElementById('promocao-descricao').value,
    tipo: document.getElementById('promocao-tipo').value,
    valorDesconto: parseFloat(document.getElementById('promocao-valor').value),
    valorMinimo: document.getElementById('promocao-valor-minimo').value ? parseFloat(document.getElementById('promocao-valor-minimo').value) : undefined,
    dataInicio: new Date(document.getElementById('promocao-data-inicio').value),
    dataFim: new Date(document.getElementById('promocao-data-fim').value),
    ativa: document.getElementById('promocao-ativa').value === 'true'
  };
  
  try {
    const url = id ? `${API_BASE}/promocoes/${id}` : `${API_BASE}/promocoes`;
    const method = id ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (res.ok) {
      hidePromocaoForm();
      loadPromocoes();
      alert('Promoção salva com sucesso!');
    } else {
      const error = await res.json();
      alert('Erro ao salvar promoção: ' + (error.message || 'Erro desconhecido'));
    }
  } catch (error) {
    alert('Erro ao salvar promoção');
  }
}

async function editPromocao(id) {
  try {
    const res = await fetch(`${API_BASE}/promocoes/${id}`);
    const promocao = await res.json();
    showPromocaoForm(promocao);
  } catch (error) {
    alert('Erro ao carregar promoção');
  }
}

async function deletePromocao(id) {
  if (!confirm('Deseja realmente excluir esta promoção?')) return;
  
  try {
    const res = await fetch(`${API_BASE}/promocoes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      loadPromocoes();
      alert('Promoção excluída com sucesso!');
    } else {
      alert('Erro ao excluir promoção');
    }
  } catch (error) {
    alert('Erro ao excluir promoção');
  }
}

// Inicializar
loadDashboard();


