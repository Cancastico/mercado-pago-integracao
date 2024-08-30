import MercadoPagoConfig, { Payment } from "mercadopago";


export default class PixService {
    create(accessToken: string, costumerName: string, costumerEmail: string, description: string, transactionAmount: number) {
        const client = new MercadoPagoConfig({
            accessToken: accessToken,
            options: {
                timeout: 5000,
            }
        });

        const payment = new Payment(client);

        const body = {
            transaction_amount:transactionAmount,
            description,
            payment_method_id: 'pix',
            payer: {
                nickname:costumerName,
                email: costumerEmail
            },
        };

        // Step 6: Make the request
        return payment.create({ body,  });
    }
}