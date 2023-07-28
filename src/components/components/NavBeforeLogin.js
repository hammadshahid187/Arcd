import React, { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button';
import { useHistory, Link } from 'react-router-dom';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import ResetPassword from './ResetPassword/ResetPassword';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';

function NavBeforeLogin({ modal, setModal }) {

    let history = useHistory();

    const [isClickSignUp, setIsClickSignUp] = useState(false);
    const [isClickLogIn, setIsClickLogIn] = useState(false);
    const [isClickResetPassword, setIsResetPassword] = useState(false);
    const [nav, setNav] = useState(false);

    const {
        resetLoginError,
        resetSignUpError
    } = useContext(AuthenticationContext);

    const closePopUp = () => {
        setModal("");
        setNav(false)
        setIsClickSignUp(false);
        setIsClickLogIn(false);
        setIsResetPassword(false);
    };
    const signUpHandler = () => {
        closePopUp();
        resetSignUpError();
        setIsClickSignUp(true);
    };

    const redirectHandler = (path) => {
        history.push(path)
        closePopUp();
    };

    const resetPasswordHandler = () => {
        closePopUp();
        setIsResetPassword(true);
    };

    const logInHandler = () => {
        closePopUp();
        resetLoginError();
        setIsClickLogIn(true);
    };

    const isActive = (path) => {
        return window.location.pathname == path ? '' : 'opacity-20';
    }

    useEffect(() => {
        if (modal == "signup") {
            setIsClickSignUp(true);
        }
        if (modal == "login") {
            setIsClickLogIn(true);
        }
        setModal("");
    }, [modal])

    // Disable scroll when overlay is active
    useEffect(() => {
        if (isClickSignUp || isClickLogIn) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isClickSignUp, isClickLogIn]);

    return (
        <div className="bg-white shadow-2xl">
            <nav className='container mx-auto px-4 lg:px-16 h-24 flex justify-between items-center'>
                <img src='/arcafeed.png' alt='ARCAFEED' width={150} />
                <ul className='hidden md:flex'>

                    <li className='p-4'>
                        <Button onClick={() => { redirectHandler("/") }}><p className={isActive("/")}><b>Home</b></p></Button>
                    </li>
                    <li className='p-4'>
                        <Button onClick={() => { redirectHandler("/news") }}><p className={isActive("/news")}><b>News</b></p></Button>
                    </li>

                    {/* <li className='p-4'>
                        <Button onClick={() => { redirectHandler("/features") }}><p className={isActive("/features")}><b>Features</b></p></Button>
                    </li> */}
                    <li className='p-4'>
                        <Button onClick={() => { logInHandler() }}><p><b>Sign In</b></p></Button>
                    </li>
                    <li className='p-4'>
                        <Button
                            className='hidden p-3 px-6 pt-2 rounded-full baseline md:block'
                            variant='contained'
                            onClick={() => { signUpHandler() }}
                            style={{
                                color: 'white',
                                backgroundColor: '#000066',
                                borderRadius: '100px'
                            }}
                        >
                            JOIN US
                        </Button>
                    </li>
                </ul>

                <ul className='flex block md:hidden'>
                    <li className='p-4'>
                        <Button onClick={() => { logInHandler() }}><p><b>Sign In</b></p></Button>
                    </li>
                    <img onClick={() => { setNav(!nav) }} src={"/new_design/navbar_" + (nav ? "open.svg" : "close.svg")} />
                </ul>

                <ul className={nav ? 'fixed right-0 top-0 w-[100%] h-full bg-[#FFFFFF] ease-in-out duration-100' : 'ease-in-out duration-100 fixed right-[-100%]'} style={{ zIndex: '100' }}>
                    <div onClick={() => { setNav(!nav) }} className='p-10'>
                        <img className={nav ? 'float-right' : ""} src={"/new_design/navbar_" + (nav ? "open.svg" : "close.svg")} />
                    </div>
                    <div className='flex flex-col items-center justify-center'>

                        <li className='p-4 place-content-center'>
                            <Button onClick={() => { redirectHandler("/") }}><p className={isActive("/")}><b>Home</b></p></Button>
                        </li>

                        <li className='p-4 place-content-center'><Button onClick={() => { redirectHandler("/news") }}><p className={isActive("/news")}><b>News</b></p></Button></li>

                        {/* <li className='p-4 place-content-center'><Button onClick={() => { redirectHandler("/features") }}><p className={isActive("/features")}><b>Features</b></p></Button></li> */}


                        <li className='p-4 place-content-center'><Button onClick={() => { logInHandler() }}><p><b>Sign In</b></p></Button></li>
                        <li className='p-4 place-content-center'><Button
                            className='hidden p-3 px-6 pt-2 rounded-full baseline md:block'
                            type='submit'
                            variant='contained'
                            onClick={() => { signUpHandler() }}
                            // TODO: fix this css
                            style={{
                                color: 'white',
                                backgroundColor: '#000066',
                                borderRadius: '100px'
                            }}
                        >
                            JOIN US
                        </Button></li>
                    </div>
                </ul>
            </nav>

            <div className='flex items-center justify-between'>

                {isClickSignUp && (
                    <SignUp
                        closeSignUp={closePopUp}
                        logInHandler={logInHandler}

                        history={history}
                    />
                )}
                {isClickLogIn && (
                    <LogIn
                        closeLogIn={closePopUp}
                        signUpHandler={signUpHandler}
                        resetPasswordHandler={resetPasswordHandler}
                        history={history}
                        logInHandler={logInHandler}
                    />
                )}
                {isClickResetPassword && (
                    <ResetPassword
                        closeResetPassword={closePopUp}
                        resetPasswordHandler={resetPasswordHandler}
                    />
                )}
            </div>
        </div>
    )
}





export { NavBeforeLogin }