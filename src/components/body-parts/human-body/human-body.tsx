import React from "react"
import { useSymptoms } from "@/contexts/symptoms-context"
import "./human-body.css"
import "./variables.css"
import { MenBodySvgComponent } from "../men-front-body-svg"

export const HumanBody = () => {
  const { dispatch } = useSymptoms()

  const handlePieceClick = (event: React.MouseEvent) => {
    const target = event.target
    if (target instanceof Element) {
      const pathId = target.getAttribute("id")
      console.log("Clicked body part:", pathId)

      // Remove active class from all paths
      const activePath = document.querySelector(".sc-body-model-svg__path--active")
      if (activePath) {
        activePath.classList.remove("sc-body-model-svg__path--active")
      }

      // Add active class to clicked path
      if (pathId && target.classList.contains("sc-body-model-svg__path")) {
        target.classList.add("sc-body-model-svg__path--active")
        
        // Dispatch the body part selection
        dispatch({ type: "SELECT_BODY_PART", payload: pathId })
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="sc-body-model evidence-search-body-widget__body-model">
        <div className="ui-dropdown ui-dropdown--compact sc-body-model__dropdown" style={{ height: "450px" }}>
          <MenBodySvgComponent handlePieceClick={handlePieceClick} />
        </div>
      </div>
    </div>
  )
}
