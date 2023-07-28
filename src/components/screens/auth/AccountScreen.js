import React, { Component, useState } from 'react';

class AccountScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1
		};
	}

	menuClick(number) {
		this.setState({ page: number });
	}

	render() {
		var { page } = this.state;
		const profile = (
			<div className='text-2xl'>
				<div className='grid grid-cols-2'>
					<div />
					<h1 className='pt-10 pb-5 font-bold text-3xl'>Profile</h1>
				</div>

				<hr className='  w-5/7 border-blue-800 pb-2' />
				<hr className=' pb-5 w-4/5 border-red-600 ' />
				<div className='grid grid-cols-2  pl-20 pr-80'>
					<div className=' w-64 space-y-6 pl-20'>
						<b onClick={() => this.menuClick(2)} className='font-lato text-2xl'>
							Account Settings
						</b>
						<br className='-mb-10' />
						<br /> <br /> <br /> <br />
						<b
							onClick={() => this.menuClick(3)}
							className='font-lato text-2xl '
						>
							Manage Subscription
						</b>
					</div>
					<div className='text-2xl'>
						<div className='px-1 font-lato '>Email Address</div>
						<input
							className='border-4 rounded-md w-500 h-30'
							placeholder='Katherinexu6@gmail.com'
						/>
						<div className='pt-5 font-lato'>Password</div>
						<input className='border-4 rounded-md' placeholder='**********' />
						<div className='pt-5 pb-5 '>
							<hr />
						</div>
						<p className='pb-3 -pl-56 font-lato'>
							Add New Brokerge With Plaid <span className='px-10'>Connect</span>
						</p>
						<p className='pb-3 -pl-56 mx- font-lato'>
							Unlink Current Brokerge <span className='px-20'>Disconnect</span>
						</p>
						<p className='pb-5 font-lato'>
							Next billing date is Aug 21, 2021
							<span className='px-7 text-blue-400 font-lato'>
								Cancel Membership
							</span>
						</p>
						<hr className='pt-' />
						<h4 className='pt-5 b-3 font-semibold text-xl'>
							Terminate Account
						</h4>
						<button className=' bg-blue-500 text-white rounded-full pl-5 pr-5  pt-2 pb-2 ml-60 mt-20 '>
							Save Changes
						</button>
					</div>
					<div className='border-l-4 ml-80  -mb-20 -mt-80 ' />
				</div>
			</div>
		);

		// This is one a try for alert it display a button after clicking button it shows a pop-up alert, but it's not enough

		// const alertCancel = (
		// 	<Popup trigger={<button> Trigger</button>} position="right center">
		// 		<div>Popup content here !!</div>
		// 	</Popup>
		// )

		// This is another try for alert, it's better but not how it should be!

		const cancelAlert = (
			<div
				className='fixed z-10 inset-0 overflow-y-auto'
				aria-labelledby='modal-title'
				role='dialog'
				aria-modal='true'
			>
				<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<div
						className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
						aria-hidden='true'
					/>

					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>

					<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
						<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
							<div className='sm:flex sm:items-start'>
								<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10' />
								<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
									<h3
										className='text-lg leading-6 font-medium text-gray-900'
										id='modal-title'
									>
										Would you like to delete your account?
									</h3>
									<div className='mt-2'>
										<p className='text-sm text-gray-500'>
											Deleting your account will remove all information and
											content.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
							<button
								type='button'
								className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
							>
								Yes, delete my account!
							</button>
						</div>
					</div>
				</div>
			</div>
		);
		const handleForgotPassword = () => {
			return (
				<div>
					<h1>Forgat Password?</h1>
				</div>
			);
		};
		const accountSettings = (
			<>
				<h1 className='pl-80 text-3xl'>Account Settings</h1>
				<hr className='  w-5/7 border-blue-800 pb-2' />
				<hr className=' pb-5 w-4/5 border-red-600 ' />
				<div className=' pl-80 font-lato text-2xl'>
					<div>Email Address</div>
					<input
						className='border-4 rounded-md'
						placeholder='Katherinexu6@gmail.com'
					/>
					<div>&nbsp;</div>
					<div>&nbsp;</div>

					<div>Password</div>
					<input className='border-4 rounded-md' placeholder='**************' />

					{/* This button for FORGOT PASSWORD! the page for the forgot password is ready. For using this button just uncomment the line 93!*/}
					{/* <button onClick={() => this.menuClick(4)} id="resetButton">Forgot Password?</button> */}

					<hr id='hr3' />
					<a>
						<h5 className='pt-10'>Go Premium </h5>
					</a>
					<p id='settingsTest'>
						Link New Brokerge With Plaid <span id='connectSpan'>Connect</span>
					</p>
					<br />
					<hr id='hr3' />
					<br />
					<div id='terminate'>Terminate Account</div>
					<button
						onClick={() => this.setShow(false)}
						className=' bg-blue-500 text-white rounded-full pl-5 pr-5  pt-2 pb-2 ml-60 mt-20 '
					>
						Save Changes
					</button>
				</div>
			</>
		);

		const notifications = (
			<div>
				<h1>Notifications</h1>
				<hr id='hr1' />
				<hr id='hr2' />
				<div>
					<b>Weekly newsletter</b>
				</div>
				<div>&nbsp;</div>
				<div>&nbsp;</div>
				<div>
					A small text about what the newsletters might contain
					<input type='checkbox' />
				</div>
				<div>&nbsp;</div>
				<div>&nbsp;</div>
				<span />
				<span>
					<b>Account Summary</b>
				</span>
				<div>&nbsp;</div>
				<div>&nbsp;</div>
				<div>
					A small text about what the newsletters might contain
					<input type='checkbox' />
				</div>
				<div>&nbsp;</div>
				<div>&nbsp;</div>
				<span />

				<div />
				<button className='saveChanges'>Save Changes</button>
			</div>
		);
		const forgotPassword = (
			<div className='forgotPassword'>
				<h1>Forgot Password?</h1>
				<p id='forgotText'>
					Enter the email address associated <br /> with this account to reset
					your password
				</p>
				<br />
				<input id='forgotInput' placeholder='Email' />
				<br />
				<br />
				<button id='forgotButton'>Reset Password</button>
				<br />
				{/* <img id="forgotLogo" src="logo.png"></img> */}
			</div>
		);
		return (
			<div className=''>
				<div className='header'>
					<nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-white-500 mb-3'>
						<a className='' href='#pablo'>
							<img className='-inset-x-20 h-1/3 w-1/3' src="logo.png" />
						</a>
						<a className='ml-40'>MY STOCKS</a>
						<a className='mr-20'>NEWS</a>
						<button
							className=' -ml-20 px-300 py-1 border border-solid border-white'
							type='button'
						>
							<img className='melogo' src="me.png" />
						</button>
					</nav>
				</div>
				<div className='content'>
					<div className='profileContent'>
						{page == 1 ? profile : null}
						{page == 2 ? accountSettings : null}
						{page == 3 ? notifications : null}
						{page == 4 ? forgotPassword : null}
						{page == 5 ? cancelAlert : null}
					</div>
				</div>
			</div>
		);
	}
}

export default AccountScreen;
