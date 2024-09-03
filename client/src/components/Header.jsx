import { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  PlusCircleIcon,
  Squares2X2Icon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const Header = ({ handleTheme }) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "os");
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = useCallback(async () => {
    try {
      const response = await axios.get("/schedule");
      const data = response.data;
      const userCreatedSchedules = data.filter((schedule) => {
        return schedule.author.username === userInfo.username;
      });
      setSchedules(userCreatedSchedules);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    }
  }, [userInfo]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const handleThemeClick = () => {
    const nextTheme = handleTheme(theme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    axios
      .get("/profile", { withCredentials: true })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [setUserInfo]);

  function logout() {
    axios
      .post("/logout", {}, { withCredentials: true })
      .then(() => {
        setUserInfo(null);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  function toggleMenu() {
    return (
      <div
        className="absolute flex flex-col right-5 top-12 bg-gray-200 border-2 border-gray-300 p-3 gap-y-2 rounded-sm z-10 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
        id="menu"
      >
        <Link
          to="/"
          className="hover:bg-gray-300 p-1 rounded-md flex gap-2 items-center dark:hover:bg-neutral-700"
        >
          <HomeIcon className="size-5 -mt-[3px]" />
          Home
        </Link>
        <Link
          to="/schedules"
          className="hover:bg-gray-300 p-1 rounded-md flex gap-2 items-center dark:hover:bg-neutral-700"
        >
          <Squares2X2Icon className="size-5" />
          Schedules
        </Link>
        <Link
          to="/login"
          className="hover:bg-gray-300 p-1 rounded-md flex gap-2 items-center dark:hover:bg-neutral-700"
        >
          <ArrowRightEndOnRectangleIcon className="size-5" />
          Log In
        </Link>
        <Link
          to="/register"
          className="text-center px-3 bg-mint hover:bg-[#20756b] py-1 rounded-md text-white"
        >
          Get Started
        </Link>
        <button
          onClick={handleThemeClick}
          className="text-left hover:bg-gray-300 p-1 rounded-md flex gap-2 items-center dark:hover:bg-neutral-700 cursor-pointer"
        >
          {theme === "light" && <SunIcon className="size-5" />}
          {theme === "dark" && <MoonIcon className="size-5" />}
          {theme === "os" && <ComputerDesktopIcon className="size-5" />}
          Theme
        </button>
      </div>
    );
  }

  function toggleMenuLoggedIn() {
    return (
      <div
        className="absolute flex flex-col right-5 top-12 text-222 bg-gray-200 border-gray-300 border-2 p-3 gap-y-2 rounded-sm z-10 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
        id="menu"
      >
        <p className="font-semibold text-center">
          Hi there, {userInfo.username}!
        </p>
        <Link
          to="/"
          className="hover:bg-gray-300 p-1 rounded-md flex gap-2 items-center dark:hover:bg-neutral-700"
        >
          <HomeIcon className="size-5 -mt-[3px]" />
          Home
        </Link>
        <Link
          to="/create"
          className="hover:bg-gray-300 p-1 rounded-md flex gap-2 items-center dark:hover:bg-neutral-700"
        >
          <PlusCircleIcon className="size-5" />
          Create schedule
        </Link>
        <Link
          to="/schedules"
          className="hover:bg-gray-300 p-1 rounded-md flex gap-2 items-center dark:hover:bg-neutral-700"
        >
          <Squares2X2Icon className="size-5" />
          Schedules
        </Link>

        <button
          onClick={logout}
          className="text-left hover:bg-gray-300 p-1 rounded-md flex gap-2 items-center dark:hover:bg-neutral-700"
        >
          <ArrowRightStartOnRectangleIcon className="size-5" />
          Logout
        </button>
        <button
          onClick={handleThemeClick}
          className="text-left hover:bg-gray-300 p-1 rounded-md flex gap-2 items-center dark:hover:bg-neutral-700 cursor-pointer"
        >
          {theme === "light" && <SunIcon className="size-5" />}
          {theme === "dark" && <MoonIcon className="size-5" />}
          {theme === "os" && <ComputerDesktopIcon className="size-5" />}
          Theme
        </button>
        <div className="relative my-2">
          <hr className="border-222 dark:border-white" />
          <p className="text-sm px-0.5 font-bold absolute bg-gray-200 dark:bg-neutral-800 -top-[10px] left-2.5 cursor-default select-none">
            Your Schedules
          </p>
        </div>
        {schedules[0] ? (
          schedules.map((schedule) => (
            <Link
              to={"/schedule/" + schedule.url}
              className="text-sm cursor-pointer hover:bg-gray-300 p-1 rounded-md items-center dark:hover:bg-neutral-700"
            >
              {schedule.title}
            </Link>
          ))
        ) : (
          <p className="text-sm">You have no schedules :(</p>
        )}
      </div>
    );
  }

  function toggleUserMenu() {
    return (
      <div className="relative">
        <div className="absolute text-222 font-normal right-0 top-10 w-max flex flex-col bg-gray-100 border-2 p-3 gap-y-2 rounded-sm z-10 border-gray-300 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white">
          <UserCircleIcon className="size-7 mx-auto" />
          <p className="p-1 mx-auto">Logged in as: {userInfo.username}</p>
          <button
            onClick={handleThemeClick}
            className="flex cursor-pointer hover:bg-gray-300 p-1 rounded-md border justify-around border-gray-300 dark:hover:bg-neutral-700 dark:border-gray-500"
          >
            Theme:
            <div className="size-6 my-auto">
              {theme === "light" && <SunIcon />}
              {theme === "dark" && <MoonIcon />}
              {theme === "os" && <ComputerDesktopIcon />}
            </div>
          </button>
          <Link
            to="/"
            onClick={logout}
            className="hover:bg-gray-300 p-1 flex items-center justify-around rounded-md border border-gray-300 dark:hover:bg-neutral-700 dark:border-gray-500"
          >
            Logout
            <ArrowRightStartOnRectangleIcon className="size-6" />
          </Link>
          <div className="relative my-2">
            <hr className="border-222 dark:border-white" />
            <p className="text-sm px-0.5 font-bold absolute bg-gray-100 dark:bg-neutral-800 -top-[10px] left-2.5 cursor-default select-none">
              Your Schedules
            </p>
          </div>
          {schedules[0] ? (
            schedules.map((schedule) => (
              <Link
                to={"/schedule/" + schedule.url}
                className="text-sm cursor-pointer hover:bg-gray-300 p-1 rounded-md items-center dark:hover:bg-neutral-700"
              >
                {schedule.title}
              </Link>
            ))
          ) : (
            <p className="text-sm">You have no schedules :(</p>
          )}
        </div>
      </div>
    );
  }

  const username = userInfo?.username;

  return (
    <>
      <header className="text-slate dark:text-white my-2.5 hidden md:flex justify-between px-4 items-center max-w-screen-xl mx-auto font-syne text-lg">
        <Link to="/" className="text-3xl font-shrikhand">
          Scheduleasy
        </Link>
        <nav className="gap-5 font-semibold">
          {username && (
            <>
              <Link
                to="/schedules"
                className="place-self-center group transition translate-y-[2px]"
              >
                Schedules
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-mint" />
              </Link>
              <Link
                to="/create"
                className="place-self-center group transition translate-y-[2px]"
              >
                Create a Schedule
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-mint" />
              </Link>
              <div className="border-l-2 border-gray-300"></div>
              <div className="flex">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="my-auto cursor-pointer dark:hover:bg-white hover:bg-222 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded-full p-1"
                >
                  {userMenu ? (
                    <XMarkIcon className="size-6 text-222 dark:text-white" />
                  ) : (
                    <UserCircleIcon className="size-6 text-222 dark:text-white" />
                  )}
                </button>
                {userMenu && toggleUserMenu()}
              </div>
            </>
          )}
          {!username && (
            <>
              <Link
                to="/schedules"
                className="place-self-center group transition translate-y-[2px]"
              >
                Schedules
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-mint" />
              </Link>
              <Link
                to="/login"
                className="place-self-center group transition translate-y-[2px]"
              >
                Login
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-mint" />
              </Link>
              <Link
                to="/register"
                className="bg-mint px-3 text-white rounded-3xl transition-all ease-in-out duration-300 hover:rounded-sm hover:bg-[#1f756a] place-self-center"
              >
                Register
              </Link>
              <div className="border-l-2 border-gray-300" />
              <button
                onClick={handleThemeClick}
                className="my-auto cursor-pointer dark:hover:bg-white hover:bg-222 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded-full p-1"
              >
                {theme === "light" && <SunIcon className="size-6" />}
                {theme === "dark" && <MoonIcon className="size-6" />}
                {theme === "os" && <ComputerDesktopIcon className="size-6" />}
              </button>
            </>
          )}
        </nav>
      </header>
      <header className="text-slate my-2.5 flex md:hidden justify-between px-4 md:justify-around md:px-0 items-center max-w-screen-xl mx-auto font-syne text-lg">
        <Link to="/" className="text-3xl font-shrikhand dark:text-white">
          Scheduleasy
        </Link>
        <nav>
          {username && (
            <>
              <button onClick={() => setPopUpMenu(!popUpMenu)} className="my-auto cursor-pointer dark:hover:bg-white hover:bg-222 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded-full p-1">
                {popUpMenu ? (
                  <XMarkIcon className="size-7 text-222 dark:text-white" />
                ) : (
                  <Bars3Icon className="size-7 text-222 dark:text-white" />
                )}
              </button>
              {popUpMenu && toggleMenuLoggedIn()}
            </>
          )}
          {!username && (
            <>
              <button onClick={() => setPopUpMenu(!popUpMenu)} className="my-auto cursor-pointer dark:hover:bg-white hover:bg-222 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded-full p-1">
                {popUpMenu ? (
                  <XMarkIcon className="size-7 text-222 dark:text-white" />
                ) : (
                  <Bars3Icon className="size-7 text-222 dark:text-white" />
                )}
              </button>
              {popUpMenu && toggleMenu()}
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
