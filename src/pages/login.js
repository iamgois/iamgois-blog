import '../app/globals.css'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import Head from 'next/head'

export async function getServerSideProps(context) {
    // Verifique se o cookie de autenticação existe
    const isLoggedIn = context.req.cookies.isLoggedIn === 'true';

    if (isLoggedIn) {
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

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Login bem-sucedido, redirecione para a página adequada
                window.location.href = '/create-post';
                localStorage.setItem('isLogged', 'Yes')
            } else {
                // Credenciais inválidas
                const error = document.getElementById('erro-login')

                error.style.display = 'block'
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col text-center h-screen'>
            <Head>
                <title>Nord Blog - Login</title>
            </Head>
            <Navbar />
            <form className='grid gap-2 items-center justify-center mt-32' onSubmit={handleSubmit}>
                <h1 className='font-bold text-2xl'>Entre agora 😁</h1>
                <input
                    required
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='bg-zinc-700 rounded-md p-2'
                    placeholder='Email'
                />
                <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='bg-zinc-700 rounded-md p-2'
                    placeholder='Senha'
                />
                <p className='bg-red-600 bg-opacity-70 px-6 py-2 rounded-md hidden' id='erro-login'>Desculpe, este usuário não existe.</p>
                <button className='bg-zinc-800 hover:bg-zinc-700 py-2 rounded-md' type="submit">Entrar</button>
            </form>
        </div>
    );
}