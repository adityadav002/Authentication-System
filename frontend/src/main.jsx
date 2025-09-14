/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
