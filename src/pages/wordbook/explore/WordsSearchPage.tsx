import styles from "./styles.module.scss";
import SearchBar from "../../../components/searchBar/SearchBar.tsx";
import WordCard from "../../../components/wordCard/WordCard.tsx";
import Modal from "../../../components/modal/Modal.tsx";
import TranslationLangOptions from "./filters/TranslationLangOptions.tsx";
import Spinner from "../../../components/spinner/Spinner.tsx";
import notFoundImg from "../../../assets/images/not-found-person.jpg";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../../hooks/reduxHooks.ts";
import { useLazyGetTranslationsQuery } from "../../../apis/dict/yandexDictApi.ts";
import { useState } from "react";
import { ITranslationResult } from "../../../apis/dict/types.ts";
import { useCreateTranslationMutation } from "../../../apis/wordbook/wordbookService.ts";
import { CreateTranslation } from "../../../apis/wordbook/types.ts";
import { useToast } from "../../../components/toast/ToastProvider.tsx";
import { ErrorPayload } from "../../../apis/commonTypes.ts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setTranslationDirection } from "../../../redux/translationSetup/translationSetupSlice.ts";

export default function WordsSearchPage() {
  const showToast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getTranslations, result] = useLazyGetTranslationsQuery();
  const [createTranslation] = useCreateTranslationMutation();
  const dispatch = useTypedDispatch();
  const translationDirection = useTypedSelector(
    (store) => store.translationSetup.direction
  );

  function onSearchHandler(word: string) {
    word &&
      getTranslations({ word: word, direction: translationDirection }, true);
  }

  async function addTranslationHandler(
    translation: ITranslationResult,
    translationChoice: string
  ) {
    try {
      const payload = {
        word: translation.word,
        sourceLang: translationDirection.sourceLang,
        targetLang: translationDirection.targetLang,
        translation: translationChoice,
        partOfSpeech: translation.partOfSpeech,
        transcription: translation.transcription,
      } as CreateTranslation;

      await createTranslation(payload).unwrap();

      showToast({
        message: "Translation successfully added",
        type: "info",
        timeout: 3000,
      });
    } catch (e) {
      const queryError = e as FetchBaseQueryError;
      let messageText = "";

      if (queryError.status === "FETCH_ERROR") {
        messageText = "Error occured while adding translation";
      } else if (queryError.data) {
        const apiError = queryError.data as ErrorPayload;
        messageText = apiError.description;
      }

      showToast({
        message: messageText,
        type: "error",
        timeout: 3000,
      });
    }
  }

  let resultNode: React.ReactNode;

  if (result.data === undefined) {
    resultNode = <></>;
  } else if (result.isFetching) {
    resultNode = (
      <div className={styles.spinnerContainer}>
        <Spinner></Spinner>
      </div>
    );
  } else if (result.data.length === 0) {
    resultNode = (
      <div className={styles.notFoundContainer}>
        <img src={notFoundImg} className={styles.notFoundImage}></img>
        <h1 className={styles.notFoundTitle}>
          Sorry, we can't find any translations...
        </h1>
      </div>
    );
  } else {
    resultNode = (
      <section className={styles.cardsSection}>
        {result.data.map((translation, i) => (
          <WordCard
            translation={translation}
            addTranslationHandler={addTranslationHandler}
            key={i}
          />
        ))}
      </section>
    );
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <h2 className={styles.searchTitle}>Explore words</h2>
        <section className={styles.searchSection}>
          <SearchBar onSearch={onSearchHandler} width={"312px"} />
          <i
            className="fa-solid fa-gear fa-xl"
            onClick={() => setIsModalOpen(true)}
          ></i>
        </section>
        {resultNode}
        <section className={styles.yandexFooter}>
          <h5>
            <a href="https://tech.yandex.ru/dictionary/">
              «Реализовано c помощью сервиса{" "}
              <span style={{ color: "red" }}>Яндекс.Словарь</span>»
            </a>
          </h5>
        </section>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          title="Translation settings"
          maxWidth="312px"
        >
          <TranslationLangOptions
            translationDirection={translationDirection}
            onChange={(state) => dispatch(setTranslationDirection(state))}
          />
        </Modal>
      )}
    </>
  );
}
