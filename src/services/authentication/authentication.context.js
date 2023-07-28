import { createContext } from 'react';
import { useAuth } from './authentication.hook.js';

// our custom authentication context
export const AuthenticationContext = createContext({
	isLoggedIn: false,
	isLoading: true,
	error: null,
	currentUser: null,
	userType: null,
	subscriptionActive: true,
	membershipEndDate: null,
	login: async () => {},
	signInWithGoogle: async () => {},
	signInWitnFacebook: async () => {},
	register: async () => {},
	logout: async () => {}
});

// our authentication context provider object
export const AuthenticationContextProvider = ({ children }) => {
	const {
		isLoading,
		error,
		currentUser,
		userType,
		login,
		signInWithGoogle,
		signInWitnFacebook,
		register,
		logout,
		subscriptionActive,
		membershipEndDate,
		loginError,
		signUpError,
		resetLoginError,
		resetSignUpError
	} = useAuth();

	return (
		<AuthenticationContext.Provider
			value={{
				isLoggedIn: currentUser != null,
				isLoading: isLoading,
				error: error,
				currentUser: currentUser,
				userType: userType,
				login: login,
				signInWithGoogle: signInWithGoogle,
				signInWitnFacebook: signInWitnFacebook,
				register: register,
				logout: logout,
				subscriptionActive: subscriptionActive,
				membershipEndDate: membershipEndDate,
				loginError: loginError,
				signUpError: signUpError,
				resetLoginError: resetLoginError,
				resetSignUpError: resetSignUpError
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
