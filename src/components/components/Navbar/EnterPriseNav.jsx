import { IconButton } from "@mui/material";
import { FilledBtn } from "../Button/Button";
import "./style.css";
import { useState } from "react";

const EnterPriseNav = () => {
    const [menu,setMenu]=useState("0")
    return (
        <div className="top-0 bg-white w-full shadow-nav">
            <div className="flex justify-between items-center px-10 py-4 mx-auto">
                <div className="w-[200px] shrink-0">
                    <img src="/arcafeed.png" alt="brand-logo" />
                </div>
                <div className="all-center md:!hidden ml-auto" >
                    <img src="/mainmenu.svg" className="w-[35px]" onClick={()=>setMenu("1")} />
                </div>
                <div className={`bg-white flex w-full relative block fixed left-0 h-auto z-40 top-0 main-nav ${menu==="1"?"":"nav-hide"} `}>
                    <div className="mb-5 md:hidden flex">
                        <div className="w-[200px] shrink-0">
                            <img src="/arcafeed.png" alt="brand-logo" />
                        </div>
                        <div className="all-center ml-auto">
                            <img src="/close.svg" alt="brand-logo" className="w-[35px]" onClick={()=>setMenu("0")} />
                        </div>
                    </div>
                    <div
                        className="relative basis-3/12 rounded-sm border-2 border-[#172b85]  md:mx-auto md:w-full w-3/4"
                        style={{ background: "rgba(211, 216, 238, 0.55)" }}
                    >
                        <input
                            type="text"
                            name="search"
                            className="enterprise-search h-full text-base py-2 outline-none border-none w-full pl-12 text-[#262626] "
                            placeholder="Search"
                            style={{ background: "rgba(211, 216, 238, 0.55)" }}
                        />
                        <span className="absolute left-3 md:top-3 top-[6px]">
                            <img src="/search.svg" alt="search-icon" />
                        </span>
                    </div>

                    <div className="md:basis-4/12 md:flex block justify-between items-center">
                        <div className="md:flex gap-1 items-center md:mt-0 mt-10">
                            <span className="text-navy font-normal me-2 !text-[18px]">Focus: </span>
                            <FilledBtn text="Market" />
                            <FilledBtn text="AAPL" />
                            <FilledBtn text="TMUX" />
                            <FilledBtn text="SBUX" className="!mr-0" />
                            <IconButton
                                sx={{
                                    boxShadow: "rgba(30, 105, 255, 0.4)",
                                    borderRadius: "4px",
                                }}
                            >
                            <img src="/add.svg" alt="add-icon" className="box-shadow p-2 rounded" />
                            </IconButton>
                            <IconButton className="px-4 !ml-10"
                                sx={{
                                    boxShadow: "rgba(30, 105, 255, 0.4)",
                                    borderRadius: "4px",
                                }}
                            >
                                <div className="flex gap-3 md:relative fixed md:top-auto top-[96px] right-[30px] w-auto md:w-auto w-[49px]">
                                <img src="/user-round.svg" alt="user-icon" />
                                <img src="/caret-down.svg" alt="user-icon" />
    
                                </div>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnterPriseNav;
