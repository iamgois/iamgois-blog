import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../app/globals.css";
import { ArrowLeft, Loader2, Plus } from "lucide-react";

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Conecte-se ao banco de dados MongoDB
  const client = new MongoClient(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  // Consulte a postagem no banco de dados
  const db = client.db(process.env.dbName);
  const collection = db.collection(process.env.collectionName);

  // Converta a string em um objeto ObjectId

  const posts = await collection.find({}).toArray();
  const post = posts;
  await client.close();

  return {
    props: {
      initialPost: JSON.parse(JSON.stringify(post)),
    },
  };
}

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/user_posts`);
      const data = await response.json();

      const idParam = id;
      const filteredItem = data.filter((item) => item._id === idParam);
      setPost(filteredItem[0]);
    };

    fetchPost();
  }, []);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen w-screen absolute top-0 left-0 bg-zinc-900">
        <Loader2 width={54} height={54} className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <a className="fixed bottom-5 right-5 bg-zinc-800 p-2 rounded-full transition hover:bg-zinc-700" href="/login">
        <Plus />
      </a>
      <Navbar />
      <div className="sm:mx-[10%] mx-[10px] pb-4">
        <a href="/"><ArrowLeft className="mt-5" /></a>
        <h1 className="mt-6 font-bold text-3xl">{post.title}</h1>
        <p className="text-xs mt-2 text-zinc-500">Publicado em {post.createdAt}</p>
        <p className="mt-2">{post.subtitle}</p>
      </div>
    </div>
  );
}

export default Post;
