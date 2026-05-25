import { drizzle as neonDrizzle } from "drizzle-orm/neon-http";
import { drizzle as defaultDrizzle } from "drizzle-orm/node-postgres";

import { env } from "../../env";
import * as schema from "./schema";

const createDb = () => {
  if (env.DB_TYPE === "Default")
    return defaultDrizzle(env.DATABASE_URL, { schema });
  return neonDrizzle(env.DATABASE_URL, { schema });
};

export const db = createDb();
