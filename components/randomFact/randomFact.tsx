"use client";
import { UseGetFact } from "@/lib/queries/facts";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import cl from "./randomFact.module.css";
import Loading from "@/app/loading";
import { Fact } from "../Fact/Fact";

const RandomFact = () => {
  const [facts, setFacts] = useState<string[]>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const { data, error, isLoading, mutate, isValidating } = UseGetFact();

  useEffect(() => {
    if (data) {
      if (currentFactIndex < facts.length - 1) {
        setFacts((prev) => {
          const facts = [...prev];
          // const before = facts.slice(0, currentFactIndex + 1).map((fact) => fact.substring(0, 15));
          // const after = facts.slice(currentFactIndex).map((fact) => fact.substring(0, 15)); //test
          // const updatedFacts = [...before, data.fact.substring(0, 15), ...after];
          facts.splice(currentFactIndex + 1, 0, data.fact);
          console.log(facts.map((fact) => fact.substring(0, 15)));
          setCurrentFactIndex(currentFactIndex + 1);
          return facts;
        });
        // setCurrentFactIndex(currentFactIndex+1)
        console.log("currentFactIndex > facts.length - 1");
      } else {
        console.log("else");
        setFacts((prev) => [...prev, data.fact]);
        console.log(facts.map((fact) => fact.substring(0, 15)));
        setCurrentFactIndex(facts.length);
      }
    }
  }, [data]);
  // console.log(currentFactIndex, facts.length - 1);

  const nextFact = () => {
    if (currentFactIndex + 1 < facts.length) {
      setCurrentFactIndex(currentFactIndex + 1);
    } else {
      mutate();
      setCurrentFactIndex(currentFactIndex + 1);
    }
  };
  const prevFact = () => {
    if (currentFactIndex > 0) {
      setCurrentFactIndex(currentFactIndex - 1);
    }
  };
  if (isLoading || isValidating) return <Loading />;
  if (error)
    return (
      <>
        <div>Error loading fact</div>
        <Button buttonContent="fetch random fact" onClick={() => mutate()} />
      </>
    );
  return (
    <>
      <div className={cl.randomFact}>
        {!!facts.length && facts[currentFactIndex] && (
          <h2 className={cl.title}>
            Random Fact: <Fact isRandomFact fact={facts[currentFactIndex]} />
          </h2>
        )}
        <div className={cl.buttonsContainer}>
          <Button buttonContent="regenerate" onClick={() => mutate()} />
          <div className={cl.pagination}>
            <Button onClick={prevFact} disabled={currentFactIndex === 0} buttonContent="prev" />
            <Button onClick={nextFact} buttonContent="next" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RandomFact;
