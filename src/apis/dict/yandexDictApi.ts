import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Lang } from "../../redux/translationSetup/types";
import { GetTranslationsParams, ITranslationResult } from "./types";

const apiKey =
  "dict.1.1.20231219T121624Z.904f65788285e467.9da70f415502dcb3c000ee1aa8b2176c36ebf724";

function Map(language: Lang): "ru" | "en" | "uk" | "pl" {
  switch (language) {
    case Lang.English:
      return "en";
    case Lang.Russian:
      return "ru";
    case Lang.Poland:
      return "pl";
    case Lang.Ukraine:
      return "uk";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transform(response: any): ITranslationResult[] {
  return response.def.map((x) => {
    return {
      partOfSpeech: x.pos?.charAt(0).toUpperCase() + x.pos?.slice(1),
      word: x?.text,
      transcription: x?.ts,
      translations: x?.tr
        .sort((a, b) => (a.fr > b.fr ? -1 : 1))
        .map((y) => ({ text: y.text, frequency: y.fr })),
    } as ITranslationResult;
  });
}

export const yandexDictApi = createApi({
  reducerPath: "yandexDictApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dictionary.yandex.net/api/v1/",
  }),
  endpoints: (builder) => ({
    getTranslations: builder.query<ITranslationResult[], GetTranslationsParams>(
      {
        query: ({ word, direction }) =>
          `dicservice.json/lookup?key=${apiKey}&ui=en&lang=${Map(
            direction.sourceLang
          )}-${Map(direction.targetLang)}&text=${word}`,
        transformResponse: transform,
        keepUnusedDataFor: 600,
      }
    ),
  }),
});

export const { useLazyGetTranslationsQuery } = yandexDictApi;
