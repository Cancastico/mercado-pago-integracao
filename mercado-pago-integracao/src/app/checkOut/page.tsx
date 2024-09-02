"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const paymentSchema = z.object({
  cardholderName: z.string().min(1, "Nome do titular é obrigatório"),
  cardNumber: z.string().min(16, "Número do cartão deve ter 16 dígitos"),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Data de validade inválida"),
  securityCode: z.string().min(3, "Código de segurança deve ter 3 dígitos"),
  identificationType: z.string().min(1, "Tipo de documento é obrigatório"),
  identificationNumber: z.string().min(1, "Número do documento é obrigatório"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => {
        const mp = new (window as any).MercadoPago('YOUR_PUBLIC_KEY', {
          locale: 'pt-BR',
        });

        const cardForm = mp.cardForm({
          amount: "0.01",
          autoMount: false,
          form: {
            id: "form-checkout",
            cardholderName: {
              id: "form-checkout__cardholderName",
            },
            cardNumber: {
              id: "form-checkout__cardNumber",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
            },
            securityCode: {
              id: "form-checkout__securityCode",
            },
            installments: {
              id: "form-checkout__installments",
            },
            identificationType: {
              id: "form-checkout__identificationType",
            },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
            },
            issuer: {
              id: "form-checkout__issuer",
            },
          },
          callbacks: {
            onSubmit: async (event: any) => {
              event.preventDefault();

              const {
                token,
                issuerId,
                paymentMethodId,
              } = cardForm.getCardFormData();

              // Enviar ao backend
              const response = await fetch('/api/credit', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...data,
                  cardToken: token,
                  issuerId: issuerId,
                }),
              });

              const result = await response.json();
              console.log(result);
            },
          },
        });

        cardForm.createCardToken();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='max-w-[400px] bg-white rounded-lg p-5 mx-auto mt-[15vh]'>
      <form className='flex flex-col gap-5' id="form-checkout" onSubmit={handleSubmit(onSubmit)}>
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

        <Select {...register('identificationType')}>
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

        <Button type="submit">Pagar</Button>
      </form>
    </div>
  );
};

export default Checkout;

