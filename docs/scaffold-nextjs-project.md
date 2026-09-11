# Scaffold NextJS Project

## [Install NextJS](https://nextjs.org/docs/app/getting-started/installation)

```bash
cd <projectname>
npx create-next-app@latest .
rm public/*.svg
mkdir -p docs
```

### Replace `app/page.tsx`

```tsx
export default async function RootHomePage() {
  return (
    <article>
      <h1>Home Page</h1>
      <p> Simple template</p>
    </article>
  );
}
```

## Install ShadCn

Use [Shadcn Create](https://ui.shadcn.com/create) to customize your theme

```bash
npx shadcn@latest init --preset b89CbxUETY --template next --pointer
npx shadcn@latest add sonner separator
```

### Add some helper classes to the bottom of `app/globals.css`

```css
@utility no-scrollbar {
  @apply scrollbar-none [&::-webkit-scrollbar]:hidden;
  @apply overflow-y-auto;
}
@utility max-w-container {
  @apply container mx-auto;
}
```

## Add [Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)

```bash
npm install next-themes
mkdir -p components/client
touch components/client/GlobalProviders.tsx components/client/ThemeProvider.tsx components/client/LightDarkButton.tsx
```

### Create a ThemeProvider in `components/client/ThemeProvider.tsx`

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Use a Global Provider in `components/client/GlobalProviders.tsx`

```tsx
"use client";

import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const GlobalProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster position="top-center" richColors closeButton expand={true} />
      {children}
    </ThemeProvider>
  );
};
export default GlobalProviders;
```

This way we do not have have many providers inside the `layout.tsx` file. Do not forget to modify `app/layout.tsx` file to use the `GlobalProviders`

### Add `components/client/LightDarkButton.tsx` to toggle between ligth and dark mode

```tsx
"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export function LightDarkButton() {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMode}
      className="cursor-pointer"
    >
      <IconMoon className="h-fit w-fit scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <IconSun className="absolute h-fit w-fit scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
export default LightDarkButton;
```

### Linting rules for `components/client`

To ensure that all `tsx` files inside the `components/client` folder contain the `"use client";` directive use the following linting rule in `eslint.config.mjs`

```
{
files: ["components/client/**/*.tsx"],
rules: {
  "no-restricted-syntax": [
    "error",
    {
      selector:
        'Program:not(:has(> ExpressionStatement[directive="use client"]))',
      message: 'This file must have a "use client" directive.',
    },
  ],
},
}
```

## Create some [Routing Files](https://nextjs.org/docs/app/getting-started/project-structure#routing-files) and app wide config

```bash
touch app/loading.tsx app/not-found.tsx app/error.tsx lib/config.ts .env
```

### `app/loading.tsx`

```tsx
import { IconRotateClockwise } from "@tabler/icons-react";

const loading = () => {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 z-50 bg-secondary opacity-10">
      <div className="flex h-full justify-center items-center ">
        <IconRotateClockwise className="animate-spin" size={64} />
      </div>
    </div>
  );
};

export default loading;
```

### `app/not-found.tsx`

```tsx
const MainNotFound = () => {
  return (
    <div className="h-screen flex flex-col gap-y-8 items-center justify-center">
      <h2 className="text-xl">404 - Not Found</h2>
      <p className="text-3xl">
        The Page You were looking for could not be found
      </p>
    </div>
  );
};

export default MainNotFound;
```

### `app/error.tsx`

```tsx
"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { toast } from "sonner";

export default function MainErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Site wide config in `lib/config.ts`

```ts
type SiteConfig = {
  db: DBConfig;
};
type DBConfig = {
  url: string;
  urlProd: string;
};

const cfg: SiteConfig = {
  db: {
    url: getEnvOrThrow("DATABASE_URL"),
    urlProd: getDBurlForProd(),
  },
};

export default cfg;

function getDBurlForProd(): string {
  try {
    return getEnvOrThrow("DATABASE_URL_PROD");
  } catch (err) {
    console.log(err);
    return getEnvOrThrow("DATABASE_URL");
  }
}

function getEnvOrThrow(envName: string): string {
  const envValue = process.env[envName];
  if (!envValue) {
    throw new Error(`ENV variable ${envName} not found`);
  }
  return envValue;
}
```

## Setup Typeset from Shadcn

Read the typeset [docs](https://ui.shadcn.com/docs/typeset) and then generate a [custom typeset](https://ui.shadcn.com/typeset) if needed. You may skip the step to add fonts if you used [shadcn create](https://ui.shadcn.com/create) before.

```bash
touch app/typeset.css
```

### Remember to import `typeset.css` inside `app/globals.css`

```css
/* globals.css */
@import "tailwindcss";
@import "./typeset.css";
```

#### Potential Changes to `app/typeset.css`

you may have to make small changes to the file depending on what fonts for chosen when creating the shadcn theme. Here is how my file looks like

```css
@layer components {
  .typeset {
    --typeset-font-body: var(--font-serif);
    --typeset-font-heading: var(--font-heading);
    --typeset-font-mono: var(--font-geist-mono);
    --typeset-size: 1em;
    --typeset-leading: 1.75;
    --typeset-flow: 1.25em;
  }
}
```

### Wrap `app/layout.tsx` to use the default typeset for the whole site

```tsx
<body>
  <GlobalProviders>
    <main className="max-w-container typeset">{children}</main>
  </GlobalProviders>
</body>
```

Expect small changes to `layout` while adding headers and footers

## Headers and Footers (optional)

```bash
mkdir -p components/server
npm install server-only
touch components/server/RootHeader.tsx components/server/RootFooter.tsx
```

Note that we are putting server components in the `components/server` folder. We will later add linting rules that say all files in this folder have to start with `import "server-only";`

Import the `RootHeader` and `RootFooter` components into the main layout for a app wide header and footer.

### Linting help for server components. Add to `eslint.config.mjs`

```
  {
    files: ["components/server/**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          // Triggers an error if the first node under Program is NOT an ImportDeclaration for "server-only"
          selector:
            'Program > :first-child:not(ImportDeclaration[source.value="server-only"])',
          message: 'This file must start with: import "server-only";',
        },
      ],
    },
  },
```

## NextJS [Guide for MDX](https://nextjs.org/docs/app/guides/mdx)

Follow the guide to setup the relavant files needed. Use [MDX dynamic imports](https://nextjs.org/docs/app/guides/mdx#using-dynamic-imports) to show markdown files from the docs folder

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
touch mdx-components.tsx
mkdir -p app/docs/\[slug\]
touch app/docs/\[slug\]/page.tsx
```

## Install [Drizzle ORM](https://orm.drizzle.team/docs/get-started/postgresql-new) + [Zod](https://zod.dev/)

```bash
npm i drizzle-orm@rc pg zod
npm i -D drizzle-kit@rc tsx @types/pg
mkdir -p lib/db/schemas
touch lib/db/index.ts drizzle.config.ts drizzle.config.prod.ts
```

### Create `./lib/db/index.ts`

```ts
import { drizzle } from "drizzle-orm/node-postgres";
import cfg from "@/lib/config";

export const db = drizzle(cfg.db.url);
```

- Create `./drizzle.config.ts` for local development

```ts
import cfg from "./lib/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schemas/**/*.ts",
  out: "./lib/db/migrations/local",
  dialect: "postgresql",
  dbCredentials: {
    url: cfg.db.url,
  },
});
```

- Create `./drizzle.config.prod.ts` for the production database

```ts
import cfg from "./lib/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schemas/**/*.ts",
  out: "./lib/db/migrations/prod",
  dialect: "postgresql",
  dbCredentials: {
    url: cfg.db.urlProd,
    ssl: "require",
  },
});
```

- Add helper scripts to `./package.json`

```

"db:generate:dev": "drizzle-kit generate",
"db:migrate:dev": "drizzle-kit migrate",
"db:check:dev": "drizzle-kit check",
"db:dev": "npm run db:generate:dev && npm run db:migrate:dev && npm run db:check:dev",
 "db:generate:prod": "drizzle-kit generate --config drizzle.config.prod.ts",
 "db:migrate:prod": "drizzle-kit migrate --config drizzle.config.prod.ts",
 "db:check:prod": "drizzle-kit check --config drizzle.config.prod.ts",
 "db:prod": "npm run db:generate:prod && npm run db:migrate:prod && npm run db:check:prod",

```

## Setup Server Components, Client Components and Server Actions

```bash
mkdir -p lib/actions
```

### Linting help for server actions. Add to `eslint.config.mjs`

```
  {
    files: ["lib/actions/**/*.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            'Program:not(:has(> ExpressionStatement[directive="use server"]))',
          message: 'This file must have a "use server" directive.',
        },
      ],
    },
  },
```

## Setup ReactHookForms and Resolvers

```bash
npm install react-hook-form @hookform/resolvers
```

## Setup Better Auth

## Adding New Features

### Notes on Directory structure for new features

- All new features go in the `features` directory. All code only used by the feature should go into its respective directory. for example if we are making a standalone **Tic Tac Toe** app, then the directory structure will be as shown in the example.

### Example of directory structure

```bash
git switch -c features/tic-tac-toe
mkdir -p features/tic-tac-toe
touch features/tic-tac-toe/TicTacToe.tsx
mkdir -p features/tic-tac-toe/components/client
mkdir -p features/tic-tac-toe/components/server
mkdir -p features/tic-tac-toe/lib/actions
mkdir -p features/tic-tac-toe/lib/db
mkdir -p app/tic-tac-toe
touch app/tic-tac-toe/page.tsx
```
