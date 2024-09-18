"use client";
import { Option } from '@/models/option';
import { AxiosNode } from '@/services/axios';
import PaymentCreate from '@/services/fetchs/payments/create';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';
type Props = {
  item: Option
  nextStep: () => void,
}

const Checkout = ({ item, nextStep }: Props) => {
  const [preferenceId, setPreferenceId] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  initMercadoPago(process.env.NEXT_PUBLIC_KEY!, { locale: 'pt-BR' });

  useEffect(() => {
    console.log(item)
    const createPreference = async () => {
      try {
        const response = await AxiosNode.post('/preferences', {
          id: item.id,
          price: item.value,
          coffeeType: item.label,
        });

        setPreferenceId(response.data.id);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    createPreference();
  }, [item]);

  return (
    <Payment
      initialization={{

        preferenceId: preferenceId,
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
