export const ThumbsUpIcon = ({ fill = "black", size = "30" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_44_300)">
                <path
                    d="M16.3875 7.15L15.675 10.7625C15.525 11.5 15.725 12.2625 16.2 12.8375C16.675 13.4125 17.375 13.75 18.125 13.75H25V15.1L21.7875 22.5H11.675C11.45 22.5 11.25 22.3 11.25 22.075V12.275L16.3875 7.15ZM17.5 2.5L9.4875 10.5125C9.0125 10.9875 8.75 11.625 8.75 12.2875V22.075C8.75 23.6875 10.0625 25 11.675 25H21.8C22.6875 25 23.5 24.5375 23.95 23.7875L27.2875 16.1C27.425 15.7875 27.5 15.45 27.5 15.1V13.75C27.5 12.375 26.375 11.25 25 11.25H18.125L19.275 5.4375C19.3375 5.1625 19.3 4.8625 19.175 4.6125C18.8875 4.05 18.525 3.5375 18.075 3.0875L17.5 2.5ZM5 11.25H2.5V25H5C5.6875 25 6.25 24.4375 6.25 23.75V12.5C6.25 11.8125 5.6875 11.25 5 11.25Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id="clip0_44_300">
                    <rect width="30" height="30" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const ThumbsDownIcon = ({ fill = "black", size = "30" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_44_303)">
                <path
                    d="M13.6125 22.85L14.325 19.2375C14.475 18.5 14.275 17.7375 13.8 17.1625C13.325 16.5875 12.625 16.25 11.875 16.25H5V14.9L8.2125 7.5H18.325C18.55 7.5 18.75 7.7 18.75 7.925V17.725L13.6125 22.85ZM12.5 27.5L20.5125 19.4875C20.9875 19.0125 21.25 18.375 21.25 17.7125V7.925C21.25 6.3125 19.9375 5 18.325 5H8.2C7.3125 5 6.5 5.4625 6.05 6.2125L2.7125 13.9C2.575 14.2125 2.5 14.55 2.5 14.9V16.25C2.5 17.625 3.625 18.75 5 18.75H11.875L10.725 24.5625C10.6625 24.8375 10.7 25.1375 10.825 25.3875C11.1125 25.95 11.475 26.4625 11.925 26.9125L12.5 27.5ZM25 18.75H27.5V5H25C24.3125 5 23.75 5.5625 23.75 6.25V17.5C23.75 18.1875 24.3125 18.75 25 18.75Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id="clip0_44_303">
                    <rect width="30" height="30" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const ArrowLeft = ({ fill = "black" }) => {
    return (
        <svg
            width="9"
            height="13"
            viewBox="0 0 9 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.800196 6.5L6.8002 0.5L8.2002 1.9L3.6002 6.5L8.2002 11.1L6.8002 12.5L0.800196 6.5Z"
                fill={fill}
            />
        </svg>
    );
};

export const ArrowRight = ({ fill = "black" }) => {
    return (
        <svg
            width="9"
            height="13"
            viewBox="0 0 9 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.1998 6.5L2.1998 12.5L0.799805 11.1L5.3998 6.5L0.799805 1.9L2.1998 0.5L8.1998 6.5Z"
                fill={fill}
            />
        </svg>
    );
};
