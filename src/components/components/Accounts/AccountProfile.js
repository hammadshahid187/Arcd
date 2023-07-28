import React, { useEffect, useRef, useState } from 'react';
import wavingHand from '../../../assets/waving-hand-apple.png';
import { usStatesArr } from './formOptions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageUploader from './ImageUploader';
import { db, firebaseApp } from '../../../config/Firebase';

const AccountProfile = ({
	user,
	name,
	address,
	city,
	state,
	postalCode,
	phone,
	image,
	edit,
	setEdit,
	userData,
	setUserData,
	handleFormChange,
	setImageError
}) => {
	const isMounted = useRef(false);
	const [imageFile, setImageFile] = useState(null);
	const [firstName, setFirstName] = useState('');

	useEffect(() => {
		if (name) {
			setFirstName(name.split(' ')[0]);
		}
	}, [name]);

	const getImageUrl = async (imageRef) => {
		imageRef.getDownloadURL().then(async (url) => {
			const isUserAvatarUpdated = async () => {
				await db
					.collection('users')
					.doc(user)
					.update({ ...userData, image: url })
					.then(() => {
						return true;
					})
					.catch((error) => {
						setImageError(true);
						return false;
					});
			};

			if (isUserAvatarUpdated) {
				setUserData({ ...userData, image: url });
			}
		});
	};

	useEffect(() => {
		if (isMounted.current) {
			const handleUpload = () => {
				if (imageFile) {
					const storageRef = firebaseApp.storage().ref('users');

					const imageRef = storageRef.child(user + '/' + imageFile.name);

					imageRef
						.put(imageFile)
						.then(() => {
							getImageUrl(imageRef);
						})
						.finally(() => {
							setImageFile(null);
						});
				}
			};

			handleUpload();
		} else {
			isMounted.current = true;
		}
	}, [imageFile]);

	return (
		<div className='h-full pt-7 px-4 lg:pl-4'>
			<h1 className='text-setting-header font-bold'>Profile</h1>
			{/* Profile Greeting */}
			<div className='flex relative'>
				{image ? (
					<img
						src={image}
						alt={name}
						className='h-24 w-24 my-4 mr-2.5 bg-cover border-user-img border-navy-blue rounded-full'
					/>
				) : (
					<AccountCircleIcon
						sx={{ fontSize: 100 }}
						className='h-24 my-4 mr-2.5 border-user-img border-navy-blue rounded-full '
					/>
				)}
				<ImageUploader setImageFile={setImageFile} />
				<div className='flex items-center'>
					<p className='text-xl font-semibold mr-2.5'>Hi {firstName}</p>
					<img
						src={wavingHand}
						alt='waving hand'
						className='h-hand-icon-h w-hand-icon-w'
					/>
				</div>
			</div>
			<div className='grid grid-cols-1 w-account-grid lg:w-full lg:grid-cols-2 lg:gap-x-4'>
				{/* Profile Name and Phone */}
				<div className='col-span-1'>
					<div className='flex items-end w-full'>
						<div className='flex flex-col w-full'>
							{/* Full Name */}
							<label htmlFor='name' className='mb-2 text-lg'>
								Full name
							</label>
							<div className='mb-4 flex items-center justify-between'>
								<input
									type='text'
									id='name'
									name='name'
									placeholder={name}
									className='px-1 mr-4 w-account-input border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
									onChange={handleFormChange}
									disabled={edit.name === false ? true : false}
								/>
								<p
									className='text-sm cursor-pointer text-arca-blue'
									onClick={
										!edit.name ? () => setEdit({ ...edit, name: true }) : null
									}
								>
									Edit
								</p>
							</div>
						</div>
					</div>
					<div className='flex items-end w-full'>
						<div className='flex flex-col w-full'>
							{/* Phone Number */}
							<label htmlFor='phone' className='mb-2 text-lg'>
								Phone number
							</label>
							<div className='mb-4 flex items-center'>
								<input
									type='tel'
									id='phone'
									name='phone'
									placeholder={phone ? phone : 'xxx-xxx-xxxx'}
									pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
									className='px-1 mr-4 w-account-input border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
									onChange={handleFormChange}
									disabled={edit.phone === false ? true : false}
								/>
								<p
									className='text-sm cursor-pointer text-arca-blue'
									onClick={
										!edit.phone ? () => setEdit({ ...edit, phone: true }) : null
									}
								>
									Edit
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='lg:col-start-2 col-span-1 flex flex-col justify-between'>
					{/* Profile Address */}
					<div>
						<div className='flex items-end w-full'>
							<div className='flex flex-col w-full'>
								{/* Street Address */}
								<label htmlFor='address' className='mb-2 text-lg'>
									Address
								</label>
								<div className='mb-4 flex items-center'>
									<input
										type='text'
										id='address'
										name='address'
										placeholder={address}
										className='px-1 mr-4 w-account-input border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
										onChange={handleFormChange}
										disabled={edit.address === false ? true : false}
									/>
									<p
										className='text-sm cursor-pointer text-arca-blue'
										onClick={
											!edit.address
												? () => setEdit({ ...edit, address: true })
												: null
										}
									>
										Edit
									</p>
								</div>
							</div>
						</div>
						<div className='flex items-end w-full'>
							<div className='flex flex-col w-full'>
								{/* City */}
								<label htmlFor='city' className='mb-2 text-lg'>
									City
								</label>
								<div className='mb-4 flex items-center'>
									<input
										type='text'
										id='city'
										name='city'
										placeholder={city}
										className='px-1 mr-4 w-account-input border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
										onChange={handleFormChange}
										disabled={edit.address === false ? true : false}
									/>
									<p
										className='text-sm cursor-pointer text-arca-blue'
										onClick={
											!edit.city
												? () => setEdit({ ...edit, address: true })
												: null
										}
									>
										Edit
									</p>
								</div>
							</div>
						</div>
						<div className='flex items-end'>
							<div className='flex flex-col'>
								{/* State */}
								<label htmlFor='state' className='mb-2 text-lg'>
									State
								</label>
								<div className='mb-4 flex items-center'>
									<select
										name='state'
										id='state'
										value={state}
										onChange={handleFormChange}
										className='px-1 mr-4 border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
										disabled={edit.address === false ? true : false}
									>
										{usStatesArr.map((usState, index) => (
											<option
												value={usState.abbreviation}
												key={index}
												className='text-lg'
											>
												{usState.abbreviation}
											</option>
										))}
									</select>
									<p
										className='text-sm cursor-pointer text-arca-blue'
										onClick={
											!edit.state
												? () => setEdit({ ...edit, address: true })
												: null
										}
									>
										Edit
									</p>
								</div>
							</div>
						</div>
						<div className='flex items-end w-full'>
							<div className='flex flex-col w-full'>
								{/* Postal Code */}
								<label htmlFor='postalCode' className='mb-2 text-lg'>
									Postal code
								</label>
								<div className='mb-4 flex items-center'>
									<input
										type='text'
										id='postalCode'
										name='postalCode'
										placeholder={postalCode}
										className='px-1 mr-4 w-account-input border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
										onChange={handleFormChange}
										disabled={edit.address === false ? true : false}
									/>
									<p
										className='text-sm cursor-pointer text-arca-blue'
										onClick={
											!edit.postalCode
												? () => setEdit({ ...edit, address: true })
												: null
										}
									>
										Edit
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountProfile;
