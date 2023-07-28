export default function NewsDetailsCard({
    heading = "",
    headingIconPath = "",
    showControls = false,
    nextBtnHandler,
    prevBtnHandler,
    children,
    totalSliderItems,
    currentPosition,
    containerClass = "",
    containerRef = null,
}) {
    const activeStylePrev = currentPosition === 0 ? "opacity-50" : "";
    const activeStyleNext =
        currentPosition === totalSliderItems - 1 ? "opacity-50" : "";

    return (
        <div
            className={`flex flex-col items-center transition-all h-auto bg-white box-shadow rounded-md w-full ${containerClass}`}
            ref={containerRef}
        >
            <div className="flex py-5 px-4 justify-between w-full items-center pb-4 border-b">
                <div className="flex gap-2">
                    {headingIconPath ? (
                        <img src={headingIconPath} alt="text-icon" />
                    ) : null}

                    <span className="font-medium">{heading}</span>
                </div>

                {showControls ? (
                    <div className="flex items-center gap-1">
                        <button
                            className={`flex items-center justify-center p-2 rounded-full bg-arca-blue ${activeStylePrev} disabled:cursor-not-allowed`}
                            onClick={prevBtnHandler}
                            disabled={currentPosition === 0}
                        >
                            <img
                                src="/left-arrow.svg"
                                alt="left-arrow"
                                className="h-2 w-2"
                            />
                        </button>

                        <button
                            className={`flex items-center justify-center p-2 rounded-full bg-arca-blue ${activeStyleNext} disabled:cursor-not-allowed`}
                            onClick={nextBtnHandler}
                            disabled={currentPosition === totalSliderItems - 1}
                        >
                            <img
                                src="/right-arrow.svg"
                                alt="right-arrow"
                                className="h-2 w-2"
                            />
                        </button>
                    </div>
                ) : null}
            </div>
            <div className="self-start flex px-4 pb-3 flex-col mt-4 text-sm md:text-sm lg:text-md w-full">
                {children}
            </div>
            {/* currentPosition */}
            {showControls ? (
                <div className="flex gap-1 items-center mt-6">
                    {Array.from(new Array(totalSliderItems)).map(
                        (item, index) => (
                            <div
                                className={`h-1 w-1 rounded-full ${
                                    index === currentPosition
                                        ? "bg-arca-blue"
                                        : "bg-gray-300"
                                }`}
                                key={index}
                            ></div>
                        )
                    )}
                </div>
            ) : null}
        </div>
    );
}
