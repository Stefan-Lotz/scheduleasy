import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePage from "./pages/CreatePage";
import SchedulePage from "./pages/SchedulePage";
import SchedulesPage from "./pages/SchedulesPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import { UserContextProvider } from "./UserContext";
import { useEffect, useState } from "react";
import EditSchedule from "./pages/EditSchedule";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "os");

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove("dark");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  const handleTheme = (currentTheme) => {
    let nextTheme;
    if (currentTheme === "light") {
      nextTheme = "dark";
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (currentTheme === "dark") {
      nextTheme = "os";
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      nextTheme = "light";
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
    return nextTheme;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove("dark");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("os");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout handleTheme={handleTheme} />}>
          <Route index element={<IndexPage />} />
          <Route path="/schedules" element={<SchedulesPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/schedule/:url/edit" element={<EditSchedule />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/schedule/:url"
          element={<SchedulePage handleTheme={handleTheme} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
