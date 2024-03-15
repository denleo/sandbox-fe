import {
  CreateTranslation,
  DeleteTranslation,
  DeleteTranslationResult,
  GetTranslationsQuery,
  TranslationDto,
} from "./types";
import { baseApiService } from "../baseApiService";
import { Pageable } from "../commonTypes";

const wordbookApi = baseApiService.injectEndpoints({
  endpoints: (builder) => ({
    createTranslation: builder.mutation<TranslationDto, CreateTranslation>({
      query: (translation) => ({
        url: "wordbook-service/translations",
        method: "POST",
        body: translation,
      }),
      invalidatesTags: ["Translations"],
    }),

    deleteTranslation: builder.mutation<TranslationDto, DeleteTranslation>({
      query: ({ translationId }) => ({
        url: `wordbook-service/translations/${translationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Translations"],
    }),

    deleteTranslationResult: builder.mutation<
      TranslationDto,
      DeleteTranslationResult
    >({
      query: ({ translationId, translationResultId }) => ({
        url: `wordbook-service/translations/${translationId}}/results/${translationResultId}`,
        method: "DELETE",
      }),
    }),

    getTranslations: builder.query<
      Pageable<TranslationDto>,
      GetTranslationsQuery
    >({
      query: (query) => ({
        url: "wordbook-service/translations",
        method: "GET",
        params: {
          page: query.page,
          pageSize: query.pageSize,
          orderBy: query.orderBy,
          order: query.order,
          sourceLang: query.sourceLang,
          targetLang: query.targetLang,
          word: query.word,
          partOfSpeech: query.partOfSpeech,
        },
      }),
      keepUnusedDataFor: 300, // 5min
      providesTags: ["Translations"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTranslationMutation,
  useDeleteTranslationMutation,
  useDeleteTranslationResultMutation,
  useGetTranslationsQuery,
} = wordbookApi;
