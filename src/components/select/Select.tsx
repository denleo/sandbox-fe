import { useState } from "react";
import styles from "./styles.module.scss";

export type SelectItem = {
  name: string;
  value: string | number;
};

export type SelectProps = {
  placeholder?: string;
  name?: string;
  options: SelectItem[];
  selectedValue?: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Select({
  name,
  placeholder,
  options,
  selectedValue,
  onChange,
}: SelectProps) {
  const [selected, setSelected] = useState(selectedValue);

  function hangleChangeItem(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(e.target.value);
    onChange(e);
  }

  return (
    <div className={styles.selectContainer}>
      <select onChange={hangleChangeItem} value={selected} name={name}>
        {placeholder && <option disabled>{placeholder}</option>}
        {options.map((x) => (
          <option key={x.value} value={x.value}>
            {x.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
