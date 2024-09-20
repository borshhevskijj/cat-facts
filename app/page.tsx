import CatFacts from "@/components/CatFacts/CatFacts";
import { getInitialFacts } from "@/lib/queries/facts";
import cl from "./page.module.css";

export default async function Page() {
  const initialFacts = await getInitialFacts();
  return (
    <section className={cl.facts}>
      <h1>Cat Facts List :</h1>
      <CatFacts initialFacts={initialFacts} />
    </section>
  );
}
