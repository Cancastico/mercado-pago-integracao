import { StaticImageData } from "next/image";

export interface Option { id: number, label: string, description: string, value: number, image: StaticImageData | null }
