import type { BodyPart } from "@/contexts/symptoms-context";

export const bodyParts: BodyPart[] = [
  {
    id: "body-model-head",
    name: "Head & Brain",
    symptoms: [
      {
        id: "memory-issues",
        name: "Memory Issues",
        severity: "moderate",
        description:
          "Difficulty with memory, concentration, and cognitive function due to poor sleep quality",
        percentage: 19,
      },
      {
        id: "poor-sleep",
        name: "Poor Sleep Quality",
        severity: "severe",
        description:
          "Fragmented sleep, frequent awakenings, and non-restorative sleep",
        percentage: 19,
      },
      {
        id: "morning-headaches",
        name: "Morning Headaches",
        severity: "moderate",
        description:
          "Headaches upon waking, often caused by oxygen deprivation during sleep",
        percentage: 19,
      },
      {
        id: "mood-disturbance",
        name: "Mood Disturbance",
        severity: "moderate",
        description:
          "Depression, anxiety, PTSD, shortened attention span, moodiness and bad temper, poor judgment",
        percentage: 19,
      },
      {
        id: "daytime-sleepiness",
        name: "Excessive Daytime Sleepiness",
        severity: "severe",
        description:
          "6-fold increase of car accidents, impaired concentration and memory loss, reduced work efficiency, reduced alertness, slower reaction time",
        percentage: 19,
      },
    ],
  },
  {
    id: "body-model-neck_or_throat",
    name: "Throat & Airways",
    symptoms: [
      {
        id: "loud-snoring",
        name: "Loud Snoring",
        severity: "moderate",
        percentage: 70,
        description:
          "Affects 50-90% of OSA patients. Relationship discord, morning headaches caused by oxygen deprivation",
      },
      {
        id: "sleep-apnea",
        name: "Obstructive Sleep Apnea",
        percentage: 70,
        severity: "severe",
        description:
          "Repeated episodes of breathing cessation during sleep, affecting 1 in 5 adult Americans",
      },
      {
        id: "gasping-choking",
        name: "Gasping/Choking During Sleep",
        severity: "severe",
        description:
          "Sudden awakening with gasping or choking sensations due to airway obstruction",
        percentage: 80,
      },
    ],
  },
  {
    id: "body-model-chest",
    name: "Heart & Cardiovascular System",
    symptoms: [
      {
        id: "hypertension",
        name: "High Blood Pressure (Hypertension)",
        severity: "severe",
        description:
          "41% increased risk. Sleep Apnea is an identifiable cause of high blood pressure and leading cause of secondary hypertension",
        percentage: 41,
      },
      {
        id: "coronary-artery-disease",
        name: "Coronary Artery Disease",
        severity: "severe",
        description: "30% increased risk of developing coronary artery disease",
        percentage: 30,
      },
      {
        id: "congestive-heart-failure",
        name: "Congestive Heart Failure (CHF)",
        percentage: 140,
        severity: "severe",
        description:
          "140% increased risk. Moderate OSA has increased mortality rates",
      },
      {
        id: "stroke-risk",
        name: "Stroke Risk",
        severity: "severe",
        description:
          "60% increased risk. Men with moderate to severe OSA were nearly 3x more likely to have stroke",
        percentage: 60,
      },
      {
        id: "cardiovascular-death",
        name: "Cardiovascular Death Risk",
        percentage: 38000,
        severity: "severe",
        description:
          "38,000 cardiovascular deaths annually. OSA sufferers have 30% higher risk of heart attack or premature death",
      },
    ],
  },
  {
    id: "body-model-upper_abdomen",
    name: "Upper Digestive System",
    symptoms: [
      {
        id: "gerd",
        name: "Gastroesophageal Reflux Disease (GERD)",
        severity: "moderate",
        description:
          "18% of OSA patients experience GERD, with acid reflux symptoms worsening during sleep",
        percentage: 18,
      },
      {
        id: "high-cholesterol",
        name: "High Cholesterol",
        severity: "moderate",
        description:
          "10% increased risk of elevated cholesterol levels associated with sleep apnea",
        percentage: 10,
      },
    ],
  },
  {
    id: "body-model-mid_abdomen",
    name: "Metabolic System",
    symptoms: [
      {
        id: "diabetes-type-2",
        name: "Diabetes Type II",
        severity: "severe",
        description:
          "15% increased risk. Lack of insulin control and poorly controlled blood sugars",
        percentage: 15,
      },
      {
        id: "obesity",
        name: "Obesity",
        severity: "severe",
        percentage: 34,
        description:
          "34% correlation. As sleep shortens or diminishes in quality, appetite for high calorie food increases. Obesity is the best documented risk factor for OSA. The prevalence of OSA increases with Body Mass Index (BMI). Approximately 90% of OSA patients weigh 130% or more of their ideal body weight",
      },
      {
        id: "weight-gain",
        percentage: 34,
        name: "Unexplained Weight Gain",
        severity: "moderate",
        description:
          "Poor sleep quality leads to hormonal changes that increase appetite and weight gain",
      },
    ],
  },
  {
    id: "body-model-lower_abdomen",
    name: "Lower Abdomen & Urinary",
    symptoms: [
      {
        id: "nocturia",
        name: "Nocturia (Frequent Nighttime Urination)",
        severity: "moderate",
        description:
          "Frequent urination at night, disrupting sleep patterns and contributing to sleep fragmentation",
        percentage: 40,
      },
      {
        id: "sexual-dysfunction",
        name: "Sexual Dysfunction",
        severity: "moderate",
        percentage: 40,
        description:
          "40% of OSA patients experience loss of libido and impotence",
      },
    ],
  },
  {
    id: "body-model-chest",
    name: "Respiratory System",
    symptoms: [
      {
        id: "asthma",
        name: "Asthma",
        percentage: 4,
        severity: "moderate",
        description:
          "4% correlation with sleep apnea. OSA can worsen asthma symptoms and vice versa",
      },
      {
        id: "shortness-of-breath",
        name: "Shortness of Breath",
        severity: "moderate",
        percentage: 35,
        description:
          "Difficulty breathing, especially during physical activity or when lying down",
      },
    ],
  },
  {
    id: "general",
    name: "General Health Risks",
    symptoms: [
      {
        id: "premature-death",
        name: "Increased Death Risk",
        severity: "severe",
        description:
          "2.5% more likely risk of death. More than 50% of sudden deaths from Sleep Apnea occur between 10pm and 6am",
        percentage: 2.5,
      },
      {
        id: "chronic-fatigue",
        name: "Chronic Fatigue",
        severity: "severe",
        description:
          "Persistent exhaustion despite spending adequate time in bed, due to poor sleep quality",
        percentage: 70,
      },
      {
        id: "reduced-quality-of-life",
        name: "Reduced Quality of Life",
        severity: "moderate",
        description:
          "Overall decreased life satisfaction due to multiple health complications from untreated sleep apnea",
        percentage: 55,
      },
    ],
  },
];
