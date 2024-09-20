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
      setFacts((prev) => [...prev, data.fact]);
      setCurrentFactIndex(facts.length);
    }
  }, [data]);

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
