"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Option } from '@/models/option';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  item: Option
}



const Checkout = ({ item }: Props) => {


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      const mp = new (window as any).MercadoPago(process.env.NEXT_PUBLIC_ACCESS_TOKEN, {
        locale: 'pt-BR'
      });

      const cardForm = mp.cardForm({
        amount: item.value,
        autoMount: true,
        form: {
          id: "form-checkout",
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular do cartão",
          },
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número do cartão",
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "Data de vencimento (MM/AA)",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de segurança",
          },
          identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número do documento",
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Parcelas",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco emissor",
          },
        },
        callbacks: {
          onFormMounted: (error: any) => {
            if (error) return console.error('Form Mounted handling error: ', error);
            console.log('Form mounted');
          },
          onSubmit: async (event: any) => {
            event.preventDefault();

            const {
              paymentMethodId,
              issuerId,
              cardholderEmail,
              token,
              installments,
              identificationNumber,
              identificationType
            } = cardForm.getCardFormData();

            try {
              const response = await fetch('/api/credit', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  token,
                  issuerId,
                  paymentMethodId,
                  transactionAmount: item.value,
                  installments: Number(installments),
                  description: `Compra do item ${item.label}`,
                  payer: {
                    email: cardholderEmail,
                    identification: {
                      type: identificationType,
                      number: identificationNumber,
                    },
                  },
                }),
              });

              const result = await response.json();
              console.log('Resultado da transação:', result);
            } catch (error) {
              console.error('Erro ao processar pagamento:', error);
            }
          },
          onFetching: (resource: any) => {
            console.log('Fetching resource: ', resource);

            // Desabilita o botão de submit enquanto a requisição está em andamento
            const button = document.querySelector('#form-checkout__submit') as HTMLButtonElement;
            button.setAttribute('disabled', 'true');
            return () => {
              button.removeAttribute('disabled');
            };
          }
        }
      });
    };
    document.body.appendChild(script);
  }, [item]);

  return (
    <div className='max-w-[400px] bg-white rounded-lg p-5 mx-auto mt-[15vh]'>
      <form id="form-checkout">
        <label>Numero Cartão</label>
        <Input className='w-full' id="form-checkout__cardNumber"></Input>

        <label>Data Vencimento</label>
        <Input className='w-full' id="form-checkout__expirationDate"></Input>

        <label>CNC</label>
        <Input className='w-full' id="form-checkout__securityCode"></Input>

        <label>Nome Cartão</label>
        <Input className='w-full' type="text" id="form-checkout__cardholderName" />

        <select className='w-full' id="form-checkout__issuer">
        </select>

        <label>Parcelar</label>
        <select className='w-full' id="form-checkout__installments">
          <option value="1">1</option>
        </select>

        <label>DOCUMENTO</label>
        <select className='w-full' id="form-checkout__identificationType">
          <option value="CPF">CPF</option>
        </select>

        <label>NUMERO CPF</label>
        <Input className='w-full' type="text" id="form-checkout__identificationNumber" />

        <label>EMAIL</label>
        <Input className='w-full' type="email" id="form-checkout__cardholderEmail" />

        <Button type="submit" id="form-checkout__submit">Pagar</Button>
      </form>
    </div>
  );
};

export default Checkout;
