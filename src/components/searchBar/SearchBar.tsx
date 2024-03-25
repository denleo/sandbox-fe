import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { debounce } from "../../utils/utils";

interface ISearchBar {
  onSearch: (value: string) => void;
  placeholder?: string;
  width: string;
  initialValue?: string;
  options?: string[];
  debounceInterval?: number;
}

function SearchBar({
  onSearch,
  initialValue = "",
  placeholder,
  width,
  options,
  debounceInterval = 500,
}: ISearchBar) {
  const [input, setInput] = useState(initialValue);
  const debouncedSearch = useMemo(
    () => debounce(onSearch, debounceInterval),
    [onSearch, debounceInterval]
  );

  useEffect(() => {
    debouncedSearch(input);
  }, [debouncedSearch, input]);

  return (
    <search className={styles.wrap} style={{ maxWidth: width }}>
      <div className={styles.search}>
        <input
          list="search-options"
          value={input}
          className={styles.searchTerm}
          type="text"
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(input);
          }}
        />
        {options && (
          <datalist id="search-options">
            {options.map((x) => (
              <option key={x} value={x} />
            ))}
          </datalist>
        )}
        <button
          type="button"
          className={styles.searchButton}
          onClick={() => onSearch(input)}
        >
          <i className="fa fa-search fa-sm"></i>
        </button>
      </div>
    </search>
  );
}

export default SearchBar;
