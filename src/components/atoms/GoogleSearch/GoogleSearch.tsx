import React, { useEffect } from "react";

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
    <div style={{ width: "448px", margin:'1rem auto', zIndex:999 }}>
      <div className="gcse-search" />
    </div>
  );
};

export default GoogleSearch;
