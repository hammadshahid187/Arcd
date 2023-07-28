import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import firebase from 'firebase';

const AccountLeftSideBar = ({
	history,
	accountView,
	setAccountView,
	handleLogoutError
}) => {
	const handleLogout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				history.push('/');
			})
			.catch((error) => {
				handleLogoutError();
			});
	};

	return (
		<div className='h-full w-full text-lg text-white'>
			<div className='h-full flex flex-col justify-between'>
				<div>
					<p className='pl-2.5 py-1 mb-5 font-sourceSansPro font-semibold text-2xl'>
						SETTINGS
					</p>
					<p
						className={
							'mb-1 pl-2.5 py-1 rounded-l-lg cursor-pointer ' +
							(accountView === 'profile' ? 'bg-white text-black' : '')
						}
						onClick={() => setAccountView('profile')}
					>
						Profile
					</p>
					<p
						className={
							'mb-1 pl-2.5 py-1 rounded-l-lg cursor-pointer ' +
							(accountView === 'settings' ? 'bg-white text-black' : '')
						}
						onClick={() => setAccountView('settings')}
					>
						Account Settings
					</p>
					<p
						className={
							'mb-1 pl-2.5 py-1 rounded-l-lg cursor-pointer ' +
							(accountView === 'notifications' ? 'bg-white text-black' : '')
						}
						onClick={() => setAccountView('notifications')}
					>
						Notifications
					</p>
				</div>
				<div className='pl-2.5 items-center'>
					<p
						className='mr-1 inline-block cursor-pointer'
						onClick={handleLogout}
					>
						Logout
						<span className='ml-1.5'>
							<LogoutIcon />
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AccountLeftSideBar;
