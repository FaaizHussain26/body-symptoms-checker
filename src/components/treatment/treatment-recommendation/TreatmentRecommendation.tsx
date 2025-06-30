
import { useSymptoms } from "@/contexts/symptoms-context"
import { calculateOverallRisk, getRiskLevelColor } from "@/utils/risk-calculator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Download, RotateCcw, Pill, Heart, Home, Stethoscope, Activity, TrendingUp } from "lucide-react"
import html2canvas from "html2canvas"
import { useRef, useState } from "react"

// Add this import at the top
import "./screenshot-styles.css"
import { getAllTreatmentsForSymptoms } from "@/utils/data/treatment-data"
import { bodyParts } from "@/utils/data/body-parts"

export const TreatmentRecommendations: React.FC<{}> = () => {
  const { state, dispatch } = useSymptoms()
  const contentRef = useRef<HTMLDivElement>(null)
  const [isGeneratingScreenshot, setIsGeneratingScreenshot] = useState(false)

  const selectedSymptomIds = state.selectedSymptoms.map((s) => s.symptom.id)
  const treatments = getAllTreatmentsForSymptoms(selectedSymptomIds)
  const riskCalculation = calculateOverallRisk(state.selectedSymptoms)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill className="h-4 w-4" />
      case "lifestyle":
        return <Heart className="h-4 w-4" />
      case "therapy":
        return <Activity className="h-4 w-4" />
      case "home_remedy":
        return <Home className="h-4 w-4" />
      case "medical_procedure":
        return <Stethoscope className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "medication":
        return "bg-blue-100 text-blue-800"
      case "lifestyle":
        return "bg-green-100 text-green-800"
      case "therapy":
        return "bg-purple-100 text-purple-800"
      case "home_remedy":
        return "bg-orange-100 text-orange-800"
      case "medical_procedure":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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

  const handleScreenshot = async () => {
    if (contentRef.current) {
      setIsGeneratingScreenshot(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 100))

        const originalElement = contentRef.current
        const clonedElement = originalElement.cloneNode(true) as HTMLElement

        const replaceOklchColors = (element: HTMLElement) => {
          const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, null)

          const elements: HTMLElement[] = []
          let node = walker.nextNode()
          while (node) {
            elements.push(node as HTMLElement)
            node = walker.nextNode()
          }

          elements.forEach((el) => {
            const computedStyle = window.getComputedStyle(el)
            const style = el.style

            const properties = [
              "color",
              "backgroundColor",
              "borderColor",
              "borderTopColor",
              "borderRightColor",
              "borderBottomColor",
              "borderLeftColor",
            ]

            properties.forEach((prop) => {
              const value = computedStyle.getPropertyValue(prop)
              if (value && !value.includes("oklch")) {
                style.setProperty(prop, value)
              }
            })
          })
        }

        replaceOklchColors(clonedElement)

        clonedElement.style.position = "absolute"
        clonedElement.style.left = "-9999px"
        clonedElement.style.top = "0"
        document.body.appendChild(clonedElement)

        const canvas = await html2canvas(clonedElement, {
          backgroundColor: "#ffffff",
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          height: clonedElement.scrollHeight,
          width: clonedElement.scrollWidth,
          scrollX: 0,
          scrollY: 0,
          ignoreElements: (element) => {
            return element.tagName === "SCRIPT" || element.tagName === "STYLE"
          },
        })

        document.body.removeChild(clonedElement)

        const link = document.createElement("a")
        const timestamp = new Date().toISOString().split("T")[0]
        const patientName = state.userDemographics?.name ? `-${state.userDemographics.name.replace(/\s+/g, "-")}` : ""
        link.download = `sleep-apnea-report${patientName}-${timestamp}.png`
        link.href = canvas.toDataURL("image/png", 1.0)

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        console.log("Screenshot saved successfully!")
      } catch (error) {
        console.error("Error taking screenshot:", error)

        try {
          const canvas = await html2canvas(contentRef.current, {
            backgroundColor: "#ffffff",
            scale: 1,
            logging: true,
            useCORS: false,
            allowTaint: false,
          })

          const link = document.createElement("a")
          const timestamp = new Date().toISOString().split("T")[0]
          link.download = `sleep-apnea-report-${timestamp}.png`
          link.href = canvas.toDataURL("image/png", 0.8)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          console.log("Screenshot saved with fallback method!")
        } catch (fallbackError) {
          console.error("Fallback screenshot also failed:", fallbackError)
          alert(
            "Failed to generate screenshot. This might be due to browser compatibility issues with modern CSS colors.",
          )
        }
      } finally {
        setIsGeneratingScreenshot(false)
      }
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Treatment Recommendations</h1>
            <p className="text-gray-600 mt-2">
              {state.userDemographics?.name && `Hello ${state.userDemographics.name}, `}
              Based on your selected symptoms, here are personalized recommendations
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleScreenshot} variant="outline" disabled={isGeneratingScreenshot}>
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingScreenshot ? "Generating..." : "Save Report"}
            </Button>
            <Button onClick={() => dispatch({ type: "START_OVER" })} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>

        <div ref={contentRef} className="space-y-6 screenshot-safe">
          {/* Risk Assessment Summary */}
          <Card className={`border-2 ${getRiskLevelColor(riskCalculation.riskLevel)}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <CardTitle>Overall Risk Assessment</CardTitle>
                </div>
                <Badge className={getRiskLevelColor(riskCalculation.riskLevel)} variant="outline">
                  {riskCalculation.riskLevel} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{riskCalculation.overallRiskPercentage}%</div>
                  <p className="text-sm text-gray-600">Overall Risk Score</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{riskCalculation.totalSymptoms}</div>
                  <p className="text-sm text-gray-600">Symptoms Selected</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{riskCalculation.averageRisk}%</div>
                  <p className="text-sm text-gray-600">Average Risk</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border-l-4 border-current">
                <p className="font-medium text-sm">{riskCalculation.riskMessage}</p>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {state.userDemographics?.name && (
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{state.userDemographics.name}</p>
                  </div>
                )}
                {state.userDemographics?.email && (
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{state.userDemographics.email}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-medium">{state.userDemographics?.age} years</p>
                </div>
                {state.userDemographics?.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{state.userDemographics.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Sex</p>
                  <p className="font-medium capitalize">{state.userDemographics?.sex}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Symptoms with Percentages */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Symptoms ({state.selectedSymptoms.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(groupedSymptoms).map(([bodyPartName, symptoms]) => (
                  <div key={bodyPartName}>
                    <h3 className="font-semibold text-gray-900 mb-2">{bodyPartName}</h3>
                    <div className="grid gap-2 pl-4">
                      {symptoms.map((selected, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{selected.symptom.name}</span>
                              <Badge className={getSeverityColor(selected.symptom.severity)}>
                                {selected.symptom.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{selected.symptom.description}</p>
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

          {/* Treatment Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Treatments</CardTitle>
              <CardDescription>
                These recommendations are based on your selected symptoms. Always consult with a healthcare professional
                before starting any treatment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {treatments.length > 0 ? (
                <div className="space-y-4">
                  {treatments.map((treatment, index) => (
                    <div key={treatment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(treatment.type)}
                          <h3 className="font-semibold text-lg">{treatment.name}</h3>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getTypeColor(treatment.type)}>{treatment.type.replace("_", " ")}</Badge>
                          <Badge className={getSeverityColor(treatment.severity)}>{treatment.severity}</Badge>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{treatment.description}</p>

                      <div className="space-y-2">
                        <div>
                          <h4 className="font-medium text-sm text-gray-900">Instructions:</h4>
                          <p className="text-sm text-gray-700">{treatment.instructions}</p>
                        </div>

                        {treatment.precautions && (
                          <div className="flex items-start gap-2 p-2 bg-amber-50 rounded">
                            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-sm text-amber-800">Precautions:</h4>
                              <p className="text-sm text-amber-700">{treatment.precautions}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {index < treatments.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">
                  No specific treatments found for the selected symptoms. Please consult with a healthcare professional.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-amber-800 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <p className="font-medium">Important Medical Disclaimer</p>
              </div>
              <p className="text-sm text-amber-700">
                This tool is for informational purposes only and should not replace professional medical advice,
                diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider
                with any questions you may have regarding a medical condition. Never disregard professional medical
                advice or delay in seeking it because of something you have read here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
