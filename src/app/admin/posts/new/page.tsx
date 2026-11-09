import type { Metadata } from "next";
import { PostForm } from "../PostForm";

export const metadata: Metadata = {
  title: "New Article | Admin | LawAge Advocates",
};

export default function NewPostPage() {
  return <PostForm post={null} />;
}

