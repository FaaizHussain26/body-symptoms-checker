import { useEffect, useMemo } from "react";
import "../human-body/human-body.css";
import "../human-body/variables.css";
import { MenBodySvgComponent } from "../men-front-body-svg";
import "../men-front-body-svg/men-body.css";
import "./informational-body.css";

export const InformationalBody = () => {
  // Sleep apnea affected body parts
  const affectedAreas = useMemo(() => {
    return [
      "body-model-head",
      "body-model-neck_or_throat",
      "body-model-chest",
      "body-model-upper_abdomen",
      "body-model-mid_abdomen",
      "body-model-lower_abdomen",
    ];
  }, []);

  useEffect(() => {
    // Highlight affected areas after component mounts
    const timer = setTimeout(() => {
      console.log("Attempting to highlight areas:", affectedAreas);
      affectedAreas.forEach((areaId) => {
        const element = document.getElementById(areaId);
        console.log(`Element ${areaId}:`, element);
        if (element) {
          element.classList.add("sc-body-model-svg__path--affected");
          console.log(`Added affected class to ${areaId}`);
        } else {
          console.warn(`Element with ID ${areaId} not found`);
        }
      });
    }, 500); // Increased timeout to ensure SVG is loaded

    return () => clearTimeout(timer);
  }, [affectedAreas]);

  // No-op click handler since this is informational only
  const handlePieceClick = () => {
    // This body is for display purposes only
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Areas Affected by Sleep Apnea
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Sleep apnea impacts multiple body systems
        </p>
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-200 border border-red-400 rounded-sm"></div>
            <span className="text-gray-600">Affected Areas</span>
          </div>
        </div>
      </div>

      <div className="sc-body-model evidence-search-body-widget__body-model informational-body">
        <div
          className="ui-dropdown ui-dropdown--compact sc-body-model__dropdown"
          style={{ height: "400px" }}
        >
          <MenBodySvgComponent handlePieceClick={handlePieceClick} />
        </div>
      </div>
    </div>
  );
};
