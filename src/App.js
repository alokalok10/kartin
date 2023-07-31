import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/navbar";
import Daily from "./Components/dailyView";
import Weekly from "./Components/weeklyView";

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("habitData");
    const parsedData = JSON.parse(data);
    const habitData = Array.isArray(parsedData) ? parsedData : [];
    // updating habits array from localStorage data
    setHabits(habitData);
  }, []);

  useEffect(() => {
    console.log("habit state after update", habits);
    console.log(
      "local storage after update",
      JSON.parse(localStorage.getItem("habitData"))
    );
  }, [habits]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar habits={habits} setHabits={setHabits} />,
      children: [
        { path: "/", element: <Daily habits={habits} setHabits={setHabits} /> },
        {
          path: "/weekly",
          element: <Weekly habits={habits} setHabits={setHabits} />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} position="top-left" />
    </div>
  );
}

export default App;
