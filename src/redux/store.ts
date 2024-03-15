import { configureStore } from "@reduxjs/toolkit";
import translationSetupReducer from "./translationSetup/translationSetupSlice";
import themeOptionReducer from "./themeOption/themeOptionSlice";
import { yandexDictApi } from "../apis/dict/yandexDictApi";
import { persistStore } from "redux-persist";
import { baseApiService } from "../apis/baseApiService";

export const store = configureStore({
  reducer: {
    translationSetup: translationSetupReducer,
    themeOptions: themeOptionReducer,
    [yandexDictApi.reducerPath]: yandexDictApi.reducer,
    [baseApiService.reducerPath]: baseApiService.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(yandexDictApi.middleware)
      .concat(baseApiService.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
