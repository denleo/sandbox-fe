import { TranslationDirection } from "../../redux/translationSetup/types";

export type GetTranslationsParams = {
  word: string;
  direction: TranslationDirection;
};

export interface ITranslationResult {
  partOfSpeech: string;

  /** word itself */
  word: string;

  /** transcription */
  transcription: string;

  /** translate variants */
  translations: { text: string; frequency: number }[];
}
