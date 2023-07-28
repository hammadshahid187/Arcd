import React from "react";
import GoogleAd from "./GoogleAd";
import News from "./News";
import NewsLoading from "./NewsLoading";

const NewsGrid = ({
    data,
    history,
    loaded = false,
    loadAds = false,
    isLoading,
}) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {(loaded ? data : [...Array(9)]).map((news, key) => {
                    return loaded ? (
                        <>
                            {/* {
                    ((key+1) % 3 === 0 && loadAds===true) ?
                     <GoogleAd /> 
                     : <> </>
                  } */}
                            <News
                                published_utc={news.data.added_utc}
                                publisher_name={news.data.source}
                                title={news.data.article_heading}
                                author={news.data.source}
                                tickers={news.data.tickers}
                                description={news.data.description}
                                image_url={news.data.image_url}
                                article_url={news.data.article_url}
                                key={`${news.id}`}
                                id={news.id}
                                history={history}
                                likesRandom={Math.floor(
                                    Math.random() * 400 + 50
                                )}
                                isLoading={isLoading}
                            />
                        </>
                    ) : (
                        <NewsLoading keys={news} />
                    );
                })}
            </div>
        </div>
    );
};

export default NewsGrid;
