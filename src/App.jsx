import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
import { Toaster } from "./components/ui/sonner";
import { useSelector } from "react-redux";
import Spinner from "./components/ui/common/Spinner";

function App() {
  const loading = useSelector((state) => state.loading.loading);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      {loading && <Spinner />}
    </>
  );
}

export default App;
