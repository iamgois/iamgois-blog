import { Github } from "lucide-react";

export default function Navbar(){
    return(
        <div className="bg-zinc-800 h-24 w-full flex items-center justify-between p-5">
        <a href="/" className="font-bold text-xl">Nord</a>
        <a
          className="hover:text-zinc-300"
          href="https://github.com/iamgois/iamgois-blog"
        >
          <Github />
        </a>
      </div>
    )
}