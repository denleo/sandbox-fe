import styles from "./styles.module.scss";
import { partOfSpeechColors } from "../../pages/wordbook/colors";
import { ITranslationResult } from "../../apis/dict/types";

function WordCard({
  translation,
  addTranslationHandler,
}: {
  translation: ITranslationResult;
  addTranslationHandler: (
    translation: ITranslationResult,
    translationChoice: string
  ) => void;
}) {
  return (
    <div className={styles.wordCard}>
      <h3
        className={styles.partOfSpeech}
        style={{
          backgroundColor: partOfSpeechColors[translation.partOfSpeech],
        }}
      >
        {translation.partOfSpeech}
      </h3>
      <h4 className={styles.transcription}>
        {translation.word}
        {translation.transcription ? ` (${translation.transcription})` : ""}
      </h4>
      <div className={styles.translationResultsSection}>
        {translation.translations.map((x) => (
          <div
            className={styles.translationResult}
            key={x.text}
            onClick={() => addTranslationHandler(translation, x.text)}
          >
            <div className={styles.translationText}>{x.text}</div>
            <div className={styles.frequencyBadge}>{x.frequency}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordCard;
