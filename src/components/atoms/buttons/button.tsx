import React from "react";
import "./button.css";

interface ButtonProps {
  url: string;
  icon: string;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ url, icon, text }) => (
  <button
    onClick={() => window.open(url, "_blank")}
  >
    {icon && <i className={`fa ${icon}`}></i>}
    <span>{text}</span>
  </button>
);

export default Button;
