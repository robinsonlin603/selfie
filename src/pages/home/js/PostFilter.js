// styles
import styles from "../css/PostFilter.module.css";

const filterList = ["all", "Selfie", "Trip", "Foodie", "Life", "Else"];

export default function PostFilter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className={styles["posts-filter"]}>
      <nav>
        <p>Filter by</p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            data-content={f}
            className={currentFilter === f ? styles.clickbutton : styles.button}
          ></button>
        ))}
      </nav>
    </div>
  );
}
