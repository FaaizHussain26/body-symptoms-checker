import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { X, Check } from "lucide-react"
import { useSymptoms } from "@/contexts/symptoms-context"
import { bodyParts } from "@/utils/data/body-parts"

export const SymptomsSidebar: React.FC<{}> = () => {
  const { state, dispatch } = useSymptoms()

  if (!state.sidebarOpen || !state.selectedBodyPart) {
    return null
  }

  const currentBodyPart = bodyParts.find((bp) => bp.id === state.selectedBodyPart)

  if (!currentBodyPart) {
    return null
  }

  const isSymptomSelected = (symptomId: string) => {
    return state.selectedSymptoms.some((s) => s.bodyPart === state.selectedBodyPart && s.symptomId === symptomId)
  }

  const handleSymptomToggle = (symptom: any) => {
    dispatch({
      type: "TOGGLE_SYMPTOM",
      payload: {
        bodyPart: state.selectedBodyPart!,
        symptom,
      },
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "severe":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{currentBodyPart.name}</h2>
            <p className="text-sm text-gray-600">Select symptoms you're experiencing</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "CLOSE_SIDEBAR" })}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {currentBodyPart.symptoms.map((symptom) => {
            const isSelected = isSymptomSelected(symptom.id)

            return (
              <Card
                key={symptom.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected ? "bg-blue-50 border-blue-300 shadow-md" : "hover:bg-gray-50 hover:border-gray-300"
                }`}
                onClick={() => handleSymptomToggle(symptom)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{symptom.name}</h3>
                        {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{symptom.description}</p>
                      <Badge className={getSeverityColor(symptom.severity)}>{symptom.severity.toUpperCase()}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Selected Symptoms</h3>
          <p className="text-sm text-gray-600">
            {state.selectedSymptoms.length} symptoms selected across all body parts
          </p>
          {state.selectedSymptoms.length > 0 && (
            <div className="mt-3 space-y-1">
              {state.selectedSymptoms.map((selected, index) => (
                <div key={index} className="text-xs text-gray-500">
                  {bodyParts.find((bp) => bp.id === selected.bodyPart)?.name}: {selected.symptom.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
