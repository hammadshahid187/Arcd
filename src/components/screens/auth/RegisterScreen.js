import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";

const RegisterScreen = ({ match, history }) => {
  const [checked, setChecked] = React.useState(true);
  const { register, currentUser, error } = useContext(AuthenticationContext);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  var daEmail;
  daEmail = match.params.email ? match.params.email : "";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(daEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // if currenUser exists, navigate the user to the news screen
    if (currentUser) {
      history.push("/news");
    }
  }, [currentUser]);

  const registerBtnHandler = async (e) => {
    e.preventDefault();
    await register(firstName +" "+ lastName, email, password, confirmPassword);
  };

  return (
    <div className="flex justify-center h-screen place-items-center text-left">
      <div className="text-center" style={{ maxWidth: 400 }}>
        <form
          onSubmit={registerBtnHandler}
          className="border p-10 rounded-xl border-gray-50 shadow"
        >
          <div className="flex justify-center mb-6" onClick={() => history.push('/')}>
            <img src="/arcafeed.png" alt="ARCAFEED" width={125} />
          </div>

          <h3 className="text-4xl font-bold mb-10">Register</h3>
          <div className="w-80 text-left space-y-6">

            <div className="space-y-6 md:flex md:space-x-4 md:space-y-0">
              <div className="border py-2 pl-2 rounded-lg border-gray-200">
                <input className="focus:outline-none pr-2 w-full" type="text" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="border py-2 pl-2 rounded-lg border-gray-200">
                <input className="focus:outline-none pr-2 w-full" type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>

            </div>
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

            <div className="border py-2 rounded-lg pl-2 border-gray-200">
              {/* <label htmlFor="confirmpassword">Confirm Password: </label> */}
              <input
                type="password"
                required
                id="confirmpassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="focus:outline-none pr-2 w-full"
              />
            </div>
            <div className="w-80 text-left text-arca-red space-y-6">
              {/* {error && `Invalid Email or Password. Please try again.`} */}
              {error}
            </div>
          </div>

          <div className="my-4 border py-2 rounded-lg pl-2 border-gray-200 grid grid-cols-10">
            <Checkbox
              className="col-span-2"
              checked={checked}
              onChange={handleChange}
              required={true}
            // inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <p className="col-span-7">
              I agree to Arcafeed's{" "}
              <Link className="text-blue-600 underline" to="/privacy-policy">
                {" "}
                Privacy Policy{" "}
              </Link>{" "}
              and{" "}
              <a className="text-blue-600 underline" href="/terms">
                {" "}
                Terms of Service{" "}
              </a>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="mt-4 mb-4 border px-4 py-3 rounded-lg bg-arca-red w-full text-white"
            >
              Register
            </button>
            <p className="">
              Already have an account?{" "}
              <Link to="/login" className="text-arca-blue underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
