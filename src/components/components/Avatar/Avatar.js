export default function Avatar({
    imgUrl = "/user.svg",
    addClass = "",
    size = 10,
}) {
    return (
        <div
            className={`flex justify-center items-center bg-gray-300 p-1 rounded-full ${addClass}`}
        >
            <img
                src={imgUrl}
                alt="user-avatar"
                className={`rounded-full h-${size}`}
            />
        </div>
    );
}
