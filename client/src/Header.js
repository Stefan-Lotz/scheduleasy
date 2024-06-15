import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  PlusCircleIcon, 
  Squares2X2Icon, 
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon
} from "@heroicons/react/24/outline";

export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [popUpMenu, setPopUpMenu]= useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  function toggleMenu() {
    return (
      <div className="absolute flex flex-col right-5 top-12 bg-gray-100 p-3 gap-y-2 rounded-lg" id="menu">
        <Link to="/" className="hover:bg-gray-200 p-1 rounded-md flex gap-2 items-center"><HomeIcon className="size-5 mt-[-2px]"/>Home</Link>
        <Link to="/schedules" className="hover:bg-gray-200 p-1 rounded-md flex gap-2 items-center"><Squares2X2Icon className="size-5"/>View schedules</Link>
        <Link to="/login" className="hover:bg-gray-200 p-1 rounded-md flex gap-2 items-center"><ArrowRightEndOnRectangleIcon className="size-5 mt-[-3px]"/>Log In</Link>
        <Link to="/register" className="text-center px-3 bg-mint hover:bg-[#20756b] py-1 rounded-md text-white">Get Started</Link>
      </div>
    );
  }

  function toggleMenuLoggedIn() {
    return (
      <div className="absolute flex flex-col right-5 top-12 bg-gray-100 p-3 gap-y-2 rounded-lg" id="menu">
        <Link to="/" className="hover:bg-gray-200 p-1 rounded-md flex gap-2 items-center"><HomeIcon className="size-5 mt-[-2px]"/>Home</Link>
        <Link to="/create" className="hover:bg-gray-200 p-1 rounded-md flex gap-2 items-center"><PlusCircleIcon className="size-5"/>Create schedule</Link>
        <Link to="/schedules" className="hover:bg-gray-200 p-1 rounded-md flex gap-2 items-center"><Squares2X2Icon className="size-5"/>View schedules</Link>
        <button onClick={logout} className="text-left hover:bg-gray-200 p-1 rounded-md flex gap-2 items-center"><ArrowRightStartOnRectangleIcon className="size-5 mt-[-3px]"/>Logout</button>
      </div>
    );
  }

  const username = userInfo?.username;

    return (
      <>
        <header className="text-slate my-2.5 hidden md:flex justify-around px-0 items-center w-full font-fraunces text-lg">
          <Link to="/" className="text-3xl font-sansita">Scheduleasy</Link>
            <nav>
              {username && (
                <>
                  <Link to="/schedules">Schedules</Link>
                  <Link to="/create">Create a Schedule</Link>
                  <Link to="/" onClick={logout}>Logout</Link>
                </>
              )}
              {!username && (
                <>
                  <Link to="/schedules">Schedules</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/register" className="bg-mint px-3 text-white rounded-full">Register</Link>
                </>
              )}
            </nav>
        </header>
        <header className="text-slate my-2.5 flex md:hidden justify-between px-4 md:justify-around md:px-0 items-center w-full font-fraunces text-lg">
          <Link to="/" className="text-3xl font-sansita">Scheduleasy</Link>
            <nav>
              {username && (
                <>
                  <button onClick={() => setPopUpMenu(!popUpMenu)}>
                  {popUpMenu ? 
                    <XMarkIcon className="size-8 text-222"/>
                    :
                    <Bars3Icon className="size-8 text-222"/>
                  }
                  </button>
                  {popUpMenu && toggleMenuLoggedIn()}
                </>
              )}
              {!username && (
                <>
                  <button onClick={() => setPopUpMenu(!popUpMenu)}>
                  {popUpMenu ? 
                    <XMarkIcon className="size-8 text-222"/>
                    :
                    <Bars3Icon className="size-8 text-222"/>
                  }
                  </button>
                  {popUpMenu && toggleMenu()}
                </>
              )}
            </nav>
        </header>
      </>
    );
}