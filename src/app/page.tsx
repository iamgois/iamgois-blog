import PostList from "../components/PostContent";
import Navbar from "../components/Navbar";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="sm:mx-[10%] mx-[10px]">
        <p className="font-thin text-xs mt-6">Ultimas postagens</p>
        <PostList />
      </div>
      <Link className="fixed bottom-5 right-5 bg-zinc-800 p-2 rounded-full transition hover:bg-zinc-700" href="/login">
          <Plus />
        </Link>
    </div>
  );
}
