import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

import { Toaster } from "react-hot-toast";

import MainRoutes from "./Routing/MainRoutes";

function App() {
  return (
    <>
      <MainRoutes />
      <Toaster />
    </>
  );
}

export default App;
