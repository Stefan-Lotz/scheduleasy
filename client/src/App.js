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
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.classList.remove("dark");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleTheme = (preference) => {
    if (preference === "light") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else if (preference === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (preference === "os") {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout handleTheme={handleTheme} />}>
          <Route index element={<IndexPage />} />
          <Route path="/schedules" element={<SchedulesPage />} />
          <Route path="/create" element={<CreatePage />} />
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
