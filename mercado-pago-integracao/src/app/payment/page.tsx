"use client"
import OptionInfoCard from "@/components/cards/infoOptionCard/page";
import Checkout from "@/components/forms/checkOut/page";
import { useOption } from "@/store/optionStore";

export default function Page() {
  const { data } = useOption();
  console.log(data);
  return (
    <section className="p-5 flex gap-5 justify-center">
      <div className="w-1/2 bg-white rounded-lg px-5">
        <Checkout item={data} nextStep={() => { console.log('pasosu pro proximo passo') }} />
      </div>
      <div className="w-1/3 bg-white rounded-lg h-fit py-6 p-8">
        <OptionInfoCard data={data} />
      </div>
    </section>
  );
}