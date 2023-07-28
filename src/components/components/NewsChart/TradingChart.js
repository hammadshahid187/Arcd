import { createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";

const initialData = [
    { time: "2018-12-22", value: 25.51 },
    { time: "2018-12-23", value: 22.11 },
    { time: "2018-12-24", value: 35.02 },
    { time: "2018-12-25", value: 36.32 },
    { time: "2018-12-26", value: 30.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 33.46 },
    { time: "2018-12-29", value: 37.92 },
    { time: "2018-12-30", value: 39.68 },
    { time: "2018-12-31", value: 45.67 },
];

const TradingChart = (props) => {
    const {
        data = initialData,
        colors: {
            backgroundColor = "white",
            lineColor = "#04CA00",
            textColor = "rgb(0 0 0/ .8)",
            areaTopColor = "rgba(4, 202, 0, 0.3)",
            areaBottomColor = "rgba(4, 202, 0, 0.03)",
        } = {},
    } = props;

    const chartContainerRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
                autoSize: true,
                height: props.height || 0,
            });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: {
                    type: ColorType.Solid,
                    color: backgroundColor,
                },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: props.height || 0,
            handleScale: {
                mouseWheel: false,
            },
            grid: {
                horzLines: {
                    visible: false,
                },
                vertLines: {
                    visible: false,
                },
            },

            timeScale: {
                visible: false,
            },

            rightPriceScale: {
                visible: false,
            },

            crosshair: {
                horzLine: {
                    visible: false,
                },
                vertLine: {
                    visible: false,
                },
            },

            handleScroll: {
                horzTouchDrag: false,
                pressedMouseMove: false,
                mouseWheel: false,
            },
        });
        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({
            lineColor,
            topColor: areaTopColor,
            bottomColor: areaBottomColor,
            crosshairMarkerVisible: false,
            priceLineVisible: false,
        });
        newSeries.setData(data);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

            chart.remove();
        };
    }, [
        data,
        backgroundColor,
        lineColor,
        textColor,
        areaTopColor,
        areaBottomColor,
        props.height,
    ]);

    return <div ref={chartContainerRef} style={{ width: "100%" }} />;
};

export default TradingChart;
