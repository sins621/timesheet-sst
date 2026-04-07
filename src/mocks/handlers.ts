import { http, HttpResponse } from "msw";
import user from "./data/github-tanstack.json";

export const handlers = [
  http.get("https://api.github.com/repos/TanStack/query", () => HttpResponse.json(user)),
];
