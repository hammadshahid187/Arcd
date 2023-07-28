export default function Tag({
    bg = "bg-arca-blue",
    text = "AAPL",
    addClass = "",
}) {
    return (
        <div
            className={`rounded-md text-white ${bg} px-2 text-[12px] ${addClass}`}
        >
            {text}
        </div>
    );
}
