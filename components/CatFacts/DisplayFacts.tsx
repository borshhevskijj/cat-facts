import { Fact as factType } from "@/lib/queries/facts";
import React from "react";
import { Fact } from "../Fact/Fact";

interface props {
  facts: factType[];
}
const DisplayFacts = ({ facts }: props) => {
  return <ul>{facts && facts.map((fact, index) => <Fact fact={fact.fact} key={index} />)}</ul>;
};

export default DisplayFacts;
