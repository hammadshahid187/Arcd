const EnterpriseCard = ({
    children,
    title,
    maxHeight = "100vh",
    month = "",
}) => {
    return (
        <div
            className={`relative hide-scrollbar flex flex-col bg-white rounded-lg shadow-enterprise-card px-5 pb-5 `}
            
        >
            <div className="flex justify-between mb-5 top-0 left-0 bg-white z-10 pt-5 pb-2 scale-x-[1.02]">
                {!!month ? (
                    <h1 className="text-navy text-[18px] tracking-wide font-semibold mx-auto">
                        {month}
                    </h1>
                ) : (
                    <h1 className="text-black text-[18px] tracking-wide font-semibold pl-1">
                        {title}
                    </h1>
                )}

                <button className="flex items-center justify-center rounded shadow-bulletin px-1 justify-self-end">
                    <img
                        src="/menu.svg"
                        alt="menu-icon"
                        className="object-cover object-center shrink-0"
                    />
                </button>
            </div>

            <div className="flex flex-col gap-3">{children}</div>
        </div>
    );
};

export default EnterpriseCard;
