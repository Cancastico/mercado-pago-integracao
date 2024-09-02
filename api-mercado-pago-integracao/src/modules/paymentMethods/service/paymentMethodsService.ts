import MercadoPagoConfig, { PaymentMethod } from "mercadopago";

export default class PaymentMethodsService{
  private client;
  constructor(accessToken: string) {
    this.client = new MercadoPagoConfig({ accessToken });
  }

  get(){
    const paymentMethod = new PaymentMethod(this.client);

    return paymentMethod.get()
  }
}