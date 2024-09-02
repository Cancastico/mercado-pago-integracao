"use client"

import pingado from "@/../public/pingado.png"
import PayMeCoffe from "@/components/forms/payMeCoffe/page"
import { Option } from "@/models/option"
import { useEffect, useState } from "react"
import { loadMercadoPago } from "@mercadopago/sdk-js";
import dotenv from 'dotenv';
import Checkout from "@/components/forms/checkOut/page"
dotenv.config();

export default function Component() {
  const [selectedOption, setSelectedOption] = useState<Option>({ label: 'Express', description: 'O café indispensavel de padóca de SP.', value: 2, image: pingado })
  const [step, setStep] = useState<'1' | '2'>('1')
  function nextStep() {
    setStep('2')
  }

  return (
    <section className="h-[100dvh] w-[100dvw] flex flex-col justify-center items-center">
      {step == '1' && (
        <PayMeCoffe
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          nextStep={nextStep}
        ></PayMeCoffe>
      )}
      {step == '2' && (
        <>
          <Checkout item={selectedOption} />
        </>
      )}
    </section>
  )
}
