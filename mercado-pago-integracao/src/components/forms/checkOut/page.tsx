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

const paymentSchema = z.object({
  cardholderName: z.string().min(1, "Nome do titular é obrigatório"),
  cardNumber: z.string().min(16, "Número do cartão deve ter 16 dígitos"),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Data de validade inválida"),
  securityCode: z.string().min(3, "Código de segurança deve ter 3 dígitos"),
  identificationType: z.string().min(1, "Tipo de documento é obrigatório"),
  identificationNumber: z.string().min(1, "Número do documento é obrigatório"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const Checkout = ({ item }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { identificationType: 'CPF' }
  });

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
      <form className='flex flex-col gap-5' id="form-checkout" onSubmit={handleSubmit(() => {})}>
        <Input
          type="text"
          id="form-checkout__cardholderName"
          placeholder="Titular do cartão"
          {...register('cardholderName')}
        />
        {errors.cardholderName && <span>{errors.cardholderName.message}</span>}

        <Input
          type="text"
          id="form-checkout__cardNumber"
          placeholder="Número do cartão"
          {...register('cardNumber')}
        />
        {errors.cardNumber && <span>{errors.cardNumber.message}</span>}

        <Input
          type="text"
          id="form-checkout__expirationDate"
          placeholder="Data de vencimento (MM/AA)"
          {...register('expirationDate')}
        />
        {errors.expirationDate && <span>{errors.expirationDate.message}</span>}

        <Input
          type="text"
          id="form-checkout__securityCode"
          placeholder="Código de segurança"
          {...register('securityCode')}
        />
        {errors.securityCode && <span>{errors.securityCode.message}</span>}

        <Select onValueChange={(value) => setValue('identificationType', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o tipo de documento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CPF">CPF</SelectItem>
            <SelectItem value="CNPJ">CNPJ</SelectItem>
          </SelectContent>
        </Select>
        {errors.identificationType && <span>{errors.identificationType.message}</span>}

        <Input
          type="text"
          id="form-checkout__identificationNumber"
          placeholder="Número do documento"
          {...register('identificationNumber')}
        />
        {errors.identificationNumber && <span>{errors.identificationNumber.message}</span>}

        <Button id="form-checkout__submit" type="submit">Pagar</Button>
      </form>
    </div>
  );
};

export default Checkout;
