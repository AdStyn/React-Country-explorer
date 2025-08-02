import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailsCountry from "./pages/DetailsCountry";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/details/:name",
    element: <DetailsCountry />,
  },
]);
