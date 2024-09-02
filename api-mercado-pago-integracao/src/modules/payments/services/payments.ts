import MercadoPagoConfig, { Payment } from "mercadopago";


export default class PaymentService {
  private client;
  constructor(accessToken: string) {
    this.client = new MercadoPagoConfig({ accessToken });
  }
  create(costumerEmail: string, description: string, transactionAmount: number, type:'pix') {


    const payment = new Payment(this.client);

    const body = {
      transaction_amount: transactionAmount,
      description,
      payment_method_id: type,
      payer: {
        email: costumerEmail
      },
    };

    // Step 6: Make the request
    return payment.create({ body, });
  }

  capture(idPayment: number) {
    const payment = new Payment(this.client);

    return payment.capture({id:idPayment});
  }

  get(idPayment: number) {
    const payment = new Payment(this.client);

    return payment.get({id:idPayment});
  }

  search() {
    const payment = new Payment(this.client);

    return payment.search();
  }

  cancel(idPayment: number) {
    const payment = new Payment(this.client);

    return payment.cancel({id:idPayment});
  }
}