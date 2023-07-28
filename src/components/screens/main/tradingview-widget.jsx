import { useEffect } from "react";

const TradingViewWidget = () => {
  useEffect(() => {
    const scriptTag = document.createElement("script");

    scriptTag.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    scriptTag.async = true;
    scriptTag.innerHTML = `{
      "colorTheme": "light",
      "isTransparent": false,
      "width": "100%",
      "height": "600",
      "locale": "en",
      "importanceFilter": "-1,0,1",
      "currencyFilter": "USD"
    }`;

    document.getElementById("market-view").appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (<div id="market-view" ></div>
  );
};

export default TradingViewWidget;
