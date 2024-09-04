"use client";
import { Option } from '@/models/option';
import { CardPayment, initMercadoPago, Payment } from '@mercadopago/sdk-react';
import * as dotenv from 'dotenv'
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
      customization={{paymentMethods:{creditCard:'all',bankTransfer:"all",maxInstallments:1}}}
      onSubmit={async (param) => {
        console.log(param);
      }}
    />
  );
};

export default Checkout;
