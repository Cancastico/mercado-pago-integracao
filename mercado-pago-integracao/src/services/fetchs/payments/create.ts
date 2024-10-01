import { PaymentCreateRequest } from "@/@types/mercadoPago";
import { AxiosNode } from "@/services/axios";

export default function PaymentCreate(data:PaymentCreateRequest){
    try {
        return AxiosNode.post<{payment:PaymentData}>('/payments', data);
    } catch (error:any) {
        throw new Error('Error on create Payment')
    }
} 