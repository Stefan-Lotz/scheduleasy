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
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/schedules" element={<SchedulesPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/schedule/:url" element={<SchedulePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
