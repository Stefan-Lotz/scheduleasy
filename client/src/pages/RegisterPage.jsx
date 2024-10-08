import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  async function register(ev) {
    ev.preventDefault();

    if (email === "") {
      setError("Please enter a vaild email.");
      return;
    }

    if (username === "") {
      setError("Please enter a username.");
      return;
    }

    if (password === "") {
      setError("Please enter a password.");
      return;
    }

    if (email === "") {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post(
        "/register",
        { username, password, email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setRedirect(true);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} state={{ fromRegister: true }} />;
  }

  return (
    <div
      className="bg-repeat-y vh bg-right"
      style={{
        backgroundImage: "url(/img/background.png)",
        backgroundSize: "100% auto",
      }}
    >
      <Helmet>
        <title>Register | Scheduleasy</title>
      </Helmet>
      <div className="flex flex-col vh bg-white md:bg-transparent md:mx-5 place-content-center md:w-1/2">
        <Link
          to="/"
          className="text-4xl md:text-5xl text-center font-shrikhand text-slate mx-auto"
        >
          Scheduleasy
        </Link>
        <div className="my-10 text-center">
          <h1 className="font-syne font-bold text-4xl text-slate">Sign Up</h1>
          <form
            className="max-w-sm mx-auto py-5 p-4 md:p-0"
            onSubmit={register}
          >
            {error && (
              <div className="bg-salmon mx-auto rounded-md text-center font-syne border-2 border-amber-700 text-white mt-2 text-wrap">
                {error}
              </div>
            )}
            <div className="relative">
              <input
                type="email"
                id="emailInput"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="block my-6 px-2.5 pb-2.5 pt-4 w-full text-sm text-222 rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mint peer"
                placeholder=""
              />
              <label
                htmlFor="emailInput"
                className="absolute rounded-lg text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-mint peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                id="usernameInput"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                className="block my-6 px-2.5 pb-2.5 pt-4 w-full text-sm text-222 rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mint peer"
                placeholder=""
              />
              <label
                htmlFor="usernameInput"
                className="absolute rounded-lg text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-mint peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Username
              </label>
            </div>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                id="passwordInput"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="block my-6 px-2.5 pb-2.5 pt-4 w-full text-sm text-222 rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mint peer"
                placeholder=""
              />
              <label
                htmlFor="passwordInput"
                className="absolute rounded-lg text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-mint peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Password
              </label>
              <div
                className="absolute right-0 top-3.5 pr-2 cursor-pointer"
                onClick={() => setVisible(!visible)}
              >
                {!visible ? (
                  <EyeIcon className="size-6 text-222" />
                ) : (
                  <EyeSlashIcon className="size-6 text-222" />
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button className="justify-center transition absolute ease-in-out hover:-translate-x-2 hover:-translate-y-2 bg-salmon hover:bg-[#e45c3b] border-222 border-2 text-white text-center px-10 py-3 font-shrikhand rounded-2xl text-2xl">
                <div>Register</div>
              </button>
              <div className="justify-center bg-222 text-222 select-none text-center px-10 py-3 font-shrikhand border-transparent border-2 rounded-2xl text-2xl">
                Register
              </div>
            </div>
          </form>
          <div className="inline-flex items-center justify-center w-full font-syne">
            <hr className="w-11/12 md:w-full md:max-w-lg h-px my-8 bg-gray-300 border-0" />
            <span className="absolute px-3 font-medium text-gray-900 bg-white">
              Have an account?
            </span>
          </div>
          <Link
            to="/login"
            className="bg-mint py-1 px-4 text-white font-syne rounded-3xl transition-all ease-in-out duration-300 hover:rounded-sm hover:bg-slate"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
