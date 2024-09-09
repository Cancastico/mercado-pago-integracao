import MercadoPagoConfig, { Payment } from "mercadopago";
import { PaymentCreateData, PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";


export default class PaymentService {
  private client;

  constructor(accessToken: string) {
    this.client = new MercadoPagoConfig({ accessToken });
  }

  create(
    { installments, issuer_id, payer, payment_method_id, transaction_amount, token }: PaymentCreateRequest
  ) {
    try {
      const payment = new Payment(this.client);
      const paymentData: PaymentCreateData = {
        body: {
          installments,
          issuer_id,
          payer,
          payment_method_id,
          token,
          transaction_amount,
        }
      };

      return payment.create(paymentData);
    } catch (error: any) {
      console.log(error)
      throw new ErrorResponse(error.code, error.message);
    }
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