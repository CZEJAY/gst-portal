import onboardingStudentsSlice from "./slices/onboardingStudentsSlice";
import coursesSlice from "./slices/courseSlice";

import {configureStore} from "@reduxjs/toolkit"
//create a store and give it slices
export const store = configureStore({
  reducer: {
    onboarding: onboardingStudentsSlice,
    courses: coursesSlice,
  },
});



//Store =whole state
