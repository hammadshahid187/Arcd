import { IconButton } from "@mui/material";
import Avatar from "../Avatar/Avatar";
import Tag from "../Tags/Tags";
import { OutlineBtn } from "../Button/Button";
import { ThumbsDownIcon, ThumbsUpIcon } from "../Icons";

export default function NewsComments() {
    return (
        <div className="flex flex-col mb-12">
            <h2 className="text-lg md:text-md lg:text-xl mb-3 pb-3 font-bold font-sourceSansPro border-b-2">
                Comments
            </h2>

            <div className="flex flex-col align-top mt-5 text-sm lg:text-base">
                <div className="flex gap-5">
                    <div className="shrink-0">
                        <Avatar />
                    </div>
                    <div className="flex flex-col grow">
                        <h2 className="text-lg md:text-md lg:text-xl font-bold ">
                            User A
                        </h2>
                        <div className="flex gap-2 mt-4">
                            <Tag text="AAPL" />
                            <Tag
                                text="Bearish"
                                addClass="text-[#FF413C] !bg-[#FFC0C0]"
                            />
                        </div>
                        <div className="text-gray-500 mt-3 text-[16px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Pharetra donec interdum morbi curabitur. At
                            proin dignissim lectus tempor risus nisi dictumst
                            aliquet. Pellentesque massa, in nunc viverra
                            accumsan sem. Sagittis, ut sapien, eleifend platea
                            senectus consectetur.
                        </div>

                        <div className="self-end flex gap-5">
                            <div className="flex gap-2">
                                <div className="flex gap-1 items-center">
                                    <IconButton onClick={() => console.log("pressed")}>
                                        <ThumbsUpIcon fill="navy" size="25px" />
                                    </IconButton>
                                    <span className="font-semibold">109</span>
                                </div>

                                <div className="flex gap-1 items-center">
                                    <IconButton>
                                        <ThumbsDownIcon
                                            fill="navy" size="25px"
                                        />
                                    </IconButton>
                                    <span className="font-semibold">6</span>
                                </div>
                            </div>

                            <OutlineBtn text="Reply" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col align-top mt-10 text-sm lg:text-base">
                <div className="flex gap-5">
                    <div className="shrink-0">
                        <Avatar />
                    </div>
                    <div className="flex flex-col grow">
                        <h2 className="text-lg md:text-md lg:text-xl font-bold ">
                            User A
                        </h2>
                        <div className="flex gap-2 mt-4">
                            <Tag text="MSFT" />
                            <Tag
                                text="Bullish"
                                addClass="text-[#FF413C] !bg-[#FFC0C0]"
                            />
                        </div>
                        <div className="text-gray-500 mt-3 text-[16px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Pharetra donec interdum morbi curabitur. At
                            proin dignissim lectus tempor risus nisi dictumst
                            aliquet. Pellentesque massa, in nunc viverra
                            accumsan sem. Sagittis, ut sapien, eleifend platea
                            senectus consectetur.
                        </div>

                        <div className="self-end flex gap-5">
                            <div className="flex gap-2">
                                <div className="flex gap-1 items-center">
                                    <IconButton onClick={() => console.log("pressed")}>
                                        <ThumbsUpIcon fill="navy" size="25px" />
                                    </IconButton>
                                    <span className="font-semibold">109</span>
                                </div>

                                <div className="flex gap-1 items-center">
                                    <IconButton>
                                        <ThumbsDownIcon
                                            fill="navy" size="25px"
                                        />
                                    </IconButton>
                                    <span className="font-semibold">6</span>
                                </div>
                            </div>

                            <OutlineBtn text="Reply" />
                        </div>
                    </div>
                </div>
            </div>

            <button className="self-center flex gap-2 items-center mt-10 text-arca-blue font-bold hover:underline">
                <span>View All Comments (10)</span>
                <span className="flex items-center justify-center p-2 rounded-full bg-arca-blue">
                    <img
                        src="/down-arrow.svg"
                        alt="down-arrow"
                        className="h-[10px] w-[10px]"
                    />
                </span>
            </button>
        </div>
    );
}
