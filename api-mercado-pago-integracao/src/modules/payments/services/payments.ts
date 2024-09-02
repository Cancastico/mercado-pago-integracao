import MercadoPagoConfig, { Payment } from "mercadopago";
import { PaymentCreateData } from "mercadopago/dist/clients/payment/create/types";
import { ErrorResponse } from "../../../middlewares/errorMiddleware/erroMiddleware";


export default class PaymentService {
  private client;
  constructor(accessToken: string) {
    this.client = new MercadoPagoConfig({ accessToken });
  }
  create(
    costumerEmail: string,
    description: string,
    transactionAmount: number,
    paymentMethodId:"debel"|"elo"|"debvisa"|"visa"|"amex"|"maestro"|"debmaster"|"master"|"hipercard"|"debcabal"|"cabal"|"pix",
  ) {
    try {
      const payment = new Payment(this.client);
      const paymentData: PaymentCreateData = {
        body: {
          transaction_amount: transactionAmount,
          description,
          payment_method_id: paymentMethodId,
          payer: {
            email: costumerEmail
          },
        }
      };
  
      // Step 6: Make the request
      return payment.create(paymentData);
    } catch (error:any) {
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