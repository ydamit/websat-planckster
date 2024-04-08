"use client";
import { ResearchContextPage } from "@maany_shr/planckster-ui-kit"
export function ListResearchContexts() {
    const researchContexts = [
        {
            id: 1,
            title: "Research Context 1",
            description: "This is a description of research context 1"
        },
        {
            id: 2,
            title: "Research Context 2",
            description: "This is a description of research context 2"
        }
    ] 
    const addNewResearchContext = () => {
        console.log("Add new research context")
    }
    return (
        <ResearchContextPage cards={researchContexts} onAddContextClick={addNewResearchContext} apiUrl="http://localhost:8000"/>
    )
}