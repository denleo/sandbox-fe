import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../firebase";

async function setFirebaseToken(headers: Headers) {
  if (!auth.currentUser) {
    return;
  }

  const token = await auth.currentUser.getIdToken();
  headers.set("Authorization", `Bearer ${token}`);
}

export const baseApiService = createApi({
  reducerPath: "apiService",
  tagTypes: ["Translations"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: setFirebaseToken,
  }),
  endpoints: (builder) => ({
    checkHealth: builder.query({
      query: () => "health",
      keepUnusedDataFor: 0,
    }),
  }),
});
