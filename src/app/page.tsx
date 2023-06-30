import PostList from "../components/PostContent";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="sm:mx-[10%] mx-[10px]">
        <p className="font-thin text-xs mt-6">Ultimas postagens</p>
        <PostList />
      </div>
    </div>
  );
}
