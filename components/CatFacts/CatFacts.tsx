"use client";
import { Fact, FactsResponse, UseGetAllFacts } from "@/lib/queries/facts";
import { useState } from "react";
import DisplayFacts from "./DisplayFacts";
import Button from "../UI/Button/Button";
import Loading from "@/app/loading";
import cl from "./catFacts.module.css";

interface CatFacts {
  initialFacts: Fact[];
}

export default function CatFacts({ initialFacts }: { initialFacts: FactsResponse }) {
  const [page, setPage] = useState(1);
  const { newFacts, error, isLoading, isValidating } = UseGetAllFacts(initialFacts, page);
  const facts = page === 1 ? initialFacts.data : newFacts?.data || [];
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (error) return <div>Error loading facts</div>;
  if (isLoading) return <Loading />;

  return (
    <div className={cl.factsContainer}>
      <div className={cl.paginationContainer}>
        <Button disabled={page === 1} onClick={handlePreviousPage} buttonContent={"prev"} />
        <div>{page}</div>
        <Button
          buttonContent={"next"}
          disabled={isValidating || (newFacts && newFacts.last_page === page)}
          onClick={handleNextPage}
        />
      </div>
      <DisplayFacts facts={facts} />
    </div>
  );
}
