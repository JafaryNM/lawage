import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getDbPostById } from "@/lib/cms-server";
import { PostForm } from "../PostForm";

export const metadata: Metadata = {
  title: "Edit Article | Admin | LawAge Advocates",
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getDbPostById(Number(id));
  if (!post) notFound();

  return <PostForm post={post} />;
}

