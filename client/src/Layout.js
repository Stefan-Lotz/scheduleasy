import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout = ({ handleTheme }) => {
  return (
    <main>
      <Header handleTheme={handleTheme} />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
