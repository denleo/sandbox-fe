import styles from "./styles.module.scss";
import { TranslationDto } from "../../apis/wordbook/types";
import { capitalize, groupBy } from "../../utils/utils";
import { partOfSpeechColors } from "../../pages/wordbook/colors";
import { useState } from "react";
import { useToast } from "../toast/ToastProvider";

export type TranslationCardProps = {
  translation: TranslationDto;
  onRemove: (id: string) => void;
};

function TranslationCard({ translation, onRemove }: TranslationCardProps) {
  const [showTranslations, setShowTranslations] = useState(false);
  const showToast = useToast();

  const groupedTranslations = groupBy(
    translation.translationResults,
    (x) => x.partOfSpeech
  );

  function handleCopyTranslation(e: React.MouseEvent) {
    const text = e.currentTarget.textContent;
    if (text && showTranslations) {
      navigator.clipboard.writeText(`${translation.word} -> ${text}`);
      showToast({
        message: "Translation copied to clipboard!",
        type: "info",
        timeout: 1500,
      });
    }
  }

  return (
    <div className={styles.card}>
      <section className={styles.card__content}>
        <div className={styles.wordTitle}>{capitalize(translation.word)}</div>
        <div className={styles.translationsList}>
          {Object.entries(groupedTranslations).map(
            ([partOfSpeech, translations]) => (
              <div
                className={styles.translationsList__item}
                style={{ filter: showTranslations ? "none" : "blur(5px)" }}
                key={partOfSpeech}
              >
                <span
                  className={styles.partOfSpeech}
                  style={{
                    backgroundColor:
                      partOfSpeechColors[capitalize(partOfSpeech)],
                  }}
                >
                  {capitalize(partOfSpeech)}
                </span>
                <div className={styles.translations}>
                  {translations.map((x) => (
                    <span
                      key={x.id}
                      className={styles.translations__word}
                      onClick={handleCopyTranslation}
                    >
                      {x.translation}
                      {x.transcription && ` [${x.transcription}]`}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>
      <section className={styles.card__footer}>
        <div className={styles.blurSetting}>
          <i
            className={`fa-solid ${
              showTranslations ? "fa-eye" : "fa-eye-slash"
            }`}
            onClick={() => setShowTranslations((x) => !x)}
          ></i>
        </div>
        <div className={styles.lastSeenAt}>
          <i className="fa-regular fa-eye"></i>
          <span className={styles.tooltip}>{translation.lastViewed}</span>
        </div>
        <div className={styles.createdAt}>
          <i className="fa-solid fa-calendar-plus"></i>
          <span className={styles.tooltip}>
            {new Date(translation.createdAt).toLocaleDateString("en-us")}
          </span>
        </div>
        <div
          className={styles.deleteTranslation}
          onClick={() => onRemove(translation.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      </section>
    </div>
  );
}

export default TranslationCard;
