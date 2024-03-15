export enum Lang {
  Russian,
  English,
  Ukraine,
  Poland,
}

export type TranslationDirection = {
  sourceLang: Lang;
  targetLang: Lang;
};

export type TranslationSetup = {
  direction: TranslationDirection;
};
