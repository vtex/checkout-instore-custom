// Essa configuração libera o botão de cancelamento parcial para os métodos de pagamento cartão de crédito e cartão de débito.
// Por padrão, o cancelamento parcial está desabilitado para esses dois métodos de pagamento.

{
  payments: {
    partialCancellationEnabled: [
      '44', // Débito
      '45', // Crédito
    ],
  }
}
