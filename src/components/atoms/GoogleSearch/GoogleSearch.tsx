import React, { useEffect } from 'react';

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
    <div className="gcse-search" />
  );
};

export default GoogleSearch;
