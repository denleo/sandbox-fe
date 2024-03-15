/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistConfig } from "../persist";
import { Theme, ThemeOptions } from "./types";

const initialState: ThemeOptions = {
  mode: Theme.Dark,
};

export const translationSetupSlice = createSlice({
  name: "themeOption",
  initialState: initialState,
  reducers: {
    setAppTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAppTheme } = translationSetupSlice.actions;

export default persistReducer(persistConfig, translationSetupSlice.reducer);
