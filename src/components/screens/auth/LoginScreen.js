import { useContext, useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, currentUser, error } = useContext(AuthenticationContext);
  const { logout } = useContext(AuthenticationContext);
  const location = useLocation();

  useEffect(async () => {
    // if currenUser exists, navigate the user to the news screen
    if (currentUser && (location.shouldLogout==undefined || !location.shouldLogout)) {
      history.push("/news");
    }
  }, [currentUser]);

  useEffect(() => {
    if (location.shouldLogout!=undefined && location.shouldLogout) {
      location.shouldLogout = false;
      logout();
    }
  },[]);

  const changePage = () =>
  {
    history.push('/register')
  }

  const loginBtnHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const forgotPassword = () =>
  {
    history.push('/forgotpassword')

  }

  return (
    <div className="flex justify-center h-screen place-items-center text-left">
      <div className="text-center border p-10 rounded-xl border-gray-50 shadow">
        
        <form
          onSubmit={loginBtnHandler}
          className=""
        >
          <div className="flex justify-center mb-6" onClick={() => history.push('/')}>
            <img src="/arcafeed.png" alt="ARCAFEED" width={125} />
          </div>

          <h3 className="text-4xl font-bold mb-10">Login</h3>

          <div className="w-80 text-left space-y-6">
            <div className="border py-2 pl-2 rounded-lg border-gray-200">
              {/* <label for="">Email: </label> */}
              <input
                type="text"
                required
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none pr-2 w-full"
              />
            </div>

            <div className="border py-2 rounded-lg pl-2 border-gray-200">
              {/* <label for="password">Password: </label> */}
              <input
                type="password"
                required
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:outline-none pr-2 w-full"
              />
            </div>



            <div className="w-80 text-left text-arca-red space-y-6">
              {/* {error && `Invalid Email or Password. Please try again.`} */}
              {error}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-8 mb-4 border px-4 py-3 rounded-lg bg-arca-red w-full text-white hover:bg-arca-blue"
            >
              Login
            </button>
            <p className="">
              Don't have an account?{" "}
              <button className="text-arca-blue underline" onClick={changePage}>
                Register
              </button>
            </p>
          </div>
        </form>
        <button className='mt-3 hover:underline text-arca-blue' onClick={forgotPassword}>Forgot password</button>

      </div>
    </div>
  );
};

export default LoginScreen;
