import type { Metadata } from "next";
import { PostsManager } from "./PostsManager";

export const metadata: Metadata = {
  title: "Legal Updates | Admin | LawAge Advocates",
};

export default function PostsPage() {
  return <PostsManager />;
}

