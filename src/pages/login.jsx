import Navbar from '../components/Navbar'
import "../app/globals.css";

export default function Login(){
    return(
        <div className='h-screen'>
            <Navbar />
            <form className='flex items-center justify-center h-96 flex-col mt-16' action="/create-post" method='POST'>
                <input required type="text" name="name" id="name" placeholder='username' className='px-5 py-2 m-2 rounded-md bg-zinc-700' />
                <input required type="password" name="password" id="password" placeholder='password' className='px-5 py-2 m-2 rounded-md bg-zinc-700' />
                <button type="submit" className='px-8 py-2 bg-zinc-800 rounded-md m-2 hover:bg-zinc-700'>Entrar</button>
            </form>
        </div>
    )
}