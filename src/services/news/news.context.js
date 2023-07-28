import { createContext, useContext } from "react";
import useNewsFetch from "./news.hook";

export const NewsContext = createContext({
  topNews: null,
  news: null,
  myStockNews: null,
  isNewsLoading: false,
  hasMoreNews: false,
  carousel: null,
  selectMoreNews: () => {},
});

const NewsContextProvider = ({ children }) => {
  const {
    news,
    isNewsLoading,
    myStockNews,
    topNews,
    selectTenMoreMyStockNews,
    hasMoreNews,
    carousel,
  } = useNewsFetch();
  return (
    <NewsContext.Provider
      value={{
        topNews: topNews,
        news: news,
        isNewsLoading: isNewsLoading,
        myStockNews: myStockNews,
        selectMoreNews: selectTenMoreMyStockNews,
        hasMoreNews: hasMoreNews,
        carousel: carousel,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
export default NewsContextProvider;
