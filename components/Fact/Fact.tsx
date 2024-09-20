import React from "react";
import cl from "./fact.module.css";
interface props {
  fact: string;
  isRandomFact?: boolean;
}
export const Fact = ({ fact, isRandomFact }: props) => {
  if (isRandomFact) {
    return <span className={` ${cl.randomFact}`}>{fact}</span>;
  }
  return <li className={cl.fact}>{fact}</li>;
};
