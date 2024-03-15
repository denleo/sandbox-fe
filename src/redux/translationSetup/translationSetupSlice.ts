/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Lang, TranslationDirection, TranslationSetup } from "./types";
import { persistReducer } from "redux-persist";
import { persistConfig } from "../persist";

const initialState: TranslationSetup = {
  direction: {
    sourceLang: Lang.English,
    targetLang: Lang.Russian,
  },
};

export const translationSetupSlice = createSlice({
  name: "translationSetup",
  initialState: initialState,
  reducers: {
    setTranslationDirection: (
      state,
      action: PayloadAction<TranslationDirection>
    ) => {
      state.direction = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTranslationDirection } = translationSetupSlice.actions;

export default persistReducer(persistConfig, translationSetupSlice.reducer);
