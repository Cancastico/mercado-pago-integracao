import { Option } from '@/models/option';
import { create } from 'zustand';
import pingado from "@/../public/pingado.png"

type OptionState = {
    data: Option;
    setData: (data: Option) => void;
};

const useOption = create<OptionState>((set) => ({
    data: { label: 'Expresso', description: 'O café indispensavel da padóca de SP.', value: 2, image: pingado },
    setData: (data: Option) => set({ data }),
}));

export { useOption };
