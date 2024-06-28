import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-2 px-4 mx-auto max-w-screen-xl">
      <hr className="my-4" />
      <div className="sm:flex block justify-between">
        <div className="grid grid-cols-2 justify-start  gap-x-14 gap-y-1.5 text-neutral-500">
          <p className="font-semibold text-222">Scheduleasy</p>
          <p className="font-semibold text-222">Resources</p>
          <Link to="/schedules">Schedules</Link>
          <Link to="/">Home</Link>
          <Link to="/login">Log in</Link>
          <Link to="/about">About</Link>
          <Link to="/register">Register</Link>
        </div>
        <div className="text-neutral-500 sm:inline hidden">
          Created by Stefan in 2024!
        </div>
      </div>
    </footer>
  );
}
