import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Box } from "@mui/material";

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
    <Box textAlign="center" mt={4}>
      <Typography variant="h3" mb={3}>
        Home Page
      </Typography>
      <Box mb={2}>
        <Button variant="contained" onClick={handleCheckIn}>
          Check In
        </Button>{" "}
        <Button variant="contained" onClick={handleCheckOut}>
          Check Out
        </Button>
      </Box>
      <Box>
        {checkInTime && (
          <Typography variant="body1">
            Check-In Time: {new Date(checkInTime).toLocaleString()}
          </Typography>
        )}
        {checkOutTime && (
          <Typography variant="body1">
            Check-Out Time: {new Date(checkOutTime).toLocaleString()}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
