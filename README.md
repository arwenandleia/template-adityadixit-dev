# My NextJS Template

## Initial Steps

- Install dependencies using `npm install`
- Copy the `.env.sample` file to `.env`
- **OPTIONAL** : Customize your theme using [Shadcn Create](https://ui.shadcn.com/create)
- **OPTIONAL** : Make corresponding changes to the fonts in `./app/typeset.css` according to the [Typeset Docs](https://ui.shadcn.com/docs/typeset)
- use the `./scripts/create-feature.sh` script to help create directory structure for a new feature. More on this below
- Remember to generate and migrate your database if not already done

## Suggested Git Workflow

1. **Update Local Main** : This ensures you have the latest code before starting

```bash
git switch main
git pull origin main
git status
```

2. **Create Feature Branch** : Isolate work from production

```bash
git switch -c feature/tic-tac-toe
```

3. **Save and Commit** : Save and create commits on feature branch. use `git add .` with caution. It might make more sense to use something like **lazygit** and individually select files you want to add.

```bash
git status
git add .
git commit -m "feat: adding game board"
```

4. **Push Feature to Remote** : Upload the feature branch to remote server like github. We use the `-u` flag so that next time we want to push to remote we can just use `git push`

```bash
git push -u origin feature/tic-tac-toe
```

5. **Open a Pull Request** : Hopefully should trigger relevant CI-CD pipelines before merging into main. Review the pull request and merge into main if everything looks good.

6. **Clean Up Local** : switch back to main on local development and remove the feature branch.

```bash
git switch main
git pull origin main
git branch -d feature/tic-tac-toe
```

### Adding minor changes to the previous latest commit

Lets say you commit something and later figure out that only a small typo or minor styling change needs to be done. you dont have to create a whole new commit for it. you can just stage the relevant change and then commit it to the previous commit.
**NOTE** : This will create a new commit hash so **DO NOT** use it if that commit has been used elsewhere in any form

```bash
git commit --amend --no-edit
```

## Stack Used

- Hosting : Vercel
- Framework : NextJS + TS + MDX
- UI Library : ShadCn + Tabler Icons + Dark Mode + Typeset
- Database ORM : Drizzle
- Validations : Zod
- Database : Postgres (NeonDB)
- Forms : React Hook Forms

### Yet To Implement

- Authentication : Better Auth
- Email : Resend
- Error Monitorings : Sentry
- AI SDK : AI SDK from Vercel
- Payment : Polar
- Analytics : Inbuild Vercel.

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
```

Always switch to a new feature branch when working on it. If you need new global components for the feature branch, it is better to switch to the main branch, add the global functionality and then rebase the feature branch

As you can see the directory structure is the same. `components/client`, `components/server`, `lib/actions` will hold client components, server components, and server actions respectively. The same linting rules will apply here.

We can use `./scripts/create-feature.sh tic-tac-toe` to achieve the same result. The script will not add a routing page and that will have to be done manually still
