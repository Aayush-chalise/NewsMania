import { useReducer, useEffect } from "react";
import NewsListContext from "./NewsListContext";

// the purpose of reducer function is to return modified version of current state if modified, if not modified it will just return the state without any change
const reducerFunction = (currNewsList, action) => {
  let newNewsList = currNewsList;

  if (action.type === "ADD_NEWS") {
    newNewsList = action.payload.articles;
  }
  return newNewsList;
};

const NewsListProvider = ({ children }) => {
  var url =
    "https://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=441763943c384204b504623b5ac36bdc";

  var req = new Request(url);

  const [NewsList, dispatchNewsList] = useReducer(reducerFunction, []);

  const addNewsList = (News) => {
    dispatchNewsList({
      type: "ADD_NEWS",
      payload: News,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(req, { signal })
      .then((res) => res.json())
      .then((obj) => {
        addNewsList(obj);
      });

    return () => {
      // controller.abort();
    };
  }, []);

  return (
    <NewsListContext.Provider // context ma value fill garxa
      value={{
        NewsList,
        addNewsList,
      }}
    >
      {children}
    </NewsListContext.Provider>
  );
};

export default NewsListProvider;
