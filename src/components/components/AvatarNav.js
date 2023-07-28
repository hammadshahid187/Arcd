import React, { useState, useContext, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { PersonOutlineOutlined } from "@material-ui/icons";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import LogIn from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import ResetPassword from "./ResetPassword/ResetPassword";
import { useLocation } from "react-router-dom";

const AvatarNav = ({ color, history }) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const { login, currentUser, loginError, signInWithGoogle, signInWitnFacebook, userType,logout, signUpError, resetLoginError, resetSignUpError  } = useContext(AuthenticationContext);
  const location = useLocation();
  const [email, setEmail] = useState("");

  const openDropdownPopover = () => 
  {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => 
  {
    setDropdownPopoverShow(false);
  };

  const logoutBtnHandler = async (e) => 
  {
    e.preventDefault();
    logout();
    history.push({
      pathname: "/",
      shouldLogout: true
    })
  };

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
    if (currentUser && (location.shouldLogout==undefined || !location.shouldLogout)) {
        history.push("/account");
    }else{
      closeAllPopUp();
      resetLoginError();
      setIsClickLogIn(true);
    }  
  };

  const closeLogIn = () => {
      setIsClickLogIn(false);
  }

  const resetPasswordHandler = () => {
    closeAllPopUp();
    setIsResetPassword(true);
  }

  const closeResetPassword = () => {
    setIsResetPassword(false);
  }


  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      {isClickSignUp && (<SignUp closeSignUp={closeSignUp} logInHandler={logInHandler} email={email} history={history}/>)}
      {isClickLogIn && (<LogIn closeLogIn={closeLogIn} signUpHandler={signUpHandler} resetPasswordHandler={resetPasswordHandler} history={history} logInHandler={logInHandler}/>)}
      {isClickResetPassword && (<ResetPassword closeResetPassword={closeResetPassword} resetPasswordHandler={resetPasswordHandler}/>)}
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={
                "font-bold uppercase text-sm outline-none focus:outline-none" +
                bgColor
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <PersonOutlineOutlined />
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-2xl mt-1"
              }
              style={{ minWidth: "6rem" }}
            >
              {/* <a
                                href="#pablo"
                                className={
                                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                                    (color === "white" ? " text-blueGray-700" : "text-white")
                                }
                                onClick={e => e.preventDefault()}
                            >
                                Action
                            </a> */}
              <a
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={logInHandler}
              >
                Account
              </a>
              {/* <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/bookmarks");
                }}
              >
                Bookmarks
              </a> */}
              {
                /*
              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/discover");
                }}
              >
                Discover
              </a>
                */
              }


              <a
                href="#pablo"
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={logoutBtnHandler}
              >
                Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function AvatarNavRender({ history }) {
  return (
    <>
      <AvatarNav color="white" history={history} />
    </>
  );
}
