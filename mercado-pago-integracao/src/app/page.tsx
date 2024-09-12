"use client"

import Checkout from "@/components/forms/checkOut/page"
import PayMeCoffe from "@/components/forms/payMeCoffe/page"
import { Option } from "@/models/option"
import dotenv from 'dotenv'
import { useState } from "react"
dotenv.config();

export default function Component() {
  const [selectedOption, setSelectedOption] = useState<Option>({ label: 'TESTE 1', description: '', value: 2, image: null })
  const [step, setStep] = useState<number>(1)
  function nextStep() {
    setStep(prevStep => prevStep + 1);
  }

  return (
    <section className="h-[100dvh] w-[100dvw] flex flex-col">
      {step == 1 && (
        <div className=" w-full">
          <PayMeCoffe
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            nextStep={nextStep}

          ></PayMeCoffe>
        </div>
      )}
      {step == 2 && (
        <div className="max-w-[40dvw] overflow-y-auto bg-white rounded-l scroll-smooth scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-w-1 scrollbar scrollbar-track-transparent scrollbar-thumb-red-600 hover:scrollbar-track-[#f1f5f9]">
          <Checkout item={selectedOption} nextStep={nextStep} />
        </div>
      )}

      {step == 3 && (
        <div className="max-w-[40dvw] overflow-y-auto bg-white rounded-l scroll-smooth scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-w-1 scrollbar scrollbar-track-transparent scrollbar-thumb-red-600 hover:scrollbar-track-[#f1f5f9]">
          <p>FUNFOU</p>
        </div>
      )}
    </section>
  )
}
