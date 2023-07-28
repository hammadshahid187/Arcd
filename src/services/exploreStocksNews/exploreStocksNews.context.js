import { createContext, useContext } from "react";
import useExploreStocksNewsFetch from "./exploreStocksNews.hook.js";

export const ExploreStockNewsContext = createContext({
  topNewsE: null,
  newsE: null,
  myStockNewsE: null,
  isNewsELoading: false,
  hasMoreNewsE: false,
  carouselE: null,
  fetchTickerPercentage: () => {},
  selectMoreNewsE: () => {},
});

const ExploreStockNewsContextProvider = ({ children }) => {
  const {
    newsE,
    isNewsELoading,
    myStockNewsE,
    topNewsE,
    selectTenMoreMyStockNewsE,
    hasMoreNewsE,
    carouselE,
    fetchTickerPercentage
  } = useExploreStocksNewsFetch();

  return (
    <ExploreStockNewsContext.Provider
      value={{
        topNewsE: topNewsE,
        newsE: newsE,
        isNewsELoading: isNewsELoading,
        myStockNewsE: myStockNewsE,
        selectMoreNewsE: selectTenMoreMyStockNewsE,
        hasMoreNewsE: hasMoreNewsE,
        carouselE: carouselE,
        fetchTickerPercentage: fetchTickerPercentage
      }}
    >
      {children}
    </ExploreStockNewsContext.Provider>
  );
};

export default ExploreStockNewsContextProvider;
