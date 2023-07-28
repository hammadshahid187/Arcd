import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import CloseIcon from '@mui/icons-material/Close';

const SignUp = (props) => {
	const [checked, setChecked] = useState(true);
	const {
		register,
		currentUser,
		signUpError,
		signInWithGoogle,
		signInWitnFacebook
	} = useContext(AuthenticationContext);
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	const closeSignUp = (e) => {
		if (e.target.classList.contains('popOuter')) {
			props.closeSignUp();
		}
	};

	const onClickLogIn = (e) => {
		props.logInHandler();
	};

	//var daEmail;
	//daEmail = props.match.params.email ? props.match.params.email : "";
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState(props.email ? props.email : "");
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		// if currenUser exists, navigate the user to the news screen
		if (currentUser) {
			props.history.push('/news');
		}
	}, [currentUser]);

	const registerBtnHandler = async (e) => {
		e.preventDefault();
		document.body.style.overflow = 'unset';
		await register(
			firstName + ' ' + lastName,
			email,
			password,
			confirmPassword
		);
	};

	return (
		<div
			className='popOuter fixed top-0 left-0 w-full h-full min-h-screen z-10 bg-black/[0.38]'
			onClick={closeSignUp}
		>
			<form
				onSubmit={registerBtnHandler}
				className='w-screen top-[3vh] left-0 fixed h-[85vh] md:h-[92vh] overflow-x-hidden overflow-auto md:top-[4vh] left-[50%] -translate-x-1/2 w-full max-w-[538px] z-[100] border px-[54px] pt-[30px] pb-[30px] rounded-xl border-gray-50 bg-[#F5F5F5] shadow mobile-height'
			>
				<CloseIcon
					className='absolute top-3 right-3'
					color='disabled'
					onClick={() => props.closeSignUp()}
				/>

				<div className='flex justify-center mb-[40px]'>
					<img src='/arcafeed.png' alt='ARCAFEED' width={201} />
				</div>

				<div className='text-left space-y-[20px]'>
					<div className='flex flex-col sm:flex-row justify-center'>
						<input
							className='focus:outline-none border-gray-300 focus:border-arca-blue p-2 mr-2 mb-[20px] sm:mb-[unset] w-full border rounded-lg'
							type='text'
							id='firstName'
							placeholder='First Name'
							required
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<input
							className='focus:outline-none focus:border-arca-blue p-2 w-full border rounded-lg border-gray-300'
							type='text'
							id='lastName'
							placeholder='Last Name'
							required
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>

					<input
						type='text'
						required
						id='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='focus:outline-none focus:border-arca-blue p-2 w-full border rounded-lg border-gray-300'
					/>

					<input
						type='password'
						required
						id='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='focus:outline-none focus:border-arca-blue p-2 w-full border rounded-lg border-gray-300'
					/>

					<input
						type='password'
						required
						id='confirmpassword'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className='focus:outline-none focus:border-arca-blue p-2 w-full border rounded-lg border-gray-300'
					/>

					<div className='w-80 text-left text-arca-red space-y-6'>
						{/* {error && `Invalid Email or Password. Please try again.`} */}
						{signUpError}
					</div>
				</div>

				<div className='w-80 mt-4 mb-[30px] py-2 rounded-lg grid grid-cols-10'>
					<Checkbox
						className='col-span-1'
						checked={checked}
						onChange={handleChange}
						required={true}
						style={{ padding: '0', margin: '0 14px 0 0' }}
					/>
					<p className='col-span-6 font-Inter text-sm'>
						I agree to Arcafeed's{' '}
						<Link
							target='_blank'
							className='text-arca-blue underline'
							to='/privacy-policy'
						>
							{' '}
							Privacy Policy{' '}
						</Link>{' '}
						and{' '}
						<a
							target='_blank'
							className='text-arca-blue underline'
							href='/terms'
						>
							{' '}
							Terms of Service{' '}
						</a>
					</p>
				</div>

				<button
					type='submit'
					className='font-semibold text-xl border px-3 py-2 rounded-lg bg-arca-red w-full text-white'
				>
					Create Account
				</button>
				<div className='py-[10px] md:py-[15px] text-center'>Or</div>
				<button
					onClick={signInWithGoogle}
					type='button'
					className='font-Inter mb-3.5 w-full py-[8px] flex justify-center items-center border border-arca-blue rounded-lg'
				>
					<img src='logo_google.png' alt='Google' />
					<span className='text-lg ml-[10px]'>Sign Up with Google</span>
				</button>
				<button
					onClick={signInWitnFacebook}
					type='button'
					className='font-Inter mb-3.5 w-full py-[8px] flex justify-center items-center border border-arca-blue rounded-lg'
				>
					<img src='logo_facebook.png' alt='Facebook' />
					<span className='text-lg ml-[10px] text-arca-blue'>
						Sign Up with Facebook
					</span>
				</button>
				<div className='flex text-sm justify-center items-center font-Inter'>
					<span>Already have an account?</span>
					<button
						type='button'
						className='text-arca-blue ml-1.5'
						onClick={onClickLogIn}
					>
						Log in
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
