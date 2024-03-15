import styles from "./styles.module.scss";
import { langColors } from "../../colors";
import {
  Lang,
  TranslationDirection,
} from "../../../../redux/translationSetup/types";

export type TranslationLangOptionsProps = {
  translationDirection: TranslationDirection;
  onChange: (direction: TranslationDirection) => void;
};

const possibleTranslationDirections = {
  [Lang.Russian]: [Lang.English, Lang.Ukraine, Lang.Poland],
  [Lang.English]: [Lang.Russian, Lang.Ukraine],
  [Lang.Ukraine]: [Lang.Russian, Lang.English],
  [Lang.Poland]: [Lang.Russian],
};

function TranslationLangOptions({
  translationDirection,
  onChange,
}: TranslationLangOptionsProps) {
  return (
    <div className={styles.container}>
      <section className={styles.translationLang}>
        <div className={styles.translationLang__column}>
          {Object.keys(possibleTranslationDirections).map((value) => (
            <h3
              onClick={() =>
                onChange({
                  sourceLang: +value,
                  targetLang: possibleTranslationDirections[+value][0],
                })
              }
              className={
                styles.langOption +
                (+value === translationDirection.sourceLang
                  ? ` ${styles.active}`
                  : "")
              }
              style={{
                backgroundColor: langColors[value],
              }}
              key={"source_" + value}
            >
              {Lang[+value]}
            </h3>
          ))}
        </div>
        <div className={styles.translationLang__separator}>
          <i className="fa-solid fa-hand-point-right fa-xl"></i>
        </div>
        <div className={styles.translationLang__column}>
          {possibleTranslationDirections[translationDirection.sourceLang].map(
            (targetLang) => (
              <h3
                onClick={() =>
                  onChange({
                    sourceLang: translationDirection.sourceLang,
                    targetLang: targetLang,
                  })
                }
                className={
                  styles.langOption +
                  (targetLang === translationDirection.targetLang
                    ? ` ${styles.active}`
                    : "")
                }
                style={{
                  backgroundColor: langColors[targetLang],
                }}
                key={"target_" + targetLang}
              >
                {Lang[targetLang]}
              </h3>
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default TranslationLangOptions;
