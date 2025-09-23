# 🏗️ Arquitetura do Sistema Pizzaria

## 📋 Visão Geral

O Sistema Pizzaria foi desenvolvido seguindo princípios de arquitetura limpa e modular, utilizando TypeScript e Node.js.

## 🎯 Estrutura de Camadas

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                   │
│                    (Interface de Usuário)                   │
├─────────────────────────────────────────────────────────────┤
│  SistemaPizzaria.ts - Menu Principal e Navegação            │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE SERVIÇOS                       │
│                    (Lógica de Negócio)                      │
├─────────────────────────────────────────────────────────────┤
│  RelatorioService.ts    │  ComprovanteService.ts           │
│  PromocaoService.ts    │  (Outros Serviços)               │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE MODELOS                        │
│                    (Entidades de Domínio)                  │
├─────────────────────────────────────────────────────────────┤
│  Cliente.ts           │  Produto.ts          │  Pedido.ts  │
│  (GerenciadorClientes)│  (GerenciadorProdutos)│(GerenciadorPedidos)│
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE DADOS                          │
│                    (Armazenamento)                          │
├─────────────────────────────────────────────────────────────┤
│  Arrays em Memória (Simulação de Banco de Dados)           │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Fluxo de Dados

### 1. Cadastro de Cliente
```
Usuário → SistemaPizzaria → GerenciadorClientes → Array de Clientes
```

### 2. Criação de Pedido
```
Usuário → SistemaPizzaria → GerenciadorPedidos → 
GerenciadorClientes (busca) → GerenciadorProdutos (validação) → 
Array de Pedidos
```

### 3. Geração de Relatório
```
Usuário → SistemaPizzaria → RelatorioService → 
GerenciadorPedidos (dados) → Processamento → Relatório
```

## 🧩 Componentes Principais

### 📁 Models (Entidades)
- **Cliente.ts**: Gerencia dados e operações de clientes
- **Produto.ts**: Gerencia catálogo de produtos e estoque
- **Pedido.ts**: Gerencia pedidos e status

### 📁 Services (Serviços)
- **RelatorioService.ts**: Gera relatórios de vendas
- **ComprovanteService.ts**: Gera comprovantes de compra
- **PromocaoService.ts**: Gerencia promoções e descontos

### 📁 Sistema Principal
- **SistemaPizzaria.ts**: Interface principal e orquestração

## 🔗 Dependências

```
SistemaPizzaria.ts
├── models/Cliente.ts
├── models/Produto.ts
├── models/Pedido.ts
├── services/RelatorioService.ts
├── services/ComprovanteService.ts
└── services/PromocaoService.ts
```

## 📊 Diagrama de Classes

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cliente       │    │   Produto       │    │   Pedido        │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ + id: number    │    │ + id: number    │    │ + id: number    │
│ + nome: string  │    │ + nome: string  │    │ + cliente: Cliente│
│ + email: string │    │ + preco: number│    │ + itens: Item[] │
│ + telefone: str │    │ + categoria: Cat│    │ + status: Status│
│ + endereco: str │    │ + estoque: num  │    │ + valorTotal: num│
│ + dataCadastro  │    │ + status: Status│    │ + dataPedido    │
│ + ativo: bool   │    │ + ingredientes  │    │ + formaPagamento│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   ItemPedido     │
                    ├─────────────────┤
                    │ + produto: Produto│
                    │ + quantidade: num│
                    │ + precoUnitario │
                    │ + observacoes    │
                    └─────────────────┘
```

## 🔄 Padrões de Design Utilizados

### 1. **Repository Pattern**
- Gerenciadores (Cliente, Produto, Pedido) atuam como repositórios
- Abstração da camada de dados

### 2. **Service Layer Pattern**
- Serviços especializados (Relatório, Comprovante, Promoção)
- Separação de responsabilidades

### 3. **Factory Pattern**
- Criação de objetos complexos (Pedidos, Promoções)
- Encapsulamento da lógica de criação

### 4. **Strategy Pattern**
- Diferentes tipos de promoção
- Cálculo de descontos flexível

## 🚀 Extensibilidade

### Pontos de Extensão
1. **Novos Tipos de Produto**: Adicionar categorias
2. **Novos Relatórios**: Implementar novos serviços
3. **Novas Formas de Pagamento**: Estender enum
4. **Integração com Banco**: Substituir arrays por BD
5. **Interface Gráfica**: Adicionar camada de apresentação

### Princípios SOLID
- **S** - Responsabilidade única por classe
- **O** - Aberto para extensão, fechado para modificação
- **L** - Substituição de Liskov
- **I** - Segregação de interfaces
- **D** - Inversão de dependência

## 🔧 Configuração e Deploy

### Estrutura de Arquivos
```
src/
├── models/          # Entidades de domínio
├── services/        # Serviços de negócio
└── SistemaPizzaria.ts # Aplicação principal

dist/                # Arquivos compilados
docs/                # Documentação
```

### Scripts de Build
```json
{
  "build": "tsc",
  "start": "node dist/SistemaPizzaria.js",
  "dev": "tsc && node dist/SistemaPizzaria.js"
}
```

## 📈 Métricas e Monitoramento

### Indicadores de Performance
- Tempo de resposta das operações
- Uso de memória
- Número de operações por segundo

### Logs e Auditoria
- Registro de todas as operações
- Histórico de alterações
- Rastreamento de erros

## 🔒 Segurança

### Validações
- Validação de entrada de dados
- Sanitização de strings
- Verificação de tipos

### Controle de Acesso
- Validação de permissões
- Logs de auditoria
- Controle de sessão

---

**Arquitetura desenvolvida para escalabilidade e manutenibilidade! 🏗️**
