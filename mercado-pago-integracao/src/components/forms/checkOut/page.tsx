"use client";
import { Option } from '@/models/option';
import { PreferenceResponse } from '@/models/preference';
import PaymentCreate from '@/services/fetchs/payments/create';
import PreferenceCreate from '@/services/fetchs/preference/create';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';

type Props = {
  item: Option;
};

const Checkout = ({ item }: Props) => {
  const [preference, setPreference] = useState<PreferenceResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

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
    if (paymentData.payment_method_id === 'pix') {
      // Mostrar QR code e instruções para pagamento via PIX
      return (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Pagamento via PIX</h2>
          <img src={paymentData.point_of_interaction.transaction_data.qr_code_base64} alt="QR Code PIX" />
          <p className="mt-4 text-gray-700">
            Escaneie o QR code acima com o seu aplicativo bancário para realizar o pagamento.
          </p>
          <p className="mt-2 text-gray-700">Ou copie o código abaixo:</p>
          <p className="mt-2 font-mono text-gray-800 bg-gray-100 p-2 rounded">
            {paymentData.point_of_interaction.transaction_data.qr_code}
          </p>
        </div>
      );
    } else {
      // Confirmação de pagamento com cartão
      return (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Pagamento Concluído</h2>
          <p className="mt-4 text-green-600">O pagamento foi realizado com sucesso!</p>
          <p className="mt-2 text-gray-700">Número de Transação: {paymentData.id}</p>
        </div>
      );
    }
  }

  return (
    <Payment
      initialization={{
        preferenceId: preference.id, // Usar apenas o preferenceId
      }}
      customization={{ paymentMethods: { creditCard: 'all', bankTransfer: 'all', maxInstallments: 1 } }}
      onSubmit={async (param) => {
        try {
          const paymentResponse = await PaymentCreate({
            installments: param.formData.installments,
            issuer_id: parseInt(param.formData.issuer_id),
            payer: param.formData.payer,
            payment_method_id: param.formData.payment_method_id,
            transaction_amount: param.formData.transaction_amount,
            token: param.formData.token,
          });

          // Salvar os dados do pagamento para mostrar o QR code ou confirmação
          setPaymentData(paymentResponse?.data);
        } catch (error) {
          console.error('Erro ao processar o pagamento:', error);
        }
      }}
    />
  );
};

export default Checkout;
