import "./index.css";
import { SymptomsProvider, useSymptoms } from "@/contexts/symptoms-context";
import { DemographicsForm } from "./components/treatment/demographic-form";
import { TreatmentRecommendations } from "./components/treatment/treatment-recommendation";
import { SymptomsChecklist } from "./components/symptoms-checklist";

function AppContent() {
  const { state } = useSymptoms()

  if (state.currentStep === "demographics") {
    return <DemographicsForm />
  }

  if (state.currentStep === "symptoms_checklist") {
    return <SymptomsChecklist />
  }

  if (state.currentStep === "results") {
    return <TreatmentRecommendations />
  }

  // Fallback to demographics if no step is matched
  return <DemographicsForm />
}

function App() {
  return (
    <SymptomsProvider>
      <AppContent />
    </SymptomsProvider>
  );
}

export default App;
