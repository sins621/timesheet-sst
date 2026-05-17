import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// B.C. I don't feel like moving this and updating all the paths
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
