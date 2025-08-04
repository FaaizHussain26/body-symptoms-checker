"use client";

import type React from "react";
import { createContext, useContext, useReducer, type ReactNode } from "react";

export interface Symptom {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
  description: string;
  percentage: number;
}

export interface BodyPart {
  id: string;
  name: string;
  symptoms: Symptom[];
}

export interface SelectedSymptom {
  bodyPart: string;
  symptomId: string;
  symptom: Symptom;
}

export interface UserDemographics {
  age: number;
  sex: "male" | "female" | "other";
  name?: string;
  email?: string;
  phone?: string;
}

export interface Treatment {
  id: string;
  name: string;
  type:
    | "medication"
    | "lifestyle"
    | "therapy"
    | "home_remedy"
    | "medical_procedure";
  description: string;
  severity: "mild" | "moderate" | "severe";
  instructions: string;
  precautions?: string;
}

interface SymptomsState {
  currentStep: "demographics" | "symptoms_checklist" | "results";
  userDemographics: UserDemographics | null;
  selectedBodyPart: string | null;
  selectedSymptoms: SelectedSymptom[];
  sidebarOpen: boolean;
}

type SymptomsAction =
  | { type: "SET_DEMOGRAPHICS"; payload: UserDemographics }
  | { type: "SELECT_BODY_PART"; payload: string }
  | { type: "TOGGLE_SYMPTOM"; payload: { bodyPart: string; symptom: Symptom } }
  | { type: "CLOSE_SIDEBAR" }
  | { type: "RESET_SYMPTOMS" }
  | { type: "GO_TO_RESULTS" }
  | { type: "START_OVER" };

const initialState: SymptomsState = {
  currentStep: "demographics",
  userDemographics: null,
  selectedBodyPart: null,
  selectedSymptoms: [],
  sidebarOpen: false,
};

const symptomsReducer = (
  state: SymptomsState,
  action: SymptomsAction
): SymptomsState => {
  switch (action.type) {
    case "SET_DEMOGRAPHICS":
      return {
        ...state,
        userDemographics: action.payload,
        currentStep: "symptoms_checklist",
      };
    case "GO_TO_RESULTS":
      return {
        ...state,
        currentStep: "results",
        sidebarOpen: false,
      };
    case "START_OVER":
      return initialState;
    case "SELECT_BODY_PART":
      return {
        ...state,
        selectedBodyPart: action.payload,
        sidebarOpen: true,
      };
    case "TOGGLE_SYMPTOM": {
      const existingIndex = state.selectedSymptoms.findIndex(
        (s) =>
          s.bodyPart === action.payload.bodyPart &&
          s.symptomId === action.payload.symptom.id
      );

      if (existingIndex >= 0) {
        return {
          ...state,
          selectedSymptoms: state.selectedSymptoms.filter(
            (_, index) => index !== existingIndex
          ),
        };
      } else {
        return {
          ...state,
          selectedSymptoms: [
            ...state.selectedSymptoms,
            {
              bodyPart: action.payload.bodyPart,
              symptomId: action.payload.symptom.id,
              symptom: action.payload.symptom,
            },
          ],
        };
      }
    }
    case "CLOSE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: false,
        selectedBodyPart: null,
      };
    case "RESET_SYMPTOMS":
      return initialState;
    default:
      return state;
  }
};

const SymptomsContext = createContext<{
  state: SymptomsState;
  dispatch: React.Dispatch<SymptomsAction>;
} | null>(null);

export const SymptomsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(symptomsReducer, initialState);

  return (
    <SymptomsContext.Provider value={{ state, dispatch }}>
      {children}
    </SymptomsContext.Provider>
  );
};

export const useSymptoms = () => {
  const context = useContext(SymptomsContext);
  if (!context) {
    throw new Error("useSymptoms must be used within a SymptomsProvider");
  }
  return context;
};
