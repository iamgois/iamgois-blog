import { MongoClient } from 'mongodb';
import { useRouter } from 'next/router';
import { ObjectId } from 'bson';
import { useEffect, useState } from 'react';

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
  const objectId = ObjectId.createFromHexString(id);

  const post = await collection.findOne({ _id: objectId });

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
        const response = await fetch(`/api/user_posts?id=${id}`);
        const data = await response.json();
        console.log(data)
        setPost(data);
      };
  
      fetchPost();
    }, []);
  
    if (!post) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.subtitle}</p>
      </div>
    );
  }
  
  export default Post;