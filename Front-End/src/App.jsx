import { useState } from "react";
import Home from "./components/Home";
import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "./components/export";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
