import { PaymentCreateRequest } from "@/@types/mercadoPago";
import { AxiosNode } from "@/services/axios";

export default function PaymentCreate(data:PaymentCreateRequest){
    try {
        return AxiosNode.post('/payments', data);
    } catch (error:any) {
        
    }
} 