import React, { useEffect, useState } from 'react';
import AccountForm from '../../components/Accounts/AccountForm';
import AccountTabs from '../../components/Accounts/AccountTabs';
import AccountLeftSideBar from '../../components/Accounts/AccountLeftSideBar';
import Navbar from '../../components/Navbar';
import firebase from 'firebase';
import { db } from '../../../config/Firebase';

const AccountsScreen = ({ history }) => {
	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [accountView, setAccountView] = useState('profile');
	const [userData, setUserData] = useState({});
	const [isOpen, setIsOpen] = useState(false);
	const [logoutError, setLogoutError] = useState(false);

	const handleLogoutError = () => {
		setLogoutError(true);

		setTimeout(() => {
			setLogoutError(false);
		}, 3000);
	};

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async function (user) {
			if (user) {
				setUser(user.uid);
				setEmail(user.email);
				const doc = await db.collection('users').doc(user.uid).get();

				setUserData(doc.data());
			} else {
				history.push('/');
				// No user is signed in.
			}
		});
	}, [history]);

	return (
		<div>
			{/* Navbar */}
			<Navbar history={history} />

			{/* Page Content */}
			<div className='container min-h-[37.375rem] max-w-[1024px] mt-8 mx-auto bg-[#fcfcfc] border border-[#dcdcdc] sm:rounded-3xl'>
				{/* Mobile Account Tabs */}
				<div className='bg-[#122f89] sm:rounded-t-lg md:hidden'>
					<AccountTabs
						accountView={accountView}
						setAccountView={setAccountView}
						history={history}
						handleLogoutError={handleLogoutError}
					/>
				</div>
				<div className='h-full p-4 sm:p-5'>
					<div className='md:grid grid-cols-3 md:gap-x-5 h-full'>
						{/* Account Left Sidebar */}
						<div className='h-full md:col-span-1 hidden pl-4 py-4 md:block bg-[#122f89] rounded-xl'>
							<AccountLeftSideBar
								history={history}
								profile={false}
								accountView={accountView}
								setAccountView={setAccountView}
								handleLogoutError={handleLogoutError}
							/>
						</div>

						{/* Account Form */}
						<AccountForm
							email={email}
							accountView={accountView}
							user={user}
							userData={userData}
							setUserData={setUserData}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							logoutError={logoutError}
							history={history}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountsScreen;
