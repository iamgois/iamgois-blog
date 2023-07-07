import "../app/globals.css";
import Navbar from "../components/Navbar";

export default function createPost() {
  return (
    <div>
      <Navbar />

      <form
        action="/"
        className="flex flex-col sm:mx-[10%] mx-[10px] mt-4 items-center justify-center"
      >
        <input
          required
          className="bg-zinc-700 px-2 py-5 rounded-md"
          type="text"
          name="title"
          id="title"
          placeholder="Título"
        />
        <input
          required
          rows={5}
          cols={5}
          className="bg-zinc-700 px-2 py-2 mt-2 h-24 rounded-md"
          type="text"
          name="subtitle"
          id="subtitle"
          placeholder="Conteúdo"
        />
        <button
          type="submit"
          className="bg-zinc-800 hover:bg-zinc-700 h-12 w-36"
        >
          Postar
        </button>
      </form>
    </div>
  );
}
