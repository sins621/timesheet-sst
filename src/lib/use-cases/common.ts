import type { AuthHeaders } from "../types/common";

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
