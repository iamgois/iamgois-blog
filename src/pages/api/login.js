import { connectToDatabase } from '../../utils/mongodb';
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Todos podem fazer requisição na API

export async function getServerSideProps(context) {
  // Verifique se o cookie de autenticação existe
  const isLoggedIn = context.req.cookies.isLoggedIn === 'true';

  if (!isLoggedIn) {
    // Redirecione para a página de login caso o usuário não esteja autenticado
    return {
      redirect: {
        destination: '/create-post',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { username, password } = req.body;

  try {
    // Conecte-se ao banco de dados MongoDB
    const { db } = await connectToDatabase();

    // Consulte o banco de dados para autenticar as credenciais
    const user = await db.collection('users').findOne({ username, password });

    if (user) {
      // Defina o cookie de autenticação
      res.setHeader('Set-Cookie', 'isLoggedIn=true; Path=/');

      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}