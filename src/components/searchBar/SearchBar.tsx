import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { debounce } from "../../utils/utils";

interface ISearchBar {
  onSearch: (value: string) => void;
  placeholder?: string;
  width: string;
  initialValue?: string;
}

function SearchBar({
  onSearch,
  initialValue = "",
  placeholder,
  width,
}: ISearchBar) {
  const [input, setInput] = useState(initialValue);
  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  useEffect(() => {
    debouncedSearch(input);
  }, [debouncedSearch, input]);

  return (
    <div className={styles.wrap} style={{ maxWidth: width }}>
      <div className={styles.search}>
        <input
          value={input}
          className={styles.searchTerm}
          type="text"
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(input);
          }}
        />
        <button
          type="submit"
          className={styles.searchButton}
          onClick={() => onSearch(input)}
        >
          <i className="fa fa-search fa-sm"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
