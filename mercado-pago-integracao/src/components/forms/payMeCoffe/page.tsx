"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Image, { StaticImageData } from "next/image"
import pingado from "@/../public/pingado.png"
import comleite from "@/../public/comleite.png"
import gourmet from "@/../public/gourmet.png"
import { CoffeeIcon } from "lucide-react"
import { Option } from "@/models/option"

type Props = {
  selectedOption: Option,
  setSelectedOption: Dispatch<SetStateAction<Option>>,
  nextStep: () => void,
}
export default function PayMeCoffe({ selectedOption, setSelectedOption, nextStep }: Props) {
  const options: { label: string, description: string, value: number, image: StaticImageData }[] = [
    { label: 'Express', description: 'O café indispensavel de padóca de SP.', value: 2, image: pingado },
    { label: 'Com leite', description: 'O bom e velho classico aconchegante.', value: 5, image: comleite },
    { label: 'Gourmet', description: 'Aquele café especial pra animar seu dia.', value: 10, image: gourmet }
  ]
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-amber-900 font-semibold text-3xl flex flex-row gap-3 items-center">Pague-me um café <CoffeeIcon size={32} /> </CardTitle>
        <CardDescription>Escolha sua opção de café e faça uma doação para me apoiar.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Select value={selectedOption.label} onValueChange={(e) => { setSelectedOption(options.find((option) => { return option.label == e })!) }}>
          <SelectTrigger>
            <SelectValue className="p-3" placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent className="">
            {options.map((option, index) => {
              return (
                <SelectItem key={index} value={option.label}>
                  <div className="flex items-center gap-4">
                    <Image
                      src={option.image}
                      alt="Pingado"
                      width={30}
                      height={30}
                      className="rounded-md"
                      style={{ aspectRatio: "30/30", objectFit: "cover" }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{option.label}</h4>
                        <span className="text-muted-foreground">R${option.value}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">O café indispensavel de padóca de SP.</p>
                    </div>
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CoffeeIcon className="h-6 w-6 text-primary" />
            <span className="font-medium">Você selecionou: {selectedOption.label}</span>
          </div>
          <Button onClick={nextStep} variant="outline" className="shrink-0 bg-amber-900 hover:bg-amber-900/90 hover:text-white text-white">
            Pagar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}