import { Option } from "@/models/option";
import { PreferenceResponse } from "@/models/preference";
import { AxiosNode } from "@/services/axios";

export default function PreferenceCreate(item: Option) {
    return AxiosNode.post<{ preference: PreferenceResponse }>('/preferences', {
        id: item.id,
        price: item.value,
        coffeeType: item.label,
    });
} 