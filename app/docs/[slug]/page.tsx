import { readdir } from "fs/promises";

const CONTENT_DIRECTORY = "docs";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/${CONTENT_DIRECTORY}/${slug}.md`);
  return <Post />;
}

export async function generateStaticParams() {
  const files = await readdir(CONTENT_DIRECTORY);
  const markdownFileNames = files
    .filter((file) => file.endsWith(".md"))
    .map((mdFile) => mdFile.split(".")[0]);

  return markdownFileNames.map((fileName) => ({ slug: fileName }));
}

export const dynamicParams = false;
