import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { title, subtitle } = req.body;

  try {
    // Conecte-se ao banco de dados MongoDB
    const { db } = await connectToDatabase();

    // Insira o novo post no banco de dados
    await db.collection('user_posts').insertOne({
      title,
      subtitle,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    });

    res.status(200).json({ message: 'Post created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
