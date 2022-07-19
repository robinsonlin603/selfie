import { useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useElementOnScreen } from "../../../hooks/useElementOnScreen";

// styles and images
import styles from "../css/Home.module.css";

// components
import ShowPosts from "./ShowPosts";
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
          case "Hello":
            return document.category === currentFilter;
          case "Else":
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;
  const [containerRef, nextPost] = useElementOnScreen(
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    },
    posts ? posts.length : null,
    currentFilter
  );

  return (
    <div className={styles.main}>
      {!documents.length < 1 && (
        <div className={styles.filter}>
          <PostFilter
            currentFilter={currentFilter}
            changeFilter={changeFilter}
          />
        </div>
      )}
      {!documents.length < 1 && posts && (
        <section>
          {posts.slice(0, nextPost).map((post) => (
            <ShowPosts post={post} user={user} key={post.id} posts={posts} />
          ))}
          <div ref={containerRef}></div>
        </section>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
