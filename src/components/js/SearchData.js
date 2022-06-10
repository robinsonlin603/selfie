import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// styles and images
import styles from "../css/SearchData.module.css";
import Search from "../../assets/search.png";
import Close from "../../assets/close.png";

// components
import Avatar from "./Avatar";

export default function SearchData() {
  const { documents } = useCollection("users");
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const navigate = useNavigate();

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = documents.filter((d) => {
      return d.displayName.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleClick = (id) => {
    clearInput();
    navigate(`/profile/${id}`);
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className={styles.searchbar}>
      <div className={styles.searchInput}>
        {filteredData.length === 0 ? (
          <img src={Search} alt="search icon "></img>
        ) : (
          <img
            src={Close}
            alt="close icon "
            onClick={() => {
              clearInput();
            }}
          ></img>
        )}
        <input
          type="text"
          onChange={handleFilter}
          value={wordEntered}
          required
          placeholder="Search"
        />
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.dataResult}>
          <div className={styles.triangle}></div>
          <div className={styles.square}>
            {filteredData.slice(0, 15).map((data) => {
              return (
                <div
                  className={styles.rightId}
                  onClick={() => {
                    handleClick(data.id);
                  }}
                  key={data.id}
                >
                  <div className={styles.photo}>
                    <Avatar src={data.photoURL} />
                  </div>
                  <p>{data.displayName} </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
