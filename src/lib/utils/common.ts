import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AuthHeaders } from "../types/common";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const constructBearerAuthHeaders = (token: string): AuthHeaders => {
  return { Authorization: `Bearer ${token}` };
};

export const constructBasicAuthHeaders = (
  username: string,
  password: string,
): AuthHeaders => {
  return {
    Authorization:
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
  };
};
