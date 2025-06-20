import { getSortedPostsData } from "@/lib/posts";
import ArchiveClient from "./ArchiveClient";

export default function ArchivePage() {
  const allPosts = getSortedPostsData();

  return <ArchiveClient allPosts={allPosts} />;
}
