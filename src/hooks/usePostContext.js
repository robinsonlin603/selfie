import { PostContext } from "../context/PostContext";
import { useContext } from "react";

export const usePostContext = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw Error("useAuthContext must be inside an AuthContext");
  }

  return context;
};
