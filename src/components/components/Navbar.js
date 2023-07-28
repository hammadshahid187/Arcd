import React, { useState, useEffect, useContext } from "react";
import SearchStock from "./SearchStock";
import AvatarNavRender from "./AvatarNav";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import LogIn from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import ResetPassword from "./ResetPassword/ResetPassword";
import { useLocation } from "react-router-dom";

const Navbar = ({ history, activeNav, user }) => {
    const {
        login,
        currentUser,
        loginError,
        signInWithGoogle,
        signInWitnFacebook,
        userType,
        logout,
        signUpError,
        resetLoginError,
        resetSignUpError,
    } = useContext(AuthenticationContext);
    const location = useLocation();
    const [email, setEmail] = useState("");

    const [isClickSignUp, setIsClickSignUp] = useState(false);
    const [isClickLogIn, setIsClickLogIn] = useState(false);
    const [isClickResetPassword, setIsResetPassword] = useState(false);

    const closeAllPopUp = () => {
        closeLogIn();
        closeResetPassword();
        closeSignUp();
    };

    const signUpHandler = () => {
        closeAllPopUp();
        resetSignUpError();
        setIsClickSignUp(true);
    };

    const closeSignUp = () => {
        setIsClickSignUp(false);
    };

    const logInHandler = () => {
        if (
            currentUser &&
            (location.shouldLogout == undefined || !location.shouldLogout)
        ) {
            history.push("/account");
        } else {
            closeAllPopUp();
            resetLoginError();
            setIsClickLogIn(true);
        }
    };

    const closeLogIn = () => {
        setIsClickLogIn(false);
    };

    const resetPasswordHandler = () => {
        closeAllPopUp();
        setIsResetPassword(true);
    };

    const closeResetPassword = () => {
        setIsResetPassword(false);
    };

    const stocksSwitch = () => {
        if (
            currentUser &&
            (location.shouldLogout == undefined || !location.shouldLogout)
        ) {
            if (userType && userType === "Basic") {
                setClicked(!clicked);
                history.push("/premium");
            } else {
                setClicked(!clicked);
                history.push("/mystocks");
            }
        } else {
            closeAllPopUp();
            resetLoginError();
            setIsClickLogIn(true);
        }
    };

    const logoutBtnHandler = async (e) => {
        e.preventDefault();
        history.push({
            pathname: "/login",
            shouldLogout: true,
        });
    };

    const newsSwitch = () => {
        if (
            currentUser &&
            (location.shouldLogout == undefined || !location.shouldLogout)
        ) {
            setClicked(!clicked);
            history.push("/news");
        } else {
            closeAllPopUp();
            resetLoginError();
            setIsClickLogIn(true);
        }
    };

    const bookmarksSwitch = () => {
        history.push("/bookmarks");
    };

    const discoverSwitch = () => {
        history.push("/discover");
    };

    const accountSwitch = () => {
        history.push("/account");
    };

    const [clicked, setClicked] = useState(false);

    return (
        <div className="pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-8 lg:pl-16 lg:pr-16 xl:pl-32 xl:pr-32 sticky top-0 z-50 bg-white p-2 fixed mb-2 md:mb-8 lg:mb-10">
            {isClickSignUp && (
                <SignUp
                    closeSignUp={closeSignUp}
                    logInHandler={logInHandler}
                    email={email}
                    history={history}
                />
            )}
            {isClickLogIn && (
                <LogIn
                    closeLogIn={closeLogIn}
                    signUpHandler={signUpHandler}
                    resetPasswordHandler={resetPasswordHandler}
                    history={history}
                    logInHandler={logInHandler}
                />
            )}
            {isClickResetPassword && (
                <ResetPassword
                    closeResetPassword={closeResetPassword}
                    resetPasswordHandler={resetPasswordHandler}
                />
            )}
            <div className="flex items-center justify-between">
                <div
                    className="items-center cursor-pointer"
                    onClick={() => {
                        history.push("/");
                    }}
                >
                    <div className="hidden md:block">
                        <img src="/arcafeed.png" alt="ARCAFEED" width={200} />
                    </div>
                    <div className="md:hidden block">
                        <img src="/logo.png" alt="ARCAFEED" width={40} />
                    </div>
                </div>
                <div className="w-full">
                    <SearchStock history={history} />
                </div>

                <div className="items-center hidden md:flex">
                    <div>
                        <div
                            className={`md:pt-4 md:pb-4 md:pl-4 md:pr-4 cursor-pointer flex space-x-1 ${
                                activeNav === "stocks" ? "font-bold" : ""
                            }`}
                            onClick={() => stocksSwitch()}
                        >
                            <h1>MY </h1>
                            <h1> STOCKS</h1>
                        </div>
                        {activeNav === "stocks" ? (
                            <div className="h-1 bg-arca-blue" />
                        ) : (
                            <></>
                        )}
                    </div>

                    <div>
                        <div
                            className="md:pt-4 md:pb-4 md:pl-4 md:pr-4 cursor-pointer"
                            onClick={() => newsSwitch()}
                        >
                            <h1
                                className={
                                    activeNav === "news" ? "font-bold" : ""
                                }
                            >
                                NEWS
                            </h1>
                        </div>
                        {activeNav === "news" ? (
                            <div className="h-1 bg-arca-blue" />
                        ) : (
                            <></>
                        )}
                    </div>

                    <div>
                        <div
                            className="md:pt-4 md:pb-4 md:pl-4 md:pr-4 cursor-pointer"
                            onClick={() => bookmarksSwitch()}
                        >
                            <h1
                                className={
                                    activeNav === "bookmarks" ? "font-bold" : ""
                                }
                            >
                                BOOKMARKS
                            </h1>
                        </div>
                        {activeNav === "bookmarks" ? (
                            <div className="h-1 bg-arca-blue" />
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="md:pt-3 md:pb-4 md:pl-4 cursor-pointer">
                        <AvatarNavRender history={history} />
                    </div>
                </div>

                <div className="flex md:hidden mb-1 cursor-pointer">
                    <label
                        onClick={() => setClicked(!clicked)}
                        htmlFor="menu-toggle"
                        className="pointer-cursor block lg:hidden block"
                    >
                        <svg
                            className="fill-current text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <title>menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </label>
                    <input
                        className="hidden"
                        type="checkbox"
                        id="menu-toggle"
                    />
                </div>
            </div>

            {clicked ? (
                <div className="md:hidden w-full justify-end" id="menu">
                    <nav>
                        <ul className="cursor-pointer text-base text-gray-700 pt-4 items-end">
                            <li
                                onClick={() => stocksSwitch()}
                                className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400 space-x-1"
                            >
                                <h1>MY</h1>
                                <h1>STOCKS</h1>
                            </li>

                            <li
                                onClick={() => newsSwitch()}
                                className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400"
                            >
                                NEWS
                            </li>
                            <li
                                onClick={() => accountSwitch()}
                                className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400"
                            >
                                ACCOUNT
                            </li>
                            <li
                                onClick={() => bookmarksSwitch()}
                                className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400"
                            >
                                BOOKMARKS
                            </li>
                            {/* <li
                onClick={() => discoverSwitch()}
                className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400"
              >
                DISCOVER
              </li> */}
                            <li
                                onClick={logoutBtnHandler}
                                className="flex justify-end py-3 px-0 block border-b-2 hover:border-indigo-400"
                            >
                                LOG OUT
                            </li>
                        </ul>
                    </nav>
                </div>
            ) : (
                <div className="hidden w-full" id="menu" />
            )}
        </div>
    );
};

export default Navbar;
