import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import CloseIcon from "@mui/icons-material/Close";

const LogIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {
        login,
        currentUser,
        loginError,
        signInWithGoogle,
        signInWitnFacebook,
    } = useContext(AuthenticationContext);
    const { logout } = useContext(AuthenticationContext);
    const location = useLocation();

    useEffect(async () => {
        // if currenUser exists, navigate the user to the news screen
        if (
            currentUser &&
            (location.shouldLogout === undefined || !location.shouldLogout)
        ) {
            props.history.push("/news");
        }
    }, [currentUser]);

    useEffect(() => {
        if (location.shouldLogout !== undefined && location.shouldLogout) {
            location.shouldLogout = false;
            logout();
        }
    }, []);

    const closeLogIn = (e) => {
        if (e.target.classList.contains("popOuter")) {
            props.closeLogIn();
        }
    };

    const loginBtnHandler = async (e) => {
        e.preventDefault();
        document.body.style.overflow = "unset";
        await login(email, password);
    };

    return (
        <div
            className="popOuter fixed top-0 left-0 w-full h-full z-10 bg-black/[0.38]"
            onClick={closeLogIn}
        >
            <form
                onSubmit={loginBtnHandler}
                className="w-screen top-[3vh] left-0 fixed h-[85vh] md:h-[92vh] overflow-x-hidden overflow-auto md:top-[4vh] left-[50%] -translate-x-1/2 w-full max-w-[538px] z-[100] border px-[54px] py-[30px] rounded-xl border-gray-50 bg-[#F5F5F5] shadow mobile-height"
            >
                <CloseIcon
                    className="absolute top-3 right-3"
                    color="disabled"
                    onClick={() => props.closeLogIn()}
                />

                <div className="flex justify-center mb-[40px]">
                    <img src="/arcafeed.png" alt="ARCAFEED" width={201} />
                </div>

                <div className="text-left space-y-[20px]">
                    <input
                        type="text"
                        required
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="focus:outline-none focus:border-arca-blue p-2 w-full border rounded-lg border-gray-300"
                    />

                    <input
                        type="password"
                        required
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="focus:outline-none focus:border-arca-blue p-2 w-full border rounded-lg border-gray-300"
                    />
                </div>

                <div className="mt-[30px] w-full text-left text-arca-red space-y-6">
                    {/* {error && `Invalid Email or Password. Please try again.`} */}
                    {loginError}
                </div>

                <button
                    type="submit"
                    className="mt-[40px] font-semibold text-xl border px-3 py-2 rounded-lg bg-arca-red w-full text-white"
                >
                    Log In
                </button>
                <div className="py-[15px] text-center">Or</div>
                <button
                    onClick={signInWithGoogle}
                    type="button"
                    className="font-Inter mb-3.5 w-full py-[8px] flex justify-center items-center border border-arca-blue rounded-lg"
                >
                    <img src="/logo_google.png" alt="Google" />
                    <span className="text-lg ml-[10px]">
                        Log In with Google
                    </span>
                </button>
                <button
                    onClick={signInWitnFacebook}
                    type="button"
                    className="font-Inter mb-3.5 w-full py-[8px] flex justify-center items-center border border-arca-blue rounded-lg"
                >
                    <img src="/logo_facebook.png" alt="Facebook" />
                    <span className="text-lg ml-[10px] text-arca-blue">
                        Log In with Facebook
                    </span>
                </button>
                <div className="flex text-sm justify-center items-center font-Inter">
                    <span>Don't have an account?</span>
                    <button
                        type="button"
                        className="text-arca-blue ml-1.5"
                        onClick={props.signUpHandler}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="flex text-sm items-center justify-center mt-4">
                    <button
                        type="button"
                        className="text-arca-blue"
                        onClick={props.resetPasswordHandler}
                    >
                        Forgot Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;
