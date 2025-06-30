import type { Treatment } from "@/contexts/symptoms-context";

export const treatmentsData: Record<string, Treatment[]> = {
  "sleep-apnea": [
    {
      id: "cpap-therapy",
      name: "CPAP Therapy",
      type: "medical_procedure",
      description:
        "Continuous Positive Airway Pressure therapy - gold standard treatment for OSA",
      severity: "severe",
      instructions:
        "Use CPAP machine nightly as prescribed. Maintain consistent sleep schedule and proper mask fit.",
      precautions:
        "Requires prescription and sleep study. Regular follow-up with sleep specialist needed.",
    },
    {
      id: "weight-loss",
      name: "Weight Loss Program",
      type: "lifestyle",
      description: "Losing weight can significantly reduce OSA severity",
      severity: "moderate",
      instructions:
        "Aim for 10% body weight reduction through diet and exercise. Consult nutritionist for personalized plan.",
      precautions:
        "Gradual weight loss is safer. Consult healthcare provider before starting any weight loss program.",
    },
    {
      id: "sleep-position",
      name: "Positional Therapy",
      type: "lifestyle",
      description: "Sleep on your side to reduce airway obstruction",
      severity: "mild",
      instructions:
        "Use body pillows or positional devices to maintain side sleeping. Elevate head of bed 4-6 inches.",
    },
  ],
  "loud-snoring": [
    {
      id: "nasal-strips",
      name: "Nasal Strips/Dilators",
      type: "home_remedy",
      description: "Open nasal passages to improve airflow",
      severity: "mild",
      instructions:
        "Apply nasal strips before bedtime. Use nasal saline rinse to clear congestion.",
    },
    {
      id: "avoid-alcohol",
      name: "Avoid Alcohol Before Bed",
      type: "lifestyle",
      description: "Alcohol relaxes throat muscles, worsening snoring",
      severity: "mild",
      instructions: "Stop alcohol consumption at least 3 hours before bedtime.",
    },
  ],
  hypertension: [
    {
      id: "cpap-for-bp",
      name: "CPAP for Blood Pressure Control",
      type: "medical_procedure",
      description:
        "CPAP therapy can help reduce blood pressure in OSA patients",
      severity: "severe",
      instructions:
        "Use CPAP consistently every night. Monitor blood pressure regularly.",
      precautions:
        "Continue prescribed blood pressure medications unless advised otherwise by physician.",
    },
    {
      id: "dash-diet",
      name: "DASH Diet",
      type: "lifestyle",
      description: "Dietary approach to reduce blood pressure",
      severity: "moderate",
      instructions:
        "Reduce sodium intake, increase fruits/vegetables, choose whole grains, limit processed foods.",
    },
  ],
  "diabetes-type-2": [
    {
      id: "sleep-apnea-treatment",
      name: "Treat Underlying Sleep Apnea",
      type: "medical_procedure",
      description: "Treating OSA can improve blood sugar control",
      severity: "severe",
      instructions:
        "Follow prescribed sleep apnea treatment plan. Monitor blood glucose levels regularly.",
      precautions:
        "Work with both sleep specialist and endocrinologist for comprehensive care.",
    },
    {
      id: "blood-sugar-monitoring",
      name: "Continuous Glucose Monitoring",
      type: "medical_procedure",
      description: "Regular monitoring to track blood sugar patterns",
      severity: "moderate",
      instructions:
        "Check blood glucose as prescribed. Keep log of readings and sleep quality.",
    },
  ],
  "daytime-sleepiness": [
    {
      id: "sleep-hygiene",
      name: "Sleep Hygiene Improvement",
      type: "lifestyle",
      description: "Optimize sleep environment and habits",
      severity: "moderate",
      instructions:
        "Maintain consistent sleep schedule, dark quiet room, avoid screens before bed, limit caffeine.",
    },
    {
      id: "nap-management",
      name: "Strategic Napping",
      type: "lifestyle",
      description: "Short naps can help manage excessive sleepiness",
      severity: "mild",
      instructions:
        "Limit naps to 20-30 minutes before 3 PM. Avoid long or late afternoon naps.",
      precautions:
        "Excessive napping may worsen nighttime sleep. Address underlying sleep apnea first.",
    },
  ],
  "memory-issues": [
    {
      id: "cognitive-rehabilitation",
      name: "Cognitive Rehabilitation",
      type: "therapy",
      description: "Exercises to improve memory and concentration",
      severity: "moderate",
      instructions:
        "Practice memory exercises, use organizational tools, maintain regular sleep schedule.",
    },
    {
      id: "treat-sleep-apnea-cognitive",
      name: "Sleep Apnea Treatment for Cognitive Function",
      type: "medical_procedure",
      description: "Treating OSA often improves cognitive symptoms",
      severity: "severe",
      instructions:
        "Follow prescribed sleep apnea treatment. Cognitive improvements may take 3-6 months.",
    },
  ],
  gerd: [
    {
      id: "elevate-head",
      name: "Elevate Head of Bed",
      type: "lifestyle",
      description: "Reduce acid reflux during sleep",
      severity: "mild",
      instructions:
        "Raise head of bed 6-8 inches using blocks or wedge pillow. Sleep on left side.",
    },
    {
      id: "avoid-late-meals",
      name: "Avoid Late Evening Meals",
      type: "lifestyle",
      description: "Prevent acid reflux during sleep",
      severity: "mild",
      instructions:
        "Stop eating 3 hours before bedtime. Avoid spicy, fatty, or acidic foods in evening.",
    },
  ],
  obesity: [
    {
      id: "comprehensive-weight-program",
      name: "Comprehensive Weight Management",
      type: "lifestyle",
      description: "Structured approach to weight loss for OSA patients",
      severity: "severe",
      instructions:
        "Combine diet modification, regular exercise, and behavioral changes. Target 10% weight loss initially.",
      precautions:
        "Work with healthcare team including dietitian. Weight loss surgery may be considered for severe cases.",
    },
    {
      id: "bariatric-surgery",
      name: "Bariatric Surgery Evaluation",
      type: "medical_procedure",
      description: "Surgical weight loss option for severe obesity with OSA",
      severity: "severe",
      instructions:
        "Consult bariatric surgeon for evaluation. Requires comprehensive medical and psychological assessment.",
      precautions:
        "Major surgery with risks. Requires lifelong dietary changes and follow-up.",
    },
  ],
  "sexual-dysfunction": [
    {
      id: "treat-osa-for-sexual-health",
      name: "OSA Treatment for Sexual Function",
      type: "medical_procedure",
      description: "Treating sleep apnea often improves sexual function",
      severity: "moderate",
      instructions:
        "Follow prescribed sleep apnea treatment consistently. Improvements may take several months.",
    },
    {
      id: "lifestyle-sexual-health",
      name: "Lifestyle Changes for Sexual Health",
      type: "lifestyle",
      description: "Exercise and weight loss can improve sexual function",
      severity: "mild",
      instructions:
        "Regular exercise, weight management, stress reduction, limit alcohol consumption.",
    },
  ],
  nocturia: [
    {
      id: "fluid-management",
      name: "Fluid Management",
      type: "lifestyle",
      description: "Manage fluid intake to reduce nighttime urination",
      severity: "mild",
      instructions:
        "Limit fluids 2-3 hours before bedtime. Empty bladder before sleep.",
    },
    {
      id: "treat-osa-nocturia",
      name: "Sleep Apnea Treatment for Nocturia",
      type: "medical_procedure",
      description: "Treating OSA often reduces nighttime urination",
      severity: "moderate",
      instructions:
        "Follow prescribed sleep apnea treatment. Nocturia improvement may take several weeks.",
    },
  ],
  "mood-disturbance": [
    {
      id: "sleep-apnea-mental-health",
      name: "Sleep Apnea Treatment for Mental Health",
      type: "medical_procedure",
      description:
        "Treating OSA can significantly improve mood and mental health",
      severity: "severe",
      instructions:
        "Follow prescribed sleep apnea treatment consistently. Consider counseling for additional support.",
    },
    {
      id: "stress-management",
      name: "Stress Management Techniques",
      type: "therapy",
      description: "Techniques to manage anxiety and mood changes",
      severity: "moderate",
      instructions:
        "Practice relaxation techniques, meditation, regular exercise, maintain social connections.",
    },
  ],
  asthma: [
    {
      id: "integrated-treatment",
      name: "Integrated OSA and Asthma Treatment",
      type: "medical_procedure",
      description: "Coordinated treatment of both conditions",
      severity: "severe",
      instructions:
        "Work with both sleep specialist and pulmonologist. Use prescribed inhalers and CPAP as directed.",
      precautions: "Both conditions can worsen each other if untreated.",
    },
  ],
  "premature-death": [
    {
      id: "comprehensive-osa-treatment",
      name: "Comprehensive Sleep Apnea Treatment",
      type: "medical_procedure",
      description: "Aggressive treatment of OSA to reduce mortality risk",
      severity: "severe",
      instructions:
        "Follow all prescribed treatments consistently. Regular follow-up with sleep specialist and primary care.",
      precautions:
        "Untreated severe OSA significantly increases risk of sudden death, especially between 10 PM and 6 AM.",
    },
  ],
};

export function getTreatmentsForSymptom(symptomId: string): Treatment[] {
  return treatmentsData[symptomId] || [];
}

export function getAllTreatmentsForSymptoms(symptomIds: string[]): Treatment[] {
  const allTreatments: Treatment[] = [];
  symptomIds.forEach((symptomId) => {
    const treatments = getTreatmentsForSymptom(symptomId);
    allTreatments.push(...treatments);
  });
  return allTreatments;
}
