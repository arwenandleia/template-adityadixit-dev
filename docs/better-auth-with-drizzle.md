# Better Auth with NextJS and Drizzle

- [Better Auth Installation](https://better-auth.com/docs/installation)
- [Drizzle ORM Adapter](https://better-auth.com/docs/adapters/drizzle)
- [NextJS Integration](https://better-auth.com/docs/integrations/next)

## Installation

- Install better auth and the respective drizzle adapter

```bash
npm install better-auth
npm install @better-auth/drizzle-adapter
```

- Set Env variables according the documentations.

```
BETTER_AUTH_SECRET=32characters-secret-here
BETTER_AUTH_URL=http://localhost:3000
```

- Create `/lib/auth.ts` according to the [docs](https://better-auth.com/docs/adapters/drizzle#example-usage)

```ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
```

- Generate a schema

```bash
npx auth@latest generate
```

## **HERES WHERE IT GETS TRICKY**

The newer RC version of drizzle has some breaking changes. so make some modifications to our files now

- Update `auth.ts` with the newer adapter
- Move the previously generate `auth-schema` file to yours schemas directory

```bash
mv auth-schema.ts lib/db/schemas
```

- Your new `auth.ts` file should look something like this.

```tsx
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "./db";
import * as schema from "./db/schemas/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
});
```

- Your old `auth-schema.ts` file is going to have some errors like follows. Remove those

```ts
import { relations } from "drizzle-orm";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));
....
```

- regenerate your schema files

```bash
npx auth@latest generate
```

- You should get a new `./auth-schema.ts` file in your project root. Replace the old auth-schema file with this new one

- Import those new `authRelations` into your main DB config at `lib/db/index.ts`

```ts
import { drizzle } from "drizzle-orm/node-postgres";
import cfg from "@/lib/config";
import { authRelations } from "@/auth-schema";

export const db = drizzle(cfg.db.url, {
  relations: { ...authRelations },
});
```

## Add [Authentication Methods](https://better-auth.com/docs/installation#authentication-methods)
