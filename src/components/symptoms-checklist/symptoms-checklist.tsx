import { useSymptoms } from "@/contexts/symptoms-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Heart,
  Brain,
  Wind,
  Activity,
} from "lucide-react";
import { bodyParts } from "@/utils/data/body-parts";
import {
  calculateOverallRisk,
  getRiskLevelColor,
} from "@/utils/risk-calculator";
import { InformationalBody } from "@/components/body-parts/informational-body";

export const SymptomsChecklist: React.FC = () => {
  const { state, dispatch } = useSymptoms();

  // Flatten all symptoms from all body parts
  const allSymptoms = bodyParts.flatMap((bodyPart) =>
    bodyPart.symptoms.map((symptom) => ({
      ...symptom,
      bodyPartId: bodyPart.id,
      bodyPartName: bodyPart.name,
      category: getCategoryForBodyPart(bodyPart.name),
    }))
  );

  const isSymptomSelected = (symptomId: string) => {
    return state.selectedSymptoms.some((s) => s.symptomId === symptomId);
  };

  const handleSymptomToggle = (
    symptom: (typeof allSymptoms)[0],
    bodyPartId: string
  ) => {
    dispatch({
      type: "TOGGLE_SYMPTOM",
      payload: {
        bodyPart: bodyPartId,
        symptom,
      },
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800 border-green-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "severe":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "neurological":
        return <Brain className="h-5 w-5" />;
      case "cardiovascular":
        return <Heart className="h-5 w-5" />;
      case "respiratory":
        return <Wind className="h-5 w-5" />;
      case "sleep":
        return <Clock className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  // Group symptoms by category for better organization
  const categorizedSymptoms = allSymptoms.reduce((acc, symptom) => {
    const category = symptom.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(symptom);
    return acc;
  }, {} as Record<string, typeof allSymptoms>);

  const riskCalculation = calculateOverallRisk(state.selectedSymptoms);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sleep Apnea Symptoms Checklist
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {state.userDemographics?.name &&
              `Hello ${state.userDemographics.name}, `}
            Check all symptoms you are currently experiencing. The highlighted
            body diagram shows areas commonly affected by sleep apnea. Review
            each category carefully - you might be surprised by some
            connections!
          </p>
        </div>

        <Card className="mb-6 bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              <p className="font-medium">Medical Disclaimer</p>
            </div>
            <p className="text-sm text-amber-700 mt-2">
              This tool is for informational purposes only and should not
              replace professional medical advice. Always consult with a
              healthcare provider for proper diagnosis and treatment.
            </p>
          </CardContent>
        </Card>

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-6">
          {/* Informational Body */}
          <div className="xl:col-span-1 lg:col-span-1 lg:order-1 order-1">
            <Card className="lg:sticky lg:top-8">
              <CardContent className="p-4">
                <InformationalBody />
              </CardContent>
            </Card>
          </div>

          {/* Symptoms Checklist */}
          <div className="xl:col-span-2 lg:col-span-2 lg:order-2 order-2">
            <div className="space-y-6">
              {Object.entries(categorizedSymptoms).map(
                ([category, symptoms]) => (
                  <Card key={category}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(category)}
                        <CardTitle className="text-xl capitalize">
                          {category.replace("_", " & ")} Symptoms
                        </CardTitle>
                        <Badge variant="outline" className="ml-auto">
                          {
                            symptoms.filter((s) => isSymptomSelected(s.id))
                              .length
                          }{" "}
                          / {symptoms.length} selected
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {symptoms.map((symptom) => {
                          const isSelected = isSymptomSelected(symptom.id);

                          return (
                            <div
                              key={symptom.id}
                              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "bg-blue-50 border-blue-300 shadow-md"
                                  : "bg-white hover:bg-gray-50 hover:border-gray-300"
                              }`}
                              onClick={() =>
                                handleSymptomToggle(symptom, symptom.bodyPartId)
                              }
                            >
                              <div className="flex items-start gap-3">
                                <Checkbox
                                  checked={isSelected}
                                  readOnly
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-gray-900">
                                      {symptom.name}
                                    </h3>
                                    {isSelected && (
                                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {symptom.description}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={getSeverityColor(
                                        symptom.severity
                                      )}
                                    >
                                      {symptom.severity.toUpperCase()}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {symptom.bodyPartName}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {symptom.percentage >= 1000
                                        ? `${(
                                            symptom.percentage / 1000
                                          ).toFixed(1)}K`
                                        : `${symptom.percentage}%`}{" "}
                                      risk
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>

          {/* Summary Panel */}
          <div className="xl:col-span-1 lg:col-span-3 xl:mt-0 lg:mt-6 lg:order-3 order-3">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Selected Symptoms Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Symptoms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {state.selectedSymptoms.length}
                    </div>
                    <p className="text-sm text-gray-600">symptoms selected</p>
                  </div>

                  {state.selectedSymptoms.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {state.selectedSymptoms.map((selected, index) => (
                        <div
                          key={index}
                          className="text-xs p-2 bg-gray-50 rounded"
                        >
                          <div className="font-medium">
                            {selected.symptom.name}
                          </div>
                          <div className="text-gray-500">
                            {
                              bodyParts.find(
                                (bp) => bp.id === selected.bodyPart
                              )?.name
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              {state.selectedSymptoms.length > 0 && (
                <Card
                  className={`border-2 ${getRiskLevelColor(
                    riskCalculation.riskLevel
                  )}`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold mb-1">
                        {riskCalculation.overallRiskPercentage}%
                      </div>
                      <Badge
                        className={getRiskLevelColor(riskCalculation.riskLevel)}
                      >
                        {riskCalculation.riskLevel} Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-center mb-4">
                      {riskCalculation.riskMessage}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Continue Button */}
              {state.selectedSymptoms.length >= 2 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-blue-800 font-medium mb-3">
                      Ready for Assessment
                    </p>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => dispatch({ type: "GO_TO_RESULTS" })}
                    >
                      Get Treatment Recommendations
                    </Button>
                  </CardContent>
                </Card>
              )}

              {state.selectedSymptoms.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => dispatch({ type: "RESET_SYMPTOMS" })}
                >
                  Clear All Selections
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getCategoryForBodyPart(bodyPartName: string): string {
  const categoryMap: Record<string, string> = {
    "Head & Brain": "neurological",
    "Throat & Airways": "respiratory",
    "Heart & Cardiovascular System": "cardiovascular",
    "Respiratory System": "respiratory",
    "Upper Digestive System": "metabolic",
    "Metabolic System": "metabolic",
    "Lower Abdomen & Urinary": "metabolic",
    "General Health Risks": "general",
  };

  return categoryMap[bodyPartName] || "general";
}
