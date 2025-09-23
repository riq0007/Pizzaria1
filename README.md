# 🍕 Sistema Pizzaria Completo

Sistema completo de gerenciamento de pizzaria desenvolvido em TypeScript/Node.js com funcionalidades avançadas de gestão de clientes, produtos, pedidos, relatórios e promoções.

## 🚀 Funcionalidades

### 👤 Cadastro de Clientes
- ✅ Cadastrar, consultar, atualizar e excluir clientes
- ✅ Busca por ID e email
- ✅ Histórico de cadastro
- ✅ Controle de status (ativo/inativo)

### 🍕 Cadastro de Produtos
- ✅ Gerenciamento completo de produtos (pizzas, bebidas, sobremesas, acompanhamentos)
- ✅ Controle de estoque
- ✅ Categorização de produtos
- ✅ Informações nutricionais
- ✅ Status de produtos (ativo/inativo/esgotado)

### 📋 Sistema de Pedidos
- ✅ Criação de pedidos com múltiplos itens
- ✅ Controle de status do pedido
- ✅ Múltiplas formas de pagamento
- ✅ Cálculo automático de valores
- ✅ Taxa de entrega e descontos
- ✅ Observações e endereço de entrega

### 🧾 Emissão de Comprovantes
- ✅ Geração automática de comprovantes
- ✅ Layout profissional e organizado
- ✅ Informações completas do pedido
- ✅ Dados do cliente e forma de pagamento

### 📊 Relatórios de Vendas
- ✅ Relatórios diários de vendas
- ✅ Relatórios mensais de vendas
- ✅ Análise por categoria de produto
- ✅ Produtos mais vendidos
- ✅ Faturamento total e por período

### 🎉 Sistema de Promoções
- ✅ Promoções automáticas
- ✅ Descontos percentuais e fixos
- ✅ Frete grátis
- ✅ Promoções por produto
- ✅ Controle de validade e limite de uso

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **Node.js** - Runtime JavaScript
- **readline-sync** - Interface de linha de comando
- **ES Modules** - Sistema de módulos moderno

## 📋 Pré-requisitos

- Node.js (versão 18.0.0 ou superior)
- npm (Gerenciador de Pacotes do Node)
- TypeScript (instalado globalmente ou via npm)

## ⚙️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/sistema-pizzaria.git
cd sistema-pizzaria
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Compile o projeto
```bash
npm run build
```

### 4. Execute a aplicação
```bash
npm start
```

### Scripts Disponíveis
```bash
npm run build    # Compila o TypeScript
npm run start    # Executa a aplicação
npm run dev      # Compila e executa
npm run clean    # Limpa a pasta dist
```

## 📂 Estrutura do Projeto

```
sistema-pizzaria/
├── src/
│   ├── models/
│   │   ├── Cliente.ts          # Modelo e gerenciador de clientes
│   │   ├── Produto.ts          # Modelo e gerenciador de produtos
│   │   └── Pedido.ts           # Modelo e gerenciador de pedidos
│   ├── services/
│   │   ├── RelatorioService.ts # Serviço de relatórios
│   │   ├── ComprovanteService.ts # Serviço de comprovantes
│   │   └── PromocaoService.ts  # Serviço de promoções
│   └── SistemaPizzaria.ts     # Arquivo principal
├── dist/                       # Arquivos compilados
├── package.json               # Configurações do projeto
├── tsconfig.json             # Configurações do TypeScript
└── README.md                 # Documentação
```

## 🎯 Como Usar

### Menu Principal
O sistema apresenta um menu principal com as seguintes opções:

1. **👤 Gerenciar Clientes** - Cadastro e gestão de clientes
2. **🍕 Gerenciar Produtos** - Cadastro e gestão de produtos
3. **📋 Gerenciar Pedidos** - Criação e gestão de pedidos
4. **📊 Relatórios de Vendas** - Análise de vendas e faturamento
5. **🎉 Promoções** - Gestão de promoções e descontos

### Fluxo de Trabalho
1. **Cadastre clientes** no sistema
2. **Configure produtos** do cardápio
3. **Crie pedidos** para os clientes
4. **Gere comprovantes** automaticamente
5. **Analise relatórios** de vendas
6. **Configure promoções** para aumentar vendas

## 📊 Funcionalidades Avançadas

### Relatórios Inteligentes
- Análise de vendas por período
- Produtos mais vendidos
- Categorias com melhor performance
- Faturamento detalhado

### Sistema de Promoções
- Promoções automáticas baseadas em regras
- Descontos progressivos
- Frete grátis condicional
- Promoções por categoria de produto

### Gestão de Estoque
- Controle automático de estoque
- Alertas de produtos esgotados
- Reposição inteligente

## 🔧 Execução

### Via Terminal
```bash
# Compilar e executar
npm run dev

# Ou executar diretamente
npm start
```

### Via Visual Studio Code
1. Abra o projeto no VSCode
2. Instale a extensão TypeScript
3. Use `Ctrl+Shift+P` e execute "TypeScript: Build"
4. Execute o arquivo `dist/SistemaPizzaria.js`

## 📈 Melhorias Futuras

- [ ] Interface gráfica (GUI)
- [ ] Banco de dados persistente
- [ ] API REST
- [ ] Sistema de autenticação
- [ ] Integração com delivery
- [ ] App mobile
- [ ] Dashboard web

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- Email: suporte@sistemapizzaria.com
- GitHub Issues: [Criar uma issue](https://github.com/seu-usuario/sistema-pizzaria/issues)

---

**Desenvolvido com ❤️ para a gestão eficiente de pizzarias**
