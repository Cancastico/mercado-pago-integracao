"use client"

import PayMeCoffe from "@/components/forms/payMeCoffe/page"
import { useOption } from "@/store/optionStore"
import dotenv from 'dotenv'
import { useRouter } from "next/navigation"
dotenv.config();

export default function Component() {
  const { data, setData } = useOption()
  const router = useRouter();


  return (
    <section className="h-[100dvh] w-[100dvw] flex flex-col justify-center items-center">
        <PayMeCoffe
          selectedOption={data}
          setSelectedOption={setData}
          nextStep={() => {router.push('/payment') }}
        ></PayMeCoffe>
    </section>
  )
}
