import React, { useEffect, useState } from 'react';
import { db } from '../../../config/Firebase';
import AccountNotifications from '../../components/Accounts/AccountNotifications';
import AccountProfile from '../../components/Accounts/AccountProfile';
import AccountSettings from '../../components/Accounts/AccountSettings';
import CircularProgress from '@mui/material/CircularProgress';
import { ImageError, LogoutError, ResetError, SaveError } from './ErrorMsgs';

const AccountForm = ({
	email,
	accountView,
	user,
	userData,
	setUserData,
	isOpen,
	setIsOpen,
	logoutError,
	history
}) => {
	const [isSaving, setIsSaving] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [resetError, setResetError] = useState(false);
	const [saveError, setSaveError] = useState(false);
	const [edit, setEdit] = useState({
		name: false,
		phone: false,
		address: false,
		accountSettings: false
	});

	const handleFormChange = (e) => {
		setUserData({
			...userData,
			[e.target.name]:
				e.target.type === 'checkbox' ? e.target.checked : e.target.value
		});
	};

	const updateUserStore = async () => {
		const userRef = db.collection('users').doc(user);

		userRef
			.update(userData)
			.then(() => {
				// Document successfully updated!
				setEdit({
					name: false,
					phone: false,
					address: false,
					accountSettings: false
				});

				setIsSaving(false);
			})
			.catch((error) => {
				console.error('Error updating document: ', error);
				setSaveError(true);
			});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		setIsSaving(true);

		updateUserStore();
	};

	// Disable scroll when overlay is active
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'unset';
	}, [isOpen]);

	return (
		<form onSubmit={handleFormSubmit} className='col-span-2'>
			<div className='h-5'>
				{imageError && <ImageError />}
				{logoutError && <LogoutError />}
				{resetError && <ResetError />}
				{saveError && <SaveError />}
			</div>
			<div className='min-h-account-form sm:flex lg:flex-none sm:flex-col sm:items-center lg:items-start'>
				{accountView === 'profile' && (
					<AccountProfile
						{...userData}
						user={user}
						edit={edit}
						setEdit={setEdit}
						userData={userData}
						setUserData={setUserData}
						handleFormChange={handleFormChange}
						setImageError={setImageError}
					/>
				)}

				{accountView === 'settings' && (
					<AccountSettings
						{...userData}
						email={email}
						handleFormChange={handleFormChange}
						edit={edit}
						setEdit={setEdit}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						setResetError={setResetError}
						history={history}
					/>
				)}

				{accountView === 'notifications' && (
					<AccountNotifications
						{...userData}
						handleFormChange={handleFormChange}
					/>
				)}
			</div>
			<div className='flex justify-center lg:justify-end items-center lg:mr-6'>
				<button
					type='submit'
					className='my-4 px-20 py-2 w-account-save-btn bg-navy-blue rounded-md text-white cursor-pointer'
				>
					{isSaving ? (
						<CircularProgress color='inherit' size='15px' thickness={6} />
					) : (
						'Save Changes'
					)}
				</button>
			</div>
		</form>
	);
};

export default AccountForm;
