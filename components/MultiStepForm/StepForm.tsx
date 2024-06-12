"use client";
import { useSelector } from "react-redux";
import FormConfirmation from "./StepForms/FormConfirmation";
import FacialAuthentication from "./StepForms/FacialAuthentication";
import PersonalInfoForm from "./StepForms/PersonalInfoForm";

export default function StepForm() {
  // @ts-ignore
  const currentStep = useSelector((store) => store?.onboarding?.currentStep);
  function renderFormByStep(step: number) {
    if (step === 1) {
      return <PersonalInfoForm />;
    } else if (step === 2) {
      return <FacialAuthentication />;
    } else if (step === 3) {
      return <FormConfirmation />;
    }
  }
  return <>{renderFormByStep(currentStep)}</>;
}
