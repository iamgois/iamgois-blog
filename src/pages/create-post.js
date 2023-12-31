import '../app/globals.css'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'
import Head from 'next/head'

export async function getServerSideProps(context) {
  // Verifique se o cookie de autenticação existe
  const isLoggedIn = context.req.cookies.isLoggedIn === 'true';

  if (!isLoggedIn) {
    // Redirecione para a página de login caso o usuário não esteja autenticado
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, subtitle }),
      });

      if (response.ok) {
        // Post criado com sucesso, redirecione para a página adequada
        router.push('/');
      } else {
        console.log('Erro ao criar o post');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col text-center h-screen'>
      <Head>
        <title>Nord Blog - Create Post</title>
      </Head>
      <Navbar />
      <h1 className='font-bold text-3xl mt-4'>Create Post</h1>
      <form className='grid gap-2 items-center justify-center mt-4' onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='bg-zinc-700 rounded-md p-2 sm:w-96 w-72'
            placeholder='Título'
            required
          />
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className='bg-zinc-700 rounded-md p-2 sm:w-96 w-72 h-72'
            placeholder='Conteúdo'
            style={{ whiteSpace: 'pre-wrap' }}
            required
          />
        <button type="submit" className='bg-zinc-800 hover:bg-zinc-700 py-2 rounded-md'>Postar</button>
      </form>
    </div>
  );
}