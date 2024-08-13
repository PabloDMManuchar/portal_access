import React, { useEffect } from "react";
import "./GoogleSearch.css";

const GoogleSearch: React.FC = () => {
  useEffect(() => {
    const cx = "c1eed65a3679e4804";
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://cse.google.com/cse.js?cx=${cx}`;
    document.body.appendChild(script);
  }, []);

  return (
    // <div className="google-search-container">
    //   <img src="/googleIcon.png" alt="Google Icon" className="google-icon" />
    //   <div className="search-translate">
    //     <div className="gcse-search" />
    //   </div>
    // </div>
    <div className="gcse-search" style={{ backgroundColor: '#f0f0f0', padding: '10px' }}/>
  );
};

export default GoogleSearch;
