import MercadoPagoConfig, { Payment } from "mercadopago";
import { PaymentCreateData } from "mercadopago/dist/clients/payment/create/types";


export default class PaymentService {
  private client;
  constructor(accessToken: string) {
    this.client = new MercadoPagoConfig({ accessToken });
  }
  create(
    costumerEmail: string,
    description: string,
    transactionAmount: number,
    type: 'pix' | 'credit_card' | 'debit_card',
    installments?: 1,
    cardToken?: string,
    issuerId?: number
  ) {

    const payment = new Payment(this.client);
    const paymentData: PaymentCreateData = {
      body: {
        transaction_amount: transactionAmount,
        description,
        payment_method_id: type,
        payer: {
          email: costumerEmail
        },
      }
    };


    if (type === 'credit_card' || type === 'debit_card') {
      if (!cardToken || !issuerId) {
        throw new Error("Para pagamentos com cartão de crédito ou débito, 'cardToken' e 'issuerId' são obrigatórios.");
      }

      paymentData.body.token = cardToken;
      paymentData.body.issuer_id = issuerId;
      paymentData.body.installments = installments;
    }

    // Step 6: Make the request
    return payment.create(paymentData);
  }

  capture(idPayment: number) {
    const payment = new Payment(this.client);

    return payment.capture({ id: idPayment });
  }

  get(idPayment: number) {
    const payment = new Payment(this.client);

    return payment.get({ id: idPayment });
  }

  search() {
    const payment = new Payment(this.client);

    return payment.search();
  }

  cancel(idPayment: number) {
    const payment = new Payment(this.client);

    return payment.cancel({ id: idPayment });
  }
}