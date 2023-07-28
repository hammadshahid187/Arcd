import { Button } from "@mui/material";
import { OutlineBtn } from "../Button/Button";
import Tag from "../Tags/Tags";

export default function AddComment() {
    return (
        <form className="flex flex-col text-sm lg:text-base">
            <h2 className="text-lg md:text-md lg:text-xl mb-2 font-bold font-sourceSansPro border-b pb-4">
                Add My Comment
            </h2>

            <div className="flex flex-col">
                <span className="text-gray-400 text-[14px]">Choose a ticker</span>
                <div className="flex gap-2 mt-2">
                    <Tag text="MSFT"
                        addClass="text-[#182a85] !bg-[#fff] border border-[#182a85]" />
                    <Tag
                        text="Bullish"
                        addClass="text-[#182a85] !bg-[#fff] border border-[#182a85]"
                    />
                </div>
            </div>

            <div className="mt-10">
                <textarea
                    name="add-comment"
                    id="add-comment"
                    // cols="30"
                    rows="10"
                    className="border border-[#182a85] outline-0 rounded-md w-full py-2.5 px-3 bg-[#FFF] h-32 text-gray-600 focus:border focus:border-navy-blue"
                    placeholder="Enter your comment after selecting a ticker..."
                ></textarea>
            </div>

            <div className="self-end mt-4">
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        textTransform: "capitalize",
                        backgroundColor: "rgb(23, 43, 133)",
                        "&:hover": {
                            background: "rgba(23, 43, 133, .9)",
                        },
                    }}
                >
                    Post Comment
                </Button>
            </div>
        </form>
    );
}
