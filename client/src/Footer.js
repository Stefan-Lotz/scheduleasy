import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-2 px-4 mx-auto max-w-screen-xl font-syne">
      <hr className="my-4" />
      <div className="sm:flex block justify-between">
        <div className="grid grid-cols-2 justify-start  gap-x-14 gap-y-1.5 text-neutral-500 dark:text-neutral-400">
          <p className="font-semibold text-222 dark:text-neutral-200">
            Scheduleasy
          </p>
          <p className="font-semibold text-222 dark:text-neutral-200">
            Resources
          </p>
          <Link
            to="/schedules"
            className="hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            Schedules
          </Link>
          <Link
            to="/"
            className="hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            Log in
          </Link>
          <Link
            to="/about"
            className="hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            About
          </Link>
          <Link
            to="/register"
            className="hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            Register
          </Link>
        </div>
        <div className="text-neutral-500 dark:text-neutral-400 sm:inline hidden">
          Created by Stefan in 2024!
        </div>
      </div>
    </footer>
  );
}
