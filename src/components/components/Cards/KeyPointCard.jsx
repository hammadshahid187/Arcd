const KeyPointCard = () => {
    return (
        <div className="flex flex-col gap-3 items-center p-3 rounded-lg shadow-enterprise-card font-Manrope text-black">
            <div className="flex justify-between items-center w-full">
                <h1 className="uppercase">Keypoints</h1>
                <span>
                    <img src="/key.svg" alt="key-icon" />
                </span>
            </div>
            <p className="text-xs">
                Amazon stock is already down more than 50%, but the bottom might
                ...
            </p>
        </div>
    );
};

export default KeyPointCard;
