import React, { useEffect } from "react";

const GoogleSearch2: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=e4cd8ee92b0304d2b";   
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ width: "32rem", margin:'1rem auto', zIndex:999 }}>
    <div className="gcse-search"></div>
  </div>
  );
};

export default GoogleSearch2;