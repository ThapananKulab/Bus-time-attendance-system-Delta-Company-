import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = async () => {
    const time = new Date().toISOString();
    setCheckInTime(time);
    try {
      await axios.post("https://api-work-io-demo.vercel.app/track", {
        type: "checkin",
        time: time,
        token: localStorage.getItem("token"),
      });
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  const handleCheckOut = async () => {
    const time = new Date().toISOString();
    setCheckOutTime(time);
    try {
      await axios.post("https://api-work-io-demo.vercel.app/track", {
        type: "checkout",
        time: time,
        token: localStorage.getItem("token"),
      });
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <button onClick={handleCheckIn}>Check In</button>
        <button onClick={handleCheckOut}>Check Out</button>
      </div>
      <div>
        {checkInTime && (
          <p>Check-In Time: {new Date(checkInTime).toLocaleString()}</p>
        )}
        {checkOutTime && (
          <p>Check-Out Time: {new Date(checkOutTime).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
