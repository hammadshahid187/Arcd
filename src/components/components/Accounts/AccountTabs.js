import React from 'react';
import firebase from 'firebase';

const AccountTabs = ({
	accountView,
	setAccountView,
	history,
	handleLogoutError
}) => {
	const handleLogout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				// Sign-out successful.
				history.push('/');
			})
			.catch((error) => {
				// An error happened.
				handleLogoutError();
			});
	};

	return (
		<div className='w-full grid grid-cols-4 place-items-center sm:rounded-t-lg'>
			<div
				className={
					'w-full py-3 text-center cursor-pointer sm:rounded-tl-lg ' +
					(accountView === 'profile' ? 'bg-white text-black' : 'text-white')
				}
				onClick={() => setAccountView('profile')}
			>
				<p>Profile</p>
			</div>
			<div
				className={
					'w-full py-3 text-center cursor-pointer sm:rounded-tl-lg ' +
					(accountView === 'settings' ? 'bg-white text-black' : 'text-white')
				}
				onClick={() => setAccountView('settings')}
			>
				<p>Settings</p>
			</div>
			<div
				className={
					'w-full py-3 text-center cursor-pointer sm:rounded-tl-lg ' +
					(accountView === 'notifications'
						? 'bg-white text-black'
						: 'text-white')
				}
				onClick={() => setAccountView('notifications')}
			>
				<p>Notifications</p>
			</div>
			<div className='w-full text-white text-center cursor-pointer'>
				<p className='mr-1 items-center' onClick={handleLogout}>
					Logout
				</p>
			</div>
		</div>
	);
};

export default AccountTabs;
