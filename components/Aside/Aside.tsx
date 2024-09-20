import React from "react";
import cl from "./aside.module.css";

type props = {
  position: "right" | "left";
};
const Aside = ({ position }: props) => {
  return <aside className={`${cl.aside} ${cl[position]}`} />;
};

export default Aside;
