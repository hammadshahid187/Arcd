import { useCallback, useEffect, useState } from 'react';
import {
	auth,
	db,
	googleProvider,
	FacebookProvider
} from '../../config/Firebase.js';
import moment from 'moment';

import ReactGA from 'react-ga';

const TRACKING_ID = 'UA-185964762-1';
// our authentication hook
export const useAuth = () => {
	ReactGA.initialize(TRACKING_ID);

	const [isLoading, setIsLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState();
	const [userType, setUserType] = useState(null);
	const [error, setError] = useState(null);
	const [loginError, setLoginError] = useState(null);
	const [signUpError, setSignUpError] = useState(null);
	const [subscriptionActive, setSubscriptionActive] = useState(false);
	const [membershipEndDate, setMembershipEndDate] = useState();

	useEffect(async () => {
		// setCurrentUser(auth.currentUser);
		auth.onAuthStateChanged(async (fUser) => {
			if (fUser) {
				setCurrentUser(fUser);

				// set user type
				await fetchUserType();
				setIsLoading(false);
			} else {
				// console.log("there is no user signed in");
				setCurrentUser(null);
				setIsLoading(false);
			}
		});
	});

	useEffect(() => {
		// fetch user type if current user exist but usertype is not defined
		if (currentUser && !userType) {
			async function GUT() {
				await fetchUserType();
			}
			GUT();
		}
	}, [currentUser]);

	const resetLoginError = () => {
		setLoginError(null);
	};

	const resetSignUpError = () => {
		setSignUpError(null);
	};

	const login = useCallback(async (email, password) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				setCurrentUser(response.user);
			})
			.catch((e) => {
				setLoginError(e.toString());
			});
	}, []);

	const signInWithGoogle = useCallback(async () => {
		auth
			.signInWithPopup(googleProvider)
			.then((res) => {
				const fUser = res.user;
				const name = res.user.displayName;
				const email = res.user.email;

				storeUserInDB(fUser, name, email);
				setCurrentUser(res.user);
			})
			.catch((e) => {
				setLoginError(e.toString());
			});
	}, []);

	const signInWitnFacebook = useCallback(async () => {
		auth
			.signInWithPopup(FacebookProvider)
			.then((res) => {
				const fUser = res.user;
				const name = res.user.displayName;
				const email = res.user.email;

				storeUserInDB(fUser, name, email);
				setCurrentUser(res.user);
			})
			.catch((e) => {
				setLoginError(e.toString());
			});
	}, []);

	const register = useCallback(
		async (name, email, password, repeatedPassword) => {
			//setIsLoading(true);
			if (password !== repeatedPassword) {
				setSignUpError('Passwords do not match.');
				return;
			}
			try {
				const fUser = await auth.createUserWithEmailAndPassword(
					email,
					password
				);
				await storeUserInDB(fUser.user, name, email);
				ReactGA.event({
					category: 'Users',
					action: 'Created an Account',
					label: 'Account Created'
				});
				//setIsLoading(false);
			} catch (e) {
				//setIsLoading(false);
				setSignUpError(e.toString());
			}
		}
	);

	// stores user info in the db during registration
	const storeUserInDB = async (fUser, name, email) => {
		const userObj = {
			name: name,
			uid: fUser.uid,
			email: email,
			type: 'Basic',
			userCreatedAt: moment().unix()
		};

		try {
			// Check for existing user in Firestore
			const existingUsers = await db.collection('users').doc(fUser.uid).get();

			if (existingUsers.exists) {
				await fetchUserType();
			} else {
				await db.collection('users').doc(fUser.uid).set(userObj);
				await fetchUserType();
			}
		} catch (e) {
			console.log(`error in storeUserInDB:${e}`);
		}
	};

	const logout = useCallback(async () => {
		setIsLoading(true);
		setUserType(null);
		setError(null);
		await auth.signOut();
		setIsLoading(false);
	}, []);

	const ifSubscriptionValid = (subscriptionsEndAt) => {
		const currentTime = moment().unix();
		if (subscriptionsEndAt - currentTime > 0) {
			setUserType('Premium');
		} else {
			setUserType('Basic');
		}
	};

	// gets user type from brower local storage or firebase service
	const fetchUserType = async () => {
		// if user type is not on local store check firebase
		if (currentUser) {
			try {
				const userData = await db
					.collection('users')
					.doc(currentUser.uid)
					.collection('subscriptions')
					.get();
				if (userData.size < 1) {
					ifSubscriptionValid(0);
					return;
				}

				const data = userData.docs[userData.size - 1].data();
				if (data) {
					ifSubscriptionValid(data.current_period_end.seconds);
					setMembershipEndDate(data.current_period_end.seconds);
					setSubscriptionActive(data.canceled_at === null ? true : false);
				} else {
					ifSubscriptionValid(0);
				}
			} catch (e) {
				console.log(`Error in 
        : ${e}`);
				setError('Something went wrong. Please try again!');
			}
		} else {
			setError('Something went wrong. Please try again!');
		}
	};

	return {
		isLoading,
		error,
		currentUser,
		userType,
		login,
		signInWithGoogle,
		signInWitnFacebook,
		register,
		logout,
		fetchUserType,
		subscriptionActive,
		membershipEndDate,
		loginError,
		signUpError,
		resetLoginError,
		resetSignUpError
	};
};
