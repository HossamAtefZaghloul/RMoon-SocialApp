import { useEffect, useState } from "react";

const TimeAgo = ({ eventTime }) => {
  const [timeAgo, setTimeAgo] = useState("");

  const calculateTimeAgo = () => {
    const now = new Date();
    const timeDifference = Math.floor((now - new Date(eventTime)) / 1000); // Difference in seconds

    let displayTime;
    if (timeDifference < 60) {
      displayTime = `Just now`;
    } else if (timeDifference < 3600) {
      displayTime = `${Math.floor(timeDifference / 60)} min ago`;
    } else if (timeDifference < 86400) {
      displayTime = `${Math.floor(timeDifference / 3600)} hr ago`;
    } else {
      displayTime = `${Math.floor(timeDifference / 86400)} day ago`;
    }

    setTimeAgo(displayTime);
  };

  useEffect(() => {
    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, [eventTime]);

  return <span className="text-sm text-gray-400">{timeAgo}</span>;
};

export default TimeAgo;
