import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function RootHomePage() {
  return (
    <article>
      <h1>Home Page</h1>
      <p> Simple template</p>
      <Separator className="my-4" />

      <ul>
        <li>
          <Link href="/docs/scaffold-nextjs-project">
            Scaffold NextJS Project
          </Link>
        </li>
      </ul>
    </article>
  );
}
