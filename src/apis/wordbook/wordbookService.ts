import {
  CreateTranslation,
  DeleteTranslation,
  DeleteTranslationResult,
  GetTranslationsQuery,
  TranslationDto,
  ViewTranslation,
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
      invalidatesTags: [{ type: "Translations", id: "LIST" }],
    }),

    deleteTranslation: builder.mutation<TranslationDto, DeleteTranslation>({
      query: ({ translationId }) => ({
        url: `wordbook-service/translations/${translationId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Translations", id: "LIST" }],
    }),

    deleteTranslationResult: builder.mutation<
      TranslationDto,
      DeleteTranslationResult
    >({
      query: ({ translationId, translationResultId }) => ({
        url: `wordbook-service/translations/${translationId}}/results/${translationResultId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Translations", id: arg.translationId },
      ],
    }),

    viewTranslation: builder.mutation<TranslationDto, ViewTranslation>({
      query: ({ translationId }) => ({
        url: `wordbook-service/translations/${translationId}/view`,
        method: "PATCH",
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
      keepUnusedDataFor: 60, // 1min
      providesTags: (result) => [
        ...result!.items.map(({ id }) => ({
          type: "Translations" as const,
          id,
        })),
        { type: "Translations", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTranslationMutation,
  useViewTranslationMutation,
  useDeleteTranslationMutation,
  useDeleteTranslationResultMutation,
  useGetTranslationsQuery,
} = wordbookApi;
