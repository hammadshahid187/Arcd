import { useContext, useState } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { auth, db } from "../../../config/Firebase";

const ResetPassword = (props) => {

    const closeResetPassword = (e) => {
        if(e.target.classList.contains('popOuter')){
            props.closeResetPassword();
        }
    };

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    const { currentUser, userType, logout } = useContext(AuthenticationContext);
  

    const  resetError = () => {
        setError(null);
    }
  
    const forgotPasswordHandler = async (e) => {
      e.preventDefault();
  
      try 
      {
        if(!email) alert('Please enter email')
        else 
        {
          await auth.sendPasswordResetEmail(email)
          setError('')
        }
      }
      catch(error)
      {
        setError(error.message)
      }
  
    };
  

    return (
        <div className="popOuter fixed top-0 left-0 w-full h-full z-10 bg-black/[0.38]" onClick={closeResetPassword}>
            <form onSubmit={forgotPasswordHandler} className="w-screen top-0 left-0 fixed tablet:top-[8vh] tablet:left-[50%] tablet:-translate-x-1/2 tablet:w-full tablet:max-w-[538px] z-[100] overflow-hidden border px-[54px] py-[30px] tablet:rounded-xl border-gray-50 bg-[#F5F5F5] shadow">
                <div className="flex justify-center mb-[60px]">
                    <img src="/arcafeed.png" alt="ARCAFEED" width={221} />
                </div>

                <div className="text-lg mb-[40px] mx-auto text opacity-50 font-Inter max-w-[3200px] text-center">
                    <div>Enter the email address associated</div> 
                    <div>with this account to reset your password</div>
                </div>

                <div className="text-left">
                    <input
                        type="text"
                        required
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="focus:outline-none focus:border-arca-blue p-2 w-full border rounded-lg border-gray-300" 
                    />

                    {
                        error && 
                        <div className="w-80 text-left text-arca-red space-y-6 mt-4">
                            {error}
                        </div>
                    }
                    {
                        success && 
                        <div className="w-80 text-left text-green space-y-6 mt-4">
                            {success}
                        </div>
                    }
                    
                </div>

                <button
                    type="submit"
                    className="mt-[30px] font-semibold text-xl border px-4 py-3 rounded-lg bg-arca-red w-full text-white"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
