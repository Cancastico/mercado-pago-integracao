"use client"
import OptionInfoCard from "@/components/cards/infoOptionCard/page";
import Checkout from "@/components/forms/checkOut/page";
import { useOption } from "@/store/optionStore";

export default function Page() {
  const { data } = useOption();

  return (
    <section className="p-5 flex gap-5 justify-center">
      <div className="w-1/2 bg-white rounded-xl">
        <Checkout item={data} />
      </div>
      <div className="w-1/3 bg-white rounded-xl h-fit">
        <OptionInfoCard data={data} />
      </div>
    </section>
  );
}