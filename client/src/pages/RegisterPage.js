import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');

    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
        })
        if(response.status === 200 && password !== "") {
            setRedirect(true);
        } else if(username === "") {
            setError('Enter a username.');
        } else if(password === "") {
            setError('Enter a password.');
        } else {
            setError('Unable to register. That username may already be taken. Please try again.');
        }
    }

    if(redirect) {
        return <Navigate to={'/login'} state={{ fromRegister: true }} />
    }

    return (
        <div className="bg-repeat-y vh bg-right" 
        style={{ backgroundImage: "url(/img/background.png)", backgroundSize: "100% auto"}}>
            <div className="flex flex-col vh bg-white md:bg-transparent md:mx-5 place-content-center md:w-1/2">
                {error &&
                    <div className="w-5/6 bg-red-400 mx-auto text-center text-white text-lg py-2 rounded-lg mb-5 border-2 border-solid border-red-500">
                        {error}
                    </div>
                }
                <Link to="/" className="text-4xl md:text-5xl text-center font-sansita text-slate mx-auto">Scheduleasy</Link>
                <div className="my-10 text-center">
                    <h1 className="font-fraunces font-bold text-4xl text-slate">Sign Up</h1>
                    <form className="max-w-sm mx-auto py-5" onSubmit={register}>
                        <div className="relative">
                            <input type="text" 
                                id="usernameInput" 
                                value={username}
                                onChange={ev => setUsername(ev.target.value)}
                                className="block my-6 px-2.5 pb-2.5 pt-4 w-full text-sm text-222 rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mint peer" 
                                placeholder="" />
                            <label for="usernameInput" className="absolute rounded-lg text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-mint peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Username</label>
                        </div>
                        <div className="relative">
                            <input type={visible ? "text" : "password"} 
                                id="passwordInput" 
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                className="block my-6 px-2.5 pb-2.5 pt-4 w-full text-sm text-222 rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mint peer" 
                                placeholder="" />
                            <label for="passwordInput" className="absolute rounded-lg text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-mint peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                            <div className="absolute right-0 top-3.5 pr-2 cursor-pointer" onClick={() => setVisible(!visible)}>
                                {!visible ?  
                                    <EyeIcon className="size-6 text-222"/>
                                    : 
                                    <EyeSlashIcon className="size-6 text-222"/>}
                            </div>
                        </div>
                        <button className="bg-salmon px-10 py-3 rounded-2xl font-shrikhand text-white text-2xl">Register</button>
                    </form>
                    <div className="inline-flex items-center justify-center w-full font-fraunces">
                        <hr className="w-11/12 md:w-full md:max-w-lg h-px my-8 bg-gray-300 border-0" />
                        <span className="absolute px-3 font-medium text-gray-900 bg-white">Have an account?</span>
                    </div>
                    <Link to="/login" className="bg-mint py-1 px-4 text-white font-fraunces rounded-full">Log In</Link>
                </div>
            </div>
        </div>
    );
}