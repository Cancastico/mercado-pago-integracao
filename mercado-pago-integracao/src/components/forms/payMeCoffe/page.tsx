"use client"

import comleite from "@/../public/comleite.png"
import gourmet from "@/../public/gourmet.png"
import pingado from "@/../public/pingado.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Option } from "@/models/option"
import Image from "next/image"

type Props = {
  selectedOption: Option,
  setSelectedOption: (data: Option) => void,
  nextStep: () => void,
}
export default function PayMeCoffe({ selectedOption, setSelectedOption, nextStep }: Props) {

  const options: Option[] = [
    { id: 1, label: 'Expresso', description: 'O café indispensavel da padóca de SP.', value: 2, image: pingado },
    { id: 2, label: 'Com leite', description: 'O bom e velho classico aconchegante.', value: 5, image: comleite },
    { id: 3, label: 'Gourmet', description: 'Aquele café especial pra animar seu dia.', value: 10, image: gourmet }
  ]
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className=" font-semibold text-3xl flex flex-row gap-3 items-center">
          Pagamentos
        </CardTitle>
        <CardDescription>Escolha sua opção.</CardDescription>
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
                      src={option.image!}
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
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-medium">Você selecionou: {selectedOption.label}</span>
          </div>
          <Button onClick={nextStep} variant="outline" className="shrink-0 bg-black hover:bg-black/80 text-white hover:text-white">
            Pagar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}