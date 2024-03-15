import { useState } from "react";
import { Order } from "../../apis/commonTypes";

export type OrderTogglerProps = {
  size: "sm" | "lg" | "xl" | "2xl";
  state: Order;
  onOrderChanged: (order: Order) => void;
};

function OrderToggler({ size, state, onOrderChanged }: OrderTogglerProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        cursor: "pointer",
        color: "var(--active)",
        opacity: isHovered ? 0.6 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {state === Order.Descending ? (
        <i
          className={`fa-solid fa-arrow-down-wide-short fa-${size}`}
          onClick={() => onOrderChanged(Order.Ascending)}
        ></i>
      ) : (
        <i
          className={`fa-solid fa-arrow-down-short-wide fa-${size}`}
          onClick={() => onOrderChanged(Order.Descending)}
        ></i>
      )}
    </div>
  );
}

export default OrderToggler;
