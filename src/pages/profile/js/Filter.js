// styles
import styles from "../css/Filter.module.css";

const filterList = ["all", "Selfie", "Trip", "Foodie", "Life", "Hello", "Else"];

export default function Filter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className={styles["posts-filter"]}>
      <nav>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            style={
              currentFilter === f
                ? { borderTop: "1px solid black", color: "black" }
                : { borderTop: "" }
            }
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
