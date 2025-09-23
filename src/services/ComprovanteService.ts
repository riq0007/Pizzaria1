import type { Pedido } from '../models/Pedido';

export class ComprovanteService {
    gerarComprovante(pedido: Pedido): string {
        const dataFormatada = pedido.dataPedido.toLocaleString('pt-BR');
        const dataEntregaFormatada = pedido.dataEntrega?.toLocaleString('pt-BR') || 'Não entregue';

        let comprovante = `
╔══════════════════════════════════════════════════════════════╗
║                    🍕 PIZZARIA DELÍCIA 🍕                    ║
║                    COMPROVANTE DE COMPRA                      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ 📋 INFORMAÇÕES DO PEDIDO                                     ║
║ ──────────────────────────────────────────────────────────── ║
║ ID do Pedido: ${pedido.id.toString().padStart(6, '0')}                                    ║
║ Data/Hora: ${dataFormatada.padEnd(35)}                       ║
║ Status: ${pedido.status.padEnd(40)}                          ║
║                                                              ║
║ 👤 DADOS DO CLIENTE                                          ║
║ ──────────────────────────────────────────────────────────── ║
║ Nome: ${pedido.cliente.nome.padEnd(45)}                      ║
║ Email: ${pedido.cliente.email.padEnd(44)}                    ║
║ Telefone: ${pedido.cliente.telefone.padEnd(40)}              ║
║                                                              ║`;

        if (pedido.enderecoEntrega) {
            comprovante += `
║ 📍 ENDEREÇO DE ENTREGA                                       ║
║ ──────────────────────────────────────────────────────────── ║
║ ${pedido.enderecoEntrega.padEnd(58)} ║
║                                                              ║`;
        }

        comprovante += `
║ 🛒 ITENS DO PEDIDO                                           ║
║ ──────────────────────────────────────────────────────────── ║`;

        pedido.itens.forEach((item, index) => {
            const linha = `${item.quantidade}x ${item.produto.nome}`;
            const preco = `R$ ${(item.precoUnitario * item.quantidade).toFixed(2)}`;
            comprovante += `
║ ${linha.padEnd(35)} ${preco.padStart(15)}                    ║`;
            
            if (item.observacoes) {
                comprovante += `
║   Obs: ${item.observacoes.padEnd(50)}                        ║`;
            }
        });

        comprovante += `
║                                                              ║
║ 💰 RESUMO FINANCEIRO                                         ║
║ ──────────────────────────────────────────────────────────── ║`;

        const subtotal = pedido.itens.reduce((total, item) => 
            total + (item.precoUnitario * item.quantidade), 0
        );

        comprovante += `
║ Subtotal: ${`R$ ${subtotal.toFixed(2)}`.padStart(50)}        ║`;

        if (pedido.taxaEntrega > 0) {
            comprovante += `
║ Taxa de Entrega: ${`R$ ${pedido.taxaEntrega.toFixed(2)}`.padStart(42)} ║`;
        }

        if (pedido.desconto > 0) {
            comprovante += `
║ Desconto: ${`-R$ ${pedido.desconto.toFixed(2)}`.padStart(47)} ║`;
        }

        comprovante += `
║ ──────────────────────────────────────────────────────────── ║
║ TOTAL: ${`R$ ${pedido.valorTotal.toFixed(2)}`.padStart(48)} ║
║                                                              ║
║ 💳 FORMA DE PAGAMENTO                                        ║
║ ${pedido.formaPagamento.padEnd(58)} ║
║                                                              ║`;

        if (pedido.observacoes) {
            comprovante += `
║ 📝 OBSERVAÇÕES                                               ║
║ ${pedido.observacoes.padEnd(58)} ║
║                                                              ║`;
        }

        comprovante += `
║                                                              ║
║ 🕒 ENTREGA: ${dataEntregaFormatada.padEnd(42)} ║
║                                                              ║
║ Obrigado pela preferência! 🍕                                ║
║ Volte sempre! 😊                                             ║
╚══════════════════════════════════════════════════════════════╝`;

        return comprovante;
    }

    salvarComprovante(pedido: Pedido, caminho?: string): string {
        const comprovante = this.gerarComprovante(pedido);
        const nomeArquivo = `comprovante_pedido_${pedido.id}_${new Date().toISOString().split('T')[0]}.txt`;
        const caminhoCompleto = caminho ? `${caminho}/${nomeArquivo}` : nomeArquivo;
        
        // Em um sistema real, aqui seria salvo em arquivo
        // Por enquanto, apenas retornamos o caminho
        return caminhoCompleto;
    }
}
