import styles from "./styles.module.scss";
import {
  GetTranslationsQuery,
  TranslationOrdering,
} from "../../../apis/wordbook/types";
import TranslationCard from "../../../components/translationCard/TranslationCard";
import SearchBar from "../../../components/searchBar/SearchBar";
import Paginator from "../../../components/paginator/Paginator";
import { useState } from "react";
import {
  useDeleteTranslationMutation,
  useGetTranslationsQuery,
} from "../../../apis/wordbook/wordbookService";
import { Order } from "../../../apis/commonTypes";
import Spinner from "../../../components/spinner/Spinner";
import Select, { SelectItem } from "../../../components/select/Select";
import { partOfSpeechColors } from "../colors";
import OrderToggler from "../../../components/orderToggler/OrderToggler";
import Modal from "../../../components/modal/Modal";
import TranslationLangOptions from "../explore/filters/TranslationLangOptions";
import { Lang } from "../../../redux/translationSetup/types";
import { useToast } from "../../../components/toast/ToastProvider";

function getDefaultQueryState(): GetTranslationsQuery {
  return {
    page: 1,
    pageSize: 5,
    orderBy: TranslationOrdering.CreatedAt,
    order: Order.Descending,
    sourceLang: Lang.English,
    targetLang: Lang.Russian,
    word: undefined,
    partOfSpeech: undefined,
  };
}

const orderings = [
  {
    name: "Word",
    value: TranslationOrdering.Word,
  },
  {
    name: "Creation date",
    value: TranslationOrdering.CreatedAt,
  },
  {
    name: "Last viewed",
    value: TranslationOrdering.LastViewedAt,
  },
] as SelectItem[];

function WordsLearnPage() {
  const [showModal, setShowModal] = useState(false);
  const showToast = useToast();
  const [queryState, setQueryState] =
    useState<GetTranslationsQuery>(getDefaultQueryState);

  const { data, isFetching } = useGetTranslationsQuery(queryState);
  const [deleteTranslation] = useDeleteTranslationMutation();

  function handleSearch(text: string) {
    setQueryState((state) => {
      if (state.word !== text) {
        return {
          ...state,
          page: 1,
          word: text,
        };
      } else {
        return state;
      }
    });
  }

  function handleSelectItemChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setQueryState((state) => ({
      ...state,
      page: 1,
      [event.target.name]: event.target.value,
    }));
  }

  function handlePartOfSpeechChange(item: string) {
    const findValue = queryState.partOfSpeech?.find((x) => x === item);

    if (findValue === undefined) {
      setQueryState((state) => ({
        ...state,
        page: 1,
        partOfSpeech: [...(state.partOfSpeech || []), item],
      }));
    } else {
      setQueryState((state) => ({
        ...state,
        page: 1,
        partOfSpeech:
          state.partOfSpeech!.length > 1
            ? state.partOfSpeech!.filter((x) => x !== item)
            : undefined,
      }));
    }
  }

  function handleTranslationDelete(translationId: string) {
    deleteTranslation({
      translationId: translationId,
    })
      .unwrap()
      .catch(() =>
        showToast({
          message: "Failed to delete translation",
          type: "error",
          timeout: 3000,
        })
      );
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <section className={styles.controls}>
          <div className={styles.controls__search}>
            <SearchBar onSearch={handleSearch} width={"250px"} />
            <div className={styles.delimeter}></div>
            <Select
              name="orderBy"
              placeholder="Order by:"
              options={orderings}
              selectedValue={queryState.orderBy}
              onChange={handleSelectItemChange}
            />
            <OrderToggler
              size={"xl"}
              state={queryState.order!}
              onOrderChanged={(order) =>
                setQueryState((state) => ({ ...state, order: order }))
              }
            />
            <div className={styles.delimeter}></div>
            <div
              className={styles.controls__search__lang}
              onClick={() => setShowModal(true)}
            >
              <i className="fa-solid fa-language fa-2xl"></i>
            </div>
          </div>
          <div className={styles.controls__partOfSpeech}>
            {Object.keys(partOfSpeechColors).map((item) => (
              <span
                key={item}
                className={
                  queryState.partOfSpeech &&
                  queryState.partOfSpeech.indexOf(item) !== -1
                    ? `${styles.controls__partOfSpeech__item}  ${styles.active}`
                    : styles.controls__partOfSpeech__item
                }
                style={{ backgroundColor: partOfSpeechColors[item] }}
                onClick={() => handlePartOfSpeechChange(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </section>
        <section className={styles.content}>
          {isFetching ? ( //TODO: EMPTY RESULTS CHECKING
            <Spinner />
          ) : (
            <div className={styles.wordbookList}>
              {data?.items.map((x) => (
                <TranslationCard
                  translation={x}
                  key={x.id}
                  onRemove={handleTranslationDelete}
                />
              ))}
            </div>
          )}
        </section>
        <section className={styles.footer}>
          {!isFetching && ( //TODO: EMPTY RESULTS CHECKING
            <Paginator
              currentPage={queryState.page!}
              totalPages={Math.ceil(data!.totalCount / data!.pageSize)}
              onPageChange={(pageNum) =>
                setQueryState((state) => ({ ...state, page: pageNum }))
              }
            />
          )}
        </section>
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title="Language directions"
          maxWidth="312px"
        >
          <TranslationLangOptions
            translationDirection={{
              sourceLang: queryState.sourceLang!,
              targetLang: queryState.targetLang!,
            }}
            onChange={(direction) => {
              if (
                queryState.sourceLang !== direction.sourceLang ||
                queryState.targetLang !== direction.targetLang
              ) {
                setQueryState((state) => ({
                  ...state,
                  sourceLang: direction.sourceLang,
                  targetLang: direction.targetLang,
                }));
              }
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default WordsLearnPage;
