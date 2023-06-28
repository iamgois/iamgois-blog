import { Github } from "lucide-react";
import PostList from "../components/PostContent";

export default function Home() {
  return (
    <div>
      <div className="bg-zinc-800 h-24 w-full flex items-center justify-between p-5">
        <h1 className="font-bold text-xl">Nord</h1>
        <a
          className="hover:text-zinc-300"
          href="https://github.com/iamgois/iamgois-blog"
        >
          <Github />
        </a>
      </div>
      <div className="mx-96">
        <p className="font-thin text-xs mt-6">Ultimas postagens</p>
        <PostList />
      </div>
    </div>
  );
}
