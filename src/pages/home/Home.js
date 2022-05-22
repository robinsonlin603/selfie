import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles and images
import styles from "./Home.module.css";

// components
import ShowPosts from "../../components/ShowPosts";
import PostFilter from "./PostFilter";

export default function Home() {
  const { documents, error } = useCollection("posts", "createdAt");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const posts = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "Selfie":
            return document.category === currentFilter;
          case "Trip":
            return document.category === currentFilter;
          case "Foodie":
            return document.category === currentFilter;
          case "Life":
            return document.category === currentFilter;
          case "Else":
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className={styles.main}>
      {!documents.length < 1 && (
        <PostFilter currentFilter={currentFilter} changeFilter={changeFilter} />
      )}
      {!documents.length < 1 && posts && (
        <section>
          {posts.map((post) => (
            <ShowPosts post={post} user={user} key={post.id} />
          ))}
        </section>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
