import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToTwoDecimals(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00'; // Retorna "0.00" para null ou undefined
  }
  
  return value.toFixed(2);
}

