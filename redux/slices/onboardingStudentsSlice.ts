import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingState {
  currentStep: number;
  formData: Record<string, any>;
}

const initialState: OnboardingState = {
  currentStep:  1,
  formData: {},
};

const onboardingStudentsSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      localStorage.setItem("currentStep", String(action.payload))
    },
    updateFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
      localStorage.setItem("formData", JSON.stringify(state.formData))
    },

  },
});

export const { setCurrentStep, updateFormData } = onboardingStudentsSlice.actions;
export default onboardingStudentsSlice.reducer;
