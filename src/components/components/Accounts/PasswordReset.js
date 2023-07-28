import React from 'react';
import firebase from 'firebase';

const PasswordReset = ({ email, setIsOpen, setResetError }) => {
	const handleReset = () => {
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				// Password reset email sent
				setIsOpen(false);
			})
			.catch((error) => {
				console.log(error.code, error.message);
				setResetError(true);
			});
	};

	return (
		<div className=''>
			<div className='modal'>
				<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50'>
					<div className='relative w-auto my-6 mx-auto max-w-3xl'>
						{/*Background overlay*/}
						<div
							className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center items-center'
							aria-hidden='true'
						>
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
												Would you like to reset your password?
											</h3>

											{/*Text*/}
											<div className='mt-2'>
												<p className='text-center text-gray-500'>
													An email will be sent to {email} to reset your
													password.
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Buttons */}
								<div className='justify-center bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
									<button
										onClick={handleReset}
										type='button'
										className='w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
									>
										Reset My Password
									</button>
									<button
										onClick={() => setIsOpen(false)}
										type='button'
										className='mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PasswordReset;
