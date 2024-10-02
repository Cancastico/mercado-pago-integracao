import { Label } from "@/components/ui/label";
import { formatToTwoDecimals } from "@/lib/utils";
import { Option } from "@/models/option";
import Image from "next/image";

type Props = {
  data: Option;
}
export default function OptionInfoCard({ data }: Props) {
  return (
    <div className="w-full flex-col gap-5">
      <div className="bg-zinc-500 text-white rounded-t-xl py-3 px-8">
        <Label className="text-lg font-semibold">Resumo do Pedido:</Label>
      </div>
      <div className="py-4 px-8">
        <div className="">
          <Label className="text-base font-light">1x -  {data.label}</Label>
        </div>
        <div className="flex flex-col">
          <Label className="text-base">Descrição:</Label>
          <Label className="text-base font-light">{data.description}</Label>
        </div>
        <div className="flex flex-row justify-between">
          <Label className="text-base">Total:</Label>
          <Label className="text-base font-light">BRL {formatToTwoDecimals(data.value)}</Label>
        </div>
        {data.image && (
          <div className="flex-col flex items-center">
            <Image className="max-w-[100px]" src={data.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}