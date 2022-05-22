import { createContext, useReducer } from "react";

export const PostContext = createContext();

export const postReducer = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return { ...state, data: action.payload };
    case "CLOSE":
      return { ...state, data: null };
    default:
      return { ...state };
  }
};

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, {
    data: null,
  });

  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
