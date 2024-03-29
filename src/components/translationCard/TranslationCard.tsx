import styles from "./styles.module.scss";
import { TranslationDto } from "../../apis/wordbook/types";
import { capitalize, groupBy } from "../../utils/utils";
import { partOfSpeechColors } from "../../pages/wordbook/colors";
import { useState } from "react";
import { useToast } from "../toast/ToastProvider";
import { useViewTranslationMutation } from "../../apis/wordbook/wordbookService";

export type TranslationCardProps = {
  translation: TranslationDto;
  onRemove: (id: string) => void;
};

function TranslationCard({ translation, onRemove }: TranslationCardProps) {
  const [model, setModel] = useState(translation);
  const [showTranslations, setShowTranslations] = useState(false);
  const [viewTranslation] = useViewTranslationMutation();
  const showToast = useToast();

  function handleTranslationView() {
    viewTranslation({
      translationId: model.id,
    })
      .unwrap()
      .then((res) =>
        setModel((state) => ({ ...state, lastViewed: res.lastViewed }))
      )
      .catch(() =>
        showToast({
          message: `Failed to save ${model.word} view time`,
          type: "error",
          timeout: 1500,
        })
      );
  }

  const groupedTranslations = groupBy(
    model.translationResults,
    (x) => x.partOfSpeech
  );

  function handleCopyTranslation(e: React.MouseEvent) {
    const text = e.currentTarget.textContent;
    if (text && showTranslations) {
      navigator.clipboard.writeText(`${model.word} - ${text}`);
      showToast({
        message: "Translation copied to clipboard!",
        type: "info",
        timeout: 1500,
      });
    }
  }

  return (
    <article className={styles.card}>
      <section className={styles.card__content}>
        <h1 className={styles.wordTitle}>{capitalize(model.word)}</h1>
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
      <footer className={styles.card__footer}>
        <div className={styles.blurSetting}>
          <i
            className={`fa-solid ${
              showTranslations ? "fa-eye" : "fa-eye-slash"
            }`}
            onClick={() => {
              setShowTranslations((x) => !x);
              handleTranslationView();
            }}
          ></i>
        </div>
        <div className={styles.lastSeenAt}>
          <i className="fa-regular fa-eye"></i>
          <span className={styles.tooltip}>{model.lastViewed}</span>
        </div>
        <div className={styles.createdAt}>
          <i className="fa-solid fa-calendar-plus"></i>
          <span className={styles.tooltip}>
            {new Date(translation.createdAt).toLocaleDateString("en-us")}
          </span>
        </div>
        <div
          className={styles.deleteTranslation}
          onClick={() => onRemove(model.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      </footer>
    </article>
  );
}

export default TranslationCard;
