import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Style from "../Styles/navbar.module.css";

function Navbar({ habits, setHabits }) {
  const [title, setTitle] = useState("");

  /* ------------ Function to add new habit ------------ */
  const handleSubmit = (e) => {
    e.preventDefault();
    let months = [
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let dates = [];
    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      let mm = currentDate.getMonth();
      mm = months[mm];
      let dd = currentDate.getDate();
      let day = currentDate.toLocaleDateString("en-US", { weekday: "short" });
      if (dd < 10) dd = "0" + dd;

      const d = {
        date: dd + " " + mm,
        day: day,
        status: "0",
      };
      // Storing date, month and day in dates array to show on weekView.
      dates.push(d);
    }

    const newHabit = {
      title: title,
      date: Date.now(),
      dates: dates,
    };

    const updatedHabits = [...habits, newHabit];
    // Update the habits state after deleting
    setHabits(updatedHabits);
    // Update the habitData in local storage
    localStorage.setItem("habitData", JSON.stringify(updatedHabits));
    setTitle("");
    toast.info("Habit added successfully..!");
  };

  return (
    <div className={Style.container}>
      <div className={Style.aside}>
        <div className={Style.title}>
          <h1>Health Tracker</h1>
          <p>
            The ultimate health tracker that empowers you to add, track and
            conquer your health issues with ease!
          </p>
        </div>
        <div className={Style.addHabit}>
          <form onSubmit={handleSubmit} className={Style.addForm}>
            <input
              type="text"
              placeholder="Enter Health Task"
              value={title}
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <button type="submit" className={Style.add_btn}>
              Add Task
            </button>
          </form>
        </div>
      </div>

      <div className={Style.main}>
        <div className={Style.navbar}>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#362b40",
                    backgroundColor: "#dce1f7",
                    boxShadow: "rgba(0, 0, 0, .3) 5px 8px 8px -5px",
                  }
                : {}
            }
          >
            Daily{" "}
          </NavLink>
          <NavLink
            to="/weekly"
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#362b40",
                    backgroundColor: "#dce1f7",
                    boxShadow: "rgba(0, 0, 0, .3) 5px 8px 8px -5px",
                  }
                : {}
            }
          >
            Weekly{" "}
          </NavLink>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
