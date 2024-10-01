"use client"

import PayMeCoffe from "@/components/forms/payMeCoffe/page"
import PreferenceCreate from "@/services/fetchs/preference/create"
import { useOption } from "@/store/optionStore"
import dotenv from 'dotenv'
import { useRouter } from "next/navigation"
import { useState } from "react"
dotenv.config();

export default function Component() {
  const [isLoading , setIsLoading] = useState<boolean>(false)
  const { data, setData } = useOption()
  const router = useRouter();


  async function generatePreference(){
    setIsLoading(true);
    await PreferenceCreate(data).then((response)=>{
      router.push('/payment')
      // window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${response.data.preference.id}`;
    }
  );
  }


  return (
    <section className="h-[100dvh] w-[100dvw] flex flex-col justify-center items-center">
        <PayMeCoffe
          selectedOption={data}
          setSelectedOption={setData}
          nextStep={generatePreference}
        ></PayMeCoffe>
    </section>
  )
}
