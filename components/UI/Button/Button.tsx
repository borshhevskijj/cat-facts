import React from "react";
import cl from "./button.module.css";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonContent: React.ReactNode | string;
}
const Button = ({ buttonContent, ...rest }: IButton) => {
  return (
    <button className={cl.button} {...rest}>
      {buttonContent}
    </button>
  );
};

export default Button;
