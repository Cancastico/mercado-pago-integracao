"use client";
import { Option } from '@/models/option';
import PaymentCreate from '@/services/fetchs/payments/create';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
type Props = {
  item: Option
}

const Checkout = ({ item }: Props) => {
  
  initMercadoPago(process.env.NEXT_PUBLIC_KEY!);

  return (
    <Payment
      initialization={{
        amount: item.value,
        preferenceId: '<YOUR_PREFERENCE_ID>',
      }}

      customization={{ paymentMethods: { creditCard: 'all', bankTransfer: "all", maxInstallments: 1 } }}
      onSubmit={async (param) => {
        PaymentCreate({
          installments: param.formData.installments,
          issuer_id: parseInt(param.formData.issuer_id),
          payer: param.formData.payer,
          payment_method_id: param.formData.payment_method_id,
          transaction_amount: param.formData.transaction_amount,
          token: param.formData.token,
        })
      }}
    />
  );
};

export default Checkout;
