import { Github, Plus } from "lucide-react";
import Link from "next/link";

export default function Navbar(){
    return(
        <div className="bg-zinc-800 h-24 w-full flex items-center justify-between p-5">
        <Link href="/" className="font-bold text-xl">Nord</Link>
        <Link
          className="hover:text-zinc-300"
          href="https://github.com/iamgois/iamgois-blog"
        >
          <Github />
        </Link>
      </div>
    )
}