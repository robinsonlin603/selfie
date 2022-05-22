import { useEffect, useState } from "react";

// styles
import styles from "./PreviewPhoto.module.css";

export default function PreviewPhoto({ previews }) {
  const [srcs, setSrcs] = useState([]);

  useEffect(() => {
    let array_src = [];
    setSrcs([]);
    for (let i = 0; i < previews.length; i++) {
      let img_src = URL.createObjectURL(previews[i]);
      array_src.push(img_src);
    }
    setSrcs(array_src);
  }, [previews]);

  return (
    <div className={styles.previewPhoto}>
      {srcs.map((src) => (
        <div className={styles.photo} key={src}>
          <img src={src} alt={src} key={src}></img>
        </div>
      ))}
    </div>
  );
}
