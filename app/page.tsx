import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function RootHomePage() {
  return (
    <article>
      <h1>Home Page</h1>
      <p> Simple template</p>
      <Separator className="my-4" />

      <Link href="/dashboard">Protected Route DashBoard</Link>

      <Separator className="my-4" />

      <section>
        <h2>Docs</h2>
        <ul>
          <li>
            <Link href="/docs/scaffold-nextjs-project">
              Scaffold NextJS Project
            </Link>
          </li>
        </ul>
      </section>

      <Separator className="my-4" />
    </article>
  );
}
