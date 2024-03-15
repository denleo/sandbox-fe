import { Lang } from "../../redux/translationSetup/types";
import { Order } from "../commonTypes";

export type DeleteTranslation = {
  translationId: string;
};

export type DeleteTranslationResult = DeleteTranslation & {
  translationResultId: string;
};

export type CreateTranslation = {
  word: string;
  sourceLang: Lang;
  targetLang: Lang;
  translation: string;
  partOfSpeech: string;
  transcription?: string;
};

export type GetTranslationsQuery = {
  page?: number;
  pageSize?: number;
  orderBy?: TranslationOrdering;
  order?: Order;
  sourceLang?: Lang;
  targetLang?: Lang;
  word?: string;
  partOfSpeech?: string[];
};

export enum TranslationOrdering {
  Word = "word",
  CreatedAt = "createdAt",
  LastViewedAt = "lastViewedAt",
}

//-------------------------Payloads------------------------------

export type TranslationDto = {
  id: string;
  word: string;
  sourceLang: Lang;
  targetLang: Lang;
  createdAt: string;
  lastViewed: string;
  translationResults: TranslationResultDto[];
};

export type TranslationResultDto = {
  id: string;
  translation: string;
  partOfSpeech: string;
  transcription: string;
};
