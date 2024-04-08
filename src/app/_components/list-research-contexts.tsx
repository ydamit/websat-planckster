"use client";
import { ResearchContextPage } from "@maany_shr/planckster-ui-kit";
import { type ResearchContext } from "node_modules/@maany_shr/kernel-planckster-sdk-ts";

export type ListResearchContextsPageProps = {
  researchContexts: ResearchContext[];
  kernelPlancksterHost: string;
};

export function ListResearchContextsPage(props: ListResearchContextsPageProps) {
  return (
    <ResearchContextPage
      cards={props.researchContexts}
      onAddContextClick={() => {console.log("Add context clicked")}}
      apiUrl={props.kernelPlancksterHost}
    />
  );
}
