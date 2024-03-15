import { debounce } from "../../utils/utils";
import styles from "./styles.module.scss";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

function Paginator({ currentPage, totalPages, onPageChange }: PaginatorProps) {
  const handleScrollDebounced = debounce(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY >= 0) {
        currentPage < totalPages && onPageChange(currentPage + 1);
      } else {
        currentPage >= 2 && onPageChange(currentPage - 1);
      }
    },
    100
  );

  let pages: React.ReactNode;

  if (totalPages <= 5) {
    pages = (
      <>
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i}
            className={
              currentPage === i + 1
                ? `${styles.pagination__item} ${styles.active}`
                : styles.pagination__item
            }
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </span>
        ))}
      </>
    );
  } else if (currentPage < 4) {
    pages = (
      <>
        {Array.from([1, 2, 3], (x) => (
          <span
            key={x}
            className={
              currentPage === x
                ? `${styles.pagination__item} ${styles.active}`
                : styles.pagination__item
            }
            onClick={() => onPageChange(x)}
          >
            {x}
          </span>
        ))}
        <span className={styles.pagination__dotted}>...</span>
        <span
          className={styles.pagination__item}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </span>
      </>
    );
  } else if (currentPage > totalPages - 3) {
    pages = (
      <>
        <span
          className={styles.pagination__item}
          onClick={() => onPageChange(1)}
        >
          1
        </span>
        <span className={styles.pagination__dotted}>...</span>
        {Array.from([totalPages - 2, totalPages - 1, totalPages], (x) => (
          <span
            key={x}
            className={
              currentPage === x
                ? `${styles.pagination__item} ${styles.active}`
                : styles.pagination__item
            }
            onClick={() => onPageChange(x)}
          >
            {x}
          </span>
        ))}
      </>
    );
  } else {
    pages = (
      <>
        <span
          className={styles.pagination__item}
          onClick={() => onPageChange(1)}
        >
          1
        </span>
        <span className={styles.pagination__dotted}>...</span>
        <span
          className={`${styles.pagination__item} ${styles.active}`}
          onClick={() => onPageChange(currentPage)}
        >
          {currentPage}
        </span>
        <span className={styles.pagination__dotted}>...</span>
        <span
          className={styles.pagination__item}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </span>
      </>
    );
  }

  return (
    <div className={styles.pagination} onWheel={handleScrollDebounced}>
      <button
        disabled={currentPage === 1}
        onClick={() =>
          currentPage - 1 <= totalPages && onPageChange(currentPage - 1)
        }
        className={styles.arrowButton}
      >
        <i className="fa-solid fa-angle-left fa-lg"></i>
      </button>
      {pages}
      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          currentPage + 1 <= totalPages && onPageChange(currentPage + 1)
        }
        className={styles.arrowButton}
      >
        <i className="fa-solid fa-angle-right fa-lg"></i>
      </button>
    </div>
  );
}

export default Paginator;
