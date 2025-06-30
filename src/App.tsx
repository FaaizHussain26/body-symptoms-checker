import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import "./index.css";
import { SymptomsProvider, useSymptoms } from "@/contexts/symptoms-context";
import { AlertTriangle } from "lucide-react";
import { HumanBody } from "./components/body-parts/human-body";
import { SelectedSymptomsPanel } from "./components/symptoms-sidebar/selected-symptoms-panel";
import { SymptomsSidebar } from "./components/symptoms-sidebar";
import { DemographicsForm } from "./components/treatment/demographic-form";
import { TreatmentRecommendations } from "./components/treatment/treatment-recommendation";

function AppContent() {
  const { state } = useSymptoms()

  if (state.currentStep === "demographics") {
    return <DemographicsForm />
  }

  if (state.currentStep === "results") {
    return <TreatmentRecommendations />
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Body Symptoms Checker</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {state.userDemographics?.name && `Hello ${state.userDemographics.name}, `}
            Click on different parts of the body diagram to explore symptoms. Select the symptoms you're experiencing to
            get personalized treatment recommendations.
          </p>
        </div>

        <Card className="mb-6 bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              <p className="font-medium">Medical Disclaimer</p>
            </div>
            <p className="text-sm text-amber-700 mt-2">
              This tool is for informational purposes only and should not replace professional medical advice. Always
              consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Select Body Part</CardTitle>
                <CardDescription>Click on any anatomical region to see related symptoms</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <HumanBody />
              </CardContent>
            </Card>
          </div>

          <div>
            <SelectedSymptomsPanel />
          </div>
        </div>
      </div>

      <SymptomsSidebar />
    </div>
  )
}

function App() {
  return (
    <SymptomsProvider>
      <AppContent />
    </SymptomsProvider>
  );
}

export default App;
