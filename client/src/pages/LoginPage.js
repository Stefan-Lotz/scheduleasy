import { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import {EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const {setUserInfo} = useContext(UserContext);
    const location = useLocation();
    var { fromRegister } = false;
    location.state === null ? { fromRegister } = false : { fromRegister } = location.state;

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include', 
        });
        if(response.ok && username !== "" && password !== "") {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else if(username === "" || password === "") {
            setError('All fields must have a value!');
        } else {
            setError('Invalid credentials!');
        }
    }

    if(redirect) {
        return <Navigate to={'/schedules'} />
    }

    return (
        <div className="bg-repeat-y vh bg-right" 
        style={{ backgroundImage: "url(/img/background.png)", backgroundSize: "100% auto"}}>
            <div className="flex flex-col vh bg-white md:bg-transparent md:mx-5 place-content-center md:w-1/2">
                    {fromRegister &&
                        <div className="w-5/6 bg-green-400 mx-auto text-center text-white text-lg py-2 rounded-lg mb-5 border-2 border-solid border-green-500">
                            Registration successful!
                        </div>
                    }
                    <Link to="/" className="text-4xl md:text-5xl text-center font-sansita text-slate mx-auto">Scheduleasy</Link>
                    <div className="my-10 text-center">
                        <h1 className="font-fraunces font-bold text-4xl text-slate">Log In</h1>
                        <form className="max-w-sm mx-auto py-5 p-4 md:p-0" onSubmit={login}>
                            {error && <div className="error mt-2">{error}</div>}
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
                            <button className="bg-salmon px-10 py-3 rounded-2xl font-shrikhand text-white text-2xl">Login</button>
                        </form>
                        <div className="inline-flex items-center justify-center w-full font-fraunces">
                            <hr className="w-11/12 md:w-full md:max-w-lg h-px my-8 bg-gray-300 border-0" />
                            <span className="absolute px-3 font-medium text-gray-900 bg-white">Need an account?</span>
                        </div>
                        <Link to="/register" className="bg-mint py-1 px-4 text-white font-fraunces rounded-full">Sign Up</Link>
                    </div>
                </div>
        </div>
    );
}