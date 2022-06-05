import { useState, useEffect, useRef } from "react";

export const useElementOnScreen = (options, amount, currentFilter) => {
  const containerRef = useRef(null);
  const [nextPost, setNextPost] = useState(1);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let observerRefValue = null;

    const addDatas = (entries) => {
      const [entry] = entries;
      if (filter !== currentFilter) {
        setNextPost(1);
        setFilter(currentFilter);
        observer.unobserve(containerRef.current);
        return;
      }
      if (nextPost >= amount) {
        observer.unobserve(containerRef.current);
        return;
      }
      if (entry.isIntersecting) {
        setNextPost(nextPost + 1);
        observer.unobserve(containerRef.current);
        observerRefValue = containerRef.current;
      }
    };
    const observer = new IntersectionObserver(addDatas, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [
    containerRef,
    options,
    setNextPost,
    nextPost,
    amount,
    currentFilter,
    filter,
  ]);
  return [containerRef, nextPost];
};
