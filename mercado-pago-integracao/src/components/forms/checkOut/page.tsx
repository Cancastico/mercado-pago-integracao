"use client";
import { Option } from '@/models/option';
import { PreferenceResponse } from '@/models/preference';
import PaymentCreate from '@/services/fetchs/payments/create';
import PreferenceCreate from '@/services/fetchs/preference/create';
import { initMercadoPago, Payment, StatusScreen } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';

type Props = {
  item: Option;
};

const Checkout = ({ item }: Props) => {
  const [preference, setPreference] = useState<PreferenceResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  // Inicializar MercadoPago com a chave pública
  initMercadoPago(process.env.NEXT_PUBLIC_KEY!, { locale: 'pt-BR' });

  // Criar a preferência de pagamento quando o item mudar
  useEffect(() => {
    const createPreference = async () => {
      try {
        const response = await PreferenceCreate(item);
        setPreference(response.data.preference);
      } catch (error) {
        console.error('Erro ao criar a preferência:', error);
      } finally {
        setIsLoading(false);
      }
    };

    createPreference();
  }, [item]);

  // Mostrar loader enquanto a preferência está sendo criada
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-blue-500">Carregando...</p>
      </div>
    );
  }

  // Verificar se a preferência está definida antes de renderizar o componente Payment
  if (!preference?.id) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">Erro ao carregar a preferência de pagamento.</p>
      </div>
    );
  }

  // Renderizar QR code ou confirmação de pagamento
  if (paymentData) {
    return (
      <StatusScreen
        initialization={{ paymentId: paymentData.id.toString() }}
      />
    );
  }

  //Bloco de Pagamento seja pix ou cartão
  return (
    <Payment
      initialization={{
        amount: item.value,
        preferenceId: preference.id,
      }}
      customization={{
        paymentMethods: {
          bankTransfer: "all",
          creditCard: "all",
          maxInstallments: 1
        },

      }}
      onReady={() => { }}
      onSubmit={async (param) => {
        try {
          const paymentResponse = (await PaymentCreate({
            installments: param.formData.installments,
            issuer_id: parseInt(param.formData.issuer_id),
            payer: param.formData.payer,
            payment_method_id: param.formData.payment_method_id,
            transaction_amount: param.formData.transaction_amount,
            token: param.formData.token,
          })).data;

          // Verifica o status do pagamento
          if (paymentResponse.payment.status === 'approved' || param.formData.payment_method_id !== 'pix') {
            setPaymentData(paymentResponse!.payment);
          } else if (param.formData.payment_method_id === 'pix') {
            // PIX precisa de confirmação adicional
            setPaymentData({
              ...paymentResponse.payment,
              payment_method_id: 'pix',
            });
          }
        } catch (error) {
          console.error('Erro ao processar o pagamento:', error);
        }
      }}
    />
  );
};

export default Checkout;
