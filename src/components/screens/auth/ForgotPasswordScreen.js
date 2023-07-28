import { useContext, useState } from "react";
import axios from "axios";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { auth, db } from "../../../config/Firebase";


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { currentUser, userType, logout } = useContext(AuthenticationContext);


  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try 
    {
      if(!email) alert('Please enter email')
      else 
      {
        await auth.sendPasswordResetEmail(email)

        setSuccess("We have sent a password recover instructions to your email. Please check.")

        setError('')
      }
    }
    catch(error)
    {
      console.log("here2");
      setSuccess(null);
      setError(error.message);
    }
   
    
    /*
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    */
    

  };

  return (
    <div className='forgotpassword_screen'>


    <div className="flex flex-col justify-center h-screen items-center">

      <div className='w-min text-center'>
      <h1 className='text-4xl w-80 mb-10'>Forgot password?</h1>

      {error && <span className="error-message">{error}</span>}
      {success && <span className="success-message">{success}</span>}

      <form onSubmit={forgotPasswordHandler}>

      <p className='text-gray-400'>Enter the email address associated with this account to reset your password.</p>

      <div className=" rounded-lg border-gray-200 text-left my-5">
      <input 
      type='email'
      required
      id='email'
      placeholder='Email'
      value={email}
      className='border p-3 w-full'
      onChange={(e) => setEmail(e.target.value)}

      />
      </div>

      <div className='py-5'>
      <button type='submit' className='bg-arca-blue text-white rounded-full w-full py-3'>Send Email</button>
      </div>
      
      </form>

      <div className='flex justify-center mt-10 opacity-50'>
      <img src="/arcafeed.png" alt="ARCAFEED" width={150} />
      </div>
      
      
    </div>

    </div>
    </div>
  );
};

export default ForgotPasswordScreen;