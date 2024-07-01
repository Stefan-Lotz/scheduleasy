import Footer from "./Footer";
import Header from "./Header";
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
