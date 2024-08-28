import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoursesState {
  selectedCourses: string[];
}

const initialState: CoursesState = {
  selectedCourses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<string>) => {
      if (!state.selectedCourses.includes(action.payload)) {
        state.selectedCourses.push(action.payload);
      }
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      state.selectedCourses = state.selectedCourses.filter(
        (course) => course !== action.payload
      );
    },
    setCourses: (state, action: PayloadAction<string[]>) => {
      state.selectedCourses = action.payload;
    },
  },
});

export const { addCourse, removeCourse, setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
