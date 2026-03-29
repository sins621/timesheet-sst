import { createLoader, parseAsString, parseAsInteger } from "nuqs/server";

export const userSearchParams = {
  userId: parseAsString.withDefault(""),
  filter: parseAsString.withDefault(""),
  chapter: parseAsInteger.withDefault(1),
};

export const loadSearchParams = createLoader(userSearchParams);
