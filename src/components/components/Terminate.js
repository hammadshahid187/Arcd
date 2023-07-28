import { useContext, useState } from 'react';
import { auth, db } from '../../config/Firebase';
import firebase from 'firebase';
import { AuthenticationContext } from '../../services/authentication/authentication.context';

const Terminate = () => {
	const [isOpen, setOpen] = useState(false);
	const [userEmail, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { currentUser, userType, logout } = useContext(AuthenticationContext);

	const verify = async () => {
		try {
			var credential = firebase.auth.EmailAuthProvider.credential(
				userEmail,
				password
			);

			await currentUser.reauthenticateWithCredential(credential);

			await db.collection('users').doc(currentUser.uid).delete();

			await auth.currentUser.delete();
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className='terminate mt-8'>
			{isOpen && (
				<div className='modal'>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50'>
						<div className='relative w-auto my-6 mx-auto max-w-3xl'>
							{/*Background overlay*/}
							<div
								className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
								aria-hidden='true'
							/>

							{/*Center contents*/}
							<span
								className='hidden sm:inline-block sm:align-middle sm:h-screen'
								aria-hidden='true'
							>
								&#8203;
							</span>

							{/*Content*/}
							<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
								<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
											{/*Title*/}
											<h3
												className='text-lg font-semibold leading-6 text-center font-medium'
												id='modal-title'
											>
												Would you like to delete your account?
											</h3>

											{/*Text*/}
											<div className='mt-2'>
												<p className='text-center text-gray-500'>
													{' '}
													Deleting your account will remove all your <br />
													information and data.
												</p>
											</div>

											{/*Form*/}

											<div className='mt-2'>
												<input
													placeholder='Email'
													type='email'
													className='w-full pl-2 py-2 border rounded-lg border-gray-200'
													onChange={(e) => setEmail(e.target.value)}
													value={userEmail}
												/>
											</div>

											<div className='mt-2'>
												<input
													placeholder='Password'
													type='password'
													className='w-full pl-2 py-2 border rounded-lg border-gray-200'
													onChange={(e) => setPassword(e.target.value)}
													value={password}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className='justify-center bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
									<button
										onClick={verify}
										type='button'
										className='w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
									>
										Delete My Account
									</button>
									<button
										onClick={() => setOpen(false)}
										type='button'
										className='mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<button
				onClick={() => setOpen(true)}
				className='font-semibold text-arca-red text-base'
			>
				Terminate Account
			</button>
		</div>
	);
};

export default Terminate;
