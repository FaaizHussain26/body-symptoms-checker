/* eslint-disable @typescript-eslint/no-unused-vars */

import type { SelectedSymptom } from "@/contexts/symptoms-context";

export interface RiskCalculation {
  overallRiskPercentage: number;
  riskLevel: "Low" | "Moderate" | "High" | "Critical";
  riskMessage: string;
  highestRiskSymptoms: Array<{ name: string; percentage: number }>;
  totalSymptoms: number;
  averageRisk: number;
}

export function calculateOverallRisk(
  selectedSymptoms: SelectedSymptom[]
): RiskCalculation {
  const totalSymptoms = selectedSymptoms.length;

  let totalWeightedRisk = 0;
  let totalWeight = 0;

  if (totalSymptoms === 0) {
    return {
      overallRiskPercentage: 0,
      riskLevel: "Low",
      riskMessage: "No symptoms selected",
      highestRiskSymptoms: [],
      totalSymptoms: 0,
      averageRisk: 0,
    };
  }

  const symptomRisks = selectedSymptoms.map((selected) => {
    const symptom = selected.symptom;
    let weight = 1;

    switch (symptom.severity) {
      case "severe":
        weight = 3;
        break;
      case "moderate":
        weight = 2;
        break;
      case "mild":
        weight = 1;
        break;
    }

    let adjustedPercentage = symptom.percentage;
    if (symptom.percentage > 1000) {
      // For mortality statistics, convert to a more reasonable scale
      adjustedPercentage = Math.min(100, Math.log10(symptom.percentage) * 20);
    } else if (symptom.percentage > 100) {
      // For increased risk percentages over 100%, cap at 100
      adjustedPercentage = Math.min(100, symptom.percentage);
    }

    const weightedRisk = adjustedPercentage * weight;
    totalWeightedRisk += weightedRisk;
    totalWeight += weight;

    return {
      name: symptom.name,
      percentage: symptom.percentage,
      adjustedPercentage,
      weight,
      weightedRisk,
    };
  });

  // Calculate overall risk percentage using compound risk model
  const averageRisk =
    totalSymptoms > 0
      ? selectedSymptoms.reduce((sum, s) => sum + s.symptom.percentage, 0) /
        totalSymptoms
      : 0;

  // Use compound risk calculation: 1 - (1-risk1) * (1-risk2) * ...
  // This ensures risk increases as more symptoms are added
  let compoundRisk = 0;
  if (totalSymptoms > 0) {
    // Start with probability of NO risk (1.0)
    let noRiskProbability = 1.0;

    symptomRisks.forEach((symptomRisk) => {
      // Convert percentage to probability (0-1)
      const riskProbability = Math.min(
        0.95,
        symptomRisk.adjustedPercentage / 100
      ); // Cap at 95%

      // Apply severity weight by increasing the risk probability
      const weightedRiskProbability = Math.min(
        0.95,
        riskProbability * Math.sqrt(symptomRisk.weight)
      );

      // Compound the risks: multiply the "no risk" probabilities
      noRiskProbability *= 1 - weightedRiskProbability;
    });

    // Overall risk is 1 minus the probability of no risk
    compoundRisk = 1 - noRiskProbability;
  }

  const overallRiskPercentage = Math.min(99, compoundRisk * 100);

  // Determine risk level
  let riskLevel: "Low" | "Moderate" | "High" | "Critical";
  let riskMessage: string;

  if (overallRiskPercentage >= 80) {
    riskLevel = "Critical";
    riskMessage =
      "🚨 CRITICAL RISK: Your symptom combination indicates extremely high risk for serious complications. Immediate medical attention required.";
  } else if (overallRiskPercentage >= 60) {
    riskLevel = "High";
    riskMessage =
      "⚠️ HIGH RISK: Multiple high-risk symptoms detected. Urgent medical evaluation recommended within 1-2 weeks.";
  } else if (overallRiskPercentage >= 30) {
    riskLevel = "Moderate";
    riskMessage =
      "⚡ MODERATE RISK: Several concerning symptoms present. Medical consultation advised within 2-4 weeks.";
  } else {
    riskLevel = "Low";
    riskMessage =
      "✅ LOW RISK: Current symptoms show lower risk profile. Continue monitoring and maintain healthy habits.";
  }

  // Get highest risk symptoms (top 3)
  const highestRiskSymptoms = symptomRisks
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3)
    .map((item) => ({
      name: item.name,
      percentage: item.percentage,
    }));

  return {
    overallRiskPercentage: Math.round(overallRiskPercentage),
    riskLevel,
    riskMessage,
    highestRiskSymptoms,
    totalSymptoms,
    averageRisk: Math.round(averageRisk),
  };
}

export function getRiskLevelColor(riskLevel: string): string {
  switch (riskLevel) {
    case "Critical":
      return "bg-red-100 text-red-800 border-red-300";
    case "High":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "Moderate":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Low":
      return "bg-green-100 text-green-800 border-green-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}
