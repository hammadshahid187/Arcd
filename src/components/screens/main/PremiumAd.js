import React, { useState, useEffect, useContext } from "react";
import { firebaseApp } from "../../../config/Firebase";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import LogIn from "../../components/LogIn/LogIn";
import SignUp from "../../components/SignUp/SignUp";
import ResetPassword from "../../components/ResetPassword/ResetPassword";

// Stripe Initialization
const initializeStripe = async () => {

    const publishableKey = "pk_live_51IIkuQFHoKYpZR6ojLitzxBXsdsM1w9iVCFfsPeNqNorjnellwAErXtLHVO3VShebYVvNj1bTLdqWKMQrWhaH5cD00cibwiEO6"

    const stripePromise = await loadStripe(publishableKey);

    return stripePromise;

};

async function createCheckoutSession(uid, setIsLoadingPayment) {
    setIsLoadingPayment(true);



    const firestore = firebaseApp.firestore();

    // Create a new stripe checkout session
    const checkoutSessionRef = await firestore.collection("users").doc(uid).collection("checkout_sessions").add({
        price: "price_1JghEPFHoKYpZR6og8mNItpN",
        success_url: window.location.origin + "/mystocks",
        cancel_url: window.location.origin
    });

    // Wait for the Checkout Session to get attached by the extension
    checkoutSessionRef.onSnapshot(async (snap) => {

        const snapData = snap.data();


        const { sessionId } = snap.data();


        if (sessionId) {
            // We have a session, let's redirect to Checkout
            // Init Stripe
            const stripe = await initializeStripe();
            stripe.redirectToCheckout({ sessionId });
        } else {

        }
    });
}

const PremiumAd = ({ history }) => {
    const [uid, setUid] = useState();
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const { userType, currentUser, resetLoginError, resetSignUpError } = useContext(AuthenticationContext);

    const [isClickSignUp, setIsClickSignUp] = useState(false);
    const [isClickLogIn, setIsClickLogIn] = useState(false);
    const [isClickResetPassword, setIsResetPassword] = useState(false);

    const closeAllPopUp = () => {
        closeLogIn();
        closeResetPassword();
        closeSignUp();
    }

    const signUpHandler = () => {
        closeAllPopUp();
        resetSignUpError();
        setIsClickSignUp(true);
    };
    
    const closeSignUp = () => {
        setIsClickSignUp(false);
    }

    const logInHandler = () => {
        closeAllPopUp();
        resetLoginError();
        setIsClickLogIn(true);
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

    // useEffect(() => {
    //     if (!currentUser) {
    //         // history.push("/login");
    //     } else { 
            
    //     }
    // }, [currentUser]);

    return (
        <div > {
            isLoadingPayment ? <div className="flex justify-center ...">
                <LoadingSpinner />
            </div> : <>
                <Navbar history={history}
                    stocks /> {

                    <div className="container mx-auto">
                        <div className="lg:mx-48 flex justify-center">
                            <div className="relative bg-arca-blue">
                                <img src="/stock.png" alt="prize" className="bg-white object-cover lg:block hidden object-center shadow-md" />
                                <img src="https://images.unsplash.com/photo-1549421263-6064833b071b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=918&q=80" alt="prize" className="bg-white object-cover lg:hidden block object-center shadow-md" />
                                <div className="p-6 lg:absolute lg:top-0 sm:mt-10 lg:right-0 md:w-3/5 xl:w-3/5 text-white md:py-2 mb-5 xl:mb-2 xl:py-12 md:pl-40 lg:pl-24 xl:pl-20 my">
                                    <div className="text-3xl font-semibold pb-5">
                                        Stay ahead of the market
                                    </div>
                                    <div className="text-l mb-5 text-gray-300">
                                        Arcafeed Premium unlocks a personalized financial experience.
                                        Just $4.99 a month. Cancel anytime.
                                    </div>
                                    <div className="flex justify-center lg:block">
                                        <span className="font-semibold rounded-full text-white px-6 text-sm py-3 xl:ml-64"
                                            style={
                                                { backgroundColor: "#ff0000" }
                                            }>
                                            <button className="uppercase font-bold"
                                                onClick={
                                                    () => userType === "Basic" ? createCheckoutSession(currentUser.uid, setIsLoadingPayment) : (userType === "Premium" ? history.push("/account") : logInHandler())
                                                }>
                                                Get Started
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stock-banner lg:mx-48 mb-10 bg-gray-500">
                            <div className="text-3xl text-center stock-banner font-semibold  text-white pt-8">
                                Arcafeed Plans
                            </div>
                            <div className="text-xl stock-banner text-center text-white mt-3">
                                Choose what plan is best for you
                            </div>
                            <div className="flex flex-col xl:flex-row justify-center mb-5 p-3 pt-0">
                                <div className="bg-white grow rounded-xl py-3 px-6 lg:px-20 mx-5 md:mx-28 xl:mx-10 my-5 xl:my-10">
                                    <div className="flex space-x-3">
                                        <div className="mx-auto font-bold text-xl">Basic</div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="mx-auto font-semibold">$0</div>
                                    </div>
                                    <div className="w-56 mx-auto">
                                        <div className="flex space-x-3 mt-4">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#4BB0CE" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                                </svg>
                                            </div>
                                            <div className="pl-4">General Market News</div>
                                        </div>
                                        <div className="flex space-x-3 mt-1">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#FF7570" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                                                </svg>
                                            </div>
                                            <div className="pl-4">My Stocks News</div>
                                        </div>
                                        <div className="flex space-x-3 mt-1">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#FF7570" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                                                </svg>
                                            </div>
                                            <div className="pl-4">Ad-free</div>
                                        </div>
                                        <div className="flex space-x-3 mt-1 mb-6">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#FF7570" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                                                </svg>
                                            </div>
                                            <div className="pl-4">Discover Market</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white grow rounded-xl py-5 px-6 lg:px-20 mx-5 md:mx-28 xl:mx-10 my-5 xl:my-10">
                                    <div className="flex space-x-3">
                                        <div className="mx-auto font-bold text-xl">Premium</div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="mx-auto text-sm font-semibold">
                                            $4.99 monthly
                                        </div>
                                    </div>
                                    <div className="w-56 mx-auto">
                                        <div className="flex space-x-3 mt-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="#4BB0CE" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>
                                            <div className="pl-4">General Market News</div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="#4BB0CE" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>
                                            <div className="pl-4">My Stocks News</div>
                                        </div>
                                        <div className="flex space-x-3 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="#4BB0CE" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>
                                            <div className="pl-4">Ad-free</div>
                                        </div>
                                        <div className="flex space-x-3  mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="#4BB0CE" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>
                                            <div className="pl-4">Discover Market</div>
                                        </div>

                                        <div className="my-2 ml-4">
                                            <span className="uppercase text-red-500 mt-3 py-1 px-4  ml-8 border-2 rounded-full px-2 border-red-500">
                                                <button className="uppercase font-bold"
                                                    onClick={
                                                        () => userType === "Basic" ? createCheckoutSession(currentUser.uid, setIsLoadingPayment) : (userType === "Premium" ? history.push("/account") : logInHandler())
                                                    }>
                                                    {
                                                        (!userType || userType === "Basic") ? "Go Premium" : "Manage "
                                                    }
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                }
                {isClickSignUp && (<SignUp closeSignUp={closeSignUp} logInHandler={logInHandler} history={history}/>)}
                {isClickLogIn && (<LogIn closeLogIn={closeLogIn} signUpHandler={signUpHandler} resetPasswordHandler={resetPasswordHandler} history={history} logInHandler={logInHandler}/>)}
                {isClickResetPassword && (<ResetPassword closeResetPassword={closeResetPassword} resetPasswordHandler={resetPasswordHandler}/>)}
                <Footer history={history} ad={true} />
            </>
        } </div>
    );
};

export default PremiumAd;
