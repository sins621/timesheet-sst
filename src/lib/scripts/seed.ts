import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { seed } from "drizzle-seed";

const main = async () => {
  await seed(db, schema).refine((funcs) => ({
    user: {
      count: 10,
      columns: {
        id: funcs.uuid(),
        name: funcs.firstName({ isUnique: true }),
        email: funcs.email(),
        emailVerified: funcs.boolean(),
        image: funcs.valuesFromArray({ values: ["https://picsum.photos/200"] }),
      },
      with: {
        session: 5,
        account: 2,
      },
    },
    session: {
      columns: {
        expiresAt: funcs.date({ minDate: "2025-06-01", maxDate: "2027-12-31" }),
        token: funcs.uuid(),
      },
    },
    account: {
      columns: {
        accountId: funcs.uuid(),
        providerId: funcs.valuesFromArray({
          values: ["google", "github", "credentials"],
        }),
        accessToken: funcs.uuid(),
        refreshToken: funcs.uuid(),
        idToken: funcs.uuid(),
        password: funcs.loremIpsum(),
      },
    },
    verification: {
      count: 20,
      columns: {
        identifier: funcs.email(),
        value: funcs.uuid(),
        expiresAt: funcs.date({ minDate: "2025-01-01", maxDate: "2027-12-31" }),
      },
    },
  }));
};

main();
