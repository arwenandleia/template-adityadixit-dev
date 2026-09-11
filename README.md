# My NextJS Template

## File and Directory Structure

- `./app/` : NextJS App router. Use this for routing only. Individual components go in the `./components/` folder depending on what they are doing
- `./components/client/` : Global client components. All files in this directory require the `"use client";` directive.
- `./components/server/` : Server Components. By default all NextJS components are server components, but we go one step further here by needing the `import "server-only";` for all files in this folder.
- `./components/ui/` : Default directory for ShadCn components. Try and keep it that way. I may add custom UI components here, but as a general rule only shadcn stuff goes here.
- `./lib/` : Non-Component logic goes here. For example global database schemas and global server actions go here.
- `./lib/db/index.ts` : Exporting the `db` from here to be used everywhere
- `./lib/db/schemas/` : Database schemas go here. Ideally you only want globally used tables to go in here. Schemas specific to a certain feature are better off in their own folder.

### Adding a new independant feature

We will use the same directory structure for a new feature. Lets say we want a new feature called `tic-tac-toe`. I would use the following steps.

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

Always switch to a new feature branch when working on it. If you need new global components for the feature branch, it is better to switch to the main branch, add the global functionality and then rebase the feature branch

As you can see the directory structure is the same. `components/client`, `components/server`, `lib/actions` will hold client components, server components, and server actions respectively. The same linting rules will apply here.

### Script for switching to a new branch and scaffolding directory structure

We can use `./scripts/create-feature.sh tic-tac-toe` to achieve the same result. The script will not add a routing page and that will have to be done manually still

```bash
#!/usr/bin/env bash

set -e

FEATURE_NAME="$1"
FEATURE_DIR="features/$FEATURE_NAME"

if [ -z "$FEATURE_NAME" ]; then
  echo "Usage: $0 <feature-name>"
  exit 1
fi

git switch -c "features/$FEATURE_NAME"

mkdir -p "$FEATURE_DIR"
touch "$FEATURE_DIR/${FEATURE_NAME//-/}.tsx"

mkdir -p "$FEATURE_DIR/components/client"
mkdir -p "$FEATURE_DIR/components/server"
mkdir -p "$FEATURE_DIR/lib/actions"
mkdir -p "$FEATURE_DIR/lib/db"

echo "Feature '$FEATURE_NAME' created successfully."
```
