import { useSymptoms } from "@/contexts/symptoms-context"
import { calculateOverallRisk, getRiskLevelColor } from "@/utils/risk-calculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Activity, TrendingUp, AlertTriangle } from "lucide-react"
import { bodyParts } from "@/utils/data/body-parts"

export const SelectedSymptomsPanel: React.FC<{}> = () => {
  const { state, dispatch } = useSymptoms()

  if (state.selectedSymptoms.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6 text-center">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Click on body parts to select symptoms</p>
        </CardContent>
      </Card>
    )
  }

  const groupedSymptoms = state.selectedSymptoms.reduce(
    (acc, selected) => {
      const bodyPart = bodyParts.find((bp) => bp.id === selected.bodyPart)
      if (bodyPart) {
        if (!acc[bodyPart.name]) {
          acc[bodyPart.name] = []
        }
        acc[bodyPart.name].push(selected)
      }
      return acc
    },
    {} as Record<string, typeof state.selectedSymptoms>,
  )

  const riskCalculation = calculateOverallRisk(state.selectedSymptoms)

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

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 100) return "bg-red-100 text-red-800"
    if (percentage >= 50) return "bg-orange-100 text-orange-800"
    if (percentage >= 25) return "bg-yellow-100 text-yellow-800"
    return "bg-blue-100 text-blue-800"
  }

  const formatPercentage = (percentage: number) => {
    if (percentage >= 1000) {
      return `${(percentage / 1000).toFixed(1)}K`
    }
    return `${percentage}%`
  }

  return (
    <div className="space-y-6">
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Selected Symptoms ({state.selectedSymptoms.length})</CardTitle>
            <Button variant="outline" size="sm" onClick={() => dispatch({ type: "RESET_SYMPTOMS" })}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(groupedSymptoms).map(([bodyPartName, symptoms]) => (
              <div key={bodyPartName}>
                <h3 className="font-semibold text-gray-900 mb-2">{bodyPartName}</h3>
                <div className="space-y-2 pl-4">
                  {symptoms.map((selected, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{selected.symptom.name}</span>
                          <Badge className={getSeverityColor(selected.symptom.severity)}>
                            {selected.symptom.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{selected.symptom.description}</p>
                      </div>
                      <div className="ml-4">
                        <Badge className={getPercentageColor(selected.symptom.percentage)} variant="outline">
                          {formatPercentage(selected.symptom.percentage)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Card */}
      <Card className={`border-2 ${getRiskLevelColor(riskCalculation.riskLevel)}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <CardTitle className="text-lg">Risk Assessment</CardTitle>
            </div>
            <Badge className={getRiskLevelColor(riskCalculation.riskLevel)} variant="outline">
              {riskCalculation.riskLevel} Risk
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Overall Risk Percentage */}
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-3xl font-bold text-gray-900 mb-1">{riskCalculation.overallRiskPercentage}%</div>
            <p className="text-sm text-gray-600">Overall Risk Score</p>
            <p className="text-xs text-gray-500 mt-1">
              Based on {riskCalculation.totalSymptoms} symptoms (Avg: {riskCalculation.averageRisk}%)
            </p>
          </div>

          {/* Risk Message */}
          <div className="p-3 rounded-lg border-l-4 border-current">
            <p className="text-sm font-medium">{riskCalculation.riskMessage}</p>
          </div>

          {/* Highest Risk Symptoms */}
          {riskCalculation.highestRiskSymptoms.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Highest Risk Factors
              </h4>
              <div className="space-y-1">
                {riskCalculation.highestRiskSymptoms.map((symptom, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="text-gray-700">{symptom.name}</span>
                    <Badge className={getPercentageColor(symptom.percentage)} variant="outline" size="sm">
                      {formatPercentage(symptom.percentage)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {state.selectedSymptoms.length >= 2 && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">Ready for Assessment</p>
          <p className="text-xs text-blue-600 mt-1">
            You have selected {state.selectedSymptoms.length} symptoms with {riskCalculation.overallRiskPercentage}%
            overall risk score.
          </p>
          <Button className="mt-3 bg-blue-600 hover:bg-blue-700" onClick={() => dispatch({ type: "GO_TO_RESULTS" })}>
            Get Assessment
          </Button>
        </div>
      )}
    </div>
  )
}
