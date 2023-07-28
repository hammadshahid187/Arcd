import Terminate from '../Terminate';
import {
	householdIncomeArr,
	investingExperienceArr,
	investorTypeArr
} from './formOptions';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PasswordReset from './PasswordReset';
import LinkedAccounts from './LinkedAccounts';

const AccountSettings = ({
	email,
	password,
	householdIncome,
	investingExperience,
	investorType,
	riskPreference,
	handleFormChange,
	edit,
	setEdit,
	isOpen,
	setIsOpen,
	setResetError,
	history
}) => {
	return (
		<div className='h-full pt-7 px-4 lg:pl-4'>
			<div className='mb-4 flex items-center'>
				<div className='md:flex md:items-center'>
					<h1 className='mr-2.5 text-setting-header font-bold'>
						Account Settings
					</h1>
					<p
						className='text-sm cursor-pointer text-arca-blue'
						onClick={
							!edit.accountSettings
								? () => setEdit({ ...edit, accountSettings: true })
								: null
						}
					>
						Edit
					</p>
				</div>
			</div>
			<div className='pt-4 w-account-grid lg:w-full grid lg:grid-cols-2 lg:gap-x-4'>
				<div className='col-span-1 lg:col-start-1 mb-6'>
					{/* Account Info */}
					<div className='mb-4 flex flex-col'>
						{/* Email */}
						<label htmlFor='email' className='mb-2 text-lg'>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder={email}
							className='px-1 mr-4 w-account-input border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
							disabled={true}
						/>
					</div>
					<div className='mb-6 flex flex-col'>
						{/* Password */}
						<label htmlFor='password' className='mb-2 text-lg'>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							defaultValue={password ? password : 'password'}
							className='px-1 mr-4 w-account-input mb-2.5 border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
							onChange={handleFormChange}
							disabled
						/>
						<p
							onClick={() => setIsOpen(true)}
							className='text-sm cursor-pointer text-arca-blue'
						>
							Reset
						</p>
						{isOpen && (
							<PasswordReset
								email={email}
								setIsOpen={setIsOpen}
								setResetError={setResetError}
							/>
						)}
					</div>
					{/*Divider*/}
					<div className='pb-3'>
						<div className='h-px w-56 bg-gray-100'></div>
					</div>
					<LinkedAccounts history={history} />
					{/*Divider*/}
					<div className='pt-3'>
						<div className='h-px w-56 bg-gray-100'></div>
					</div>
					<Terminate />
				</div>
				<div className='col-span-1 lg:col-start-2 mb-4'>
					{/* Financial Info */}
					<h3 className='mb-2 text-lg'>Financial Situation</h3>
					{/* Household Income */}
					<select
						name='householdIncome'
						id='householdIncome'
						onChange={handleFormChange}
						className='w-account-input md:w-full px-1 py-0.5 mr-4 mb-4 border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
						disabled={edit.accountSettings === false ? true : false}
					>
						{householdIncome ? (
							<option disabled selected className='text-lg text-text-gray'>
								{householdIncome}
							</option>
						) : (
							<option
								disabled
								selected
								hidden
								className='text-lg text-text-gray'
							>
								Household Income
							</option>
						)}
						{householdIncomeArr.map((income, index) => (
							<option
								value={income}
								key={index}
								className='text-lg text-text-gray'
							>
								{income}
							</option>
						))}
					</select>
					{/* Investing Experience */}
					<select
						name='investingExperience'
						id='investingExperience'
						onChange={handleFormChange}
						className='w-account-input md:w-full px-1 py-0.5 mr-4 mb-4 border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
						disabled={edit.accountSettings === false ? true : false}
					>
						{investingExperience ? (
							<option disabled selected className='text-lg text-text-gray'>
								{investingExperience}
							</option>
						) : (
							<option
								disabled
								selected
								hidden
								className='text-lg text-text-gray'
							>
								Investing Experience
							</option>
						)}
						{investingExperienceArr.map((experience, index) => (
							<option
								value={experience}
								key={index}
								className='text-lg text-text-gray'
							>
								{experience}
							</option>
						))}
					</select>
					{/* Investor Type */}
					<select
						name='investorType'
						id='investorType'
						onChange={handleFormChange}
						className='w-account-input md:w-full px-1 py-0.5 mr-4 mb-4 border-2 border-light-gray rounded-lg text-lg placeholder:text-text-gray'
						disabled={edit.accountSettings === false ? true : false}
					>
						{investorType ? (
							<option disabled selected className='text-lg text-text-gray'>
								{investorType}
							</option>
						) : (
							<option
								disabled
								selected
								hidden
								className='text-lg text-text-gray'
							>
								Investor Type
							</option>
						)}
						{investorTypeArr.map((type, index) => (
							<option
								value={type}
								key={index}
								className='text-lg text-text-gray'
							>
								{type}
							</option>
						))}
					</select>
					<div>
						{/* Risk Preference */}
						<h4 className='mb-1 text-lg'>Risk Preference</h4>
						<Box sx={{ width: 250, paddingLeft: 2 }}>
							<Slider
								id='riskPreference'
								name='riskPreference'
								size='small'
								value={riskPreference}
								aria-label='risk preference'
								valueLabelDisplay='auto'
								onChange={handleFormChange}
								disabled={edit.accountSettings === false ? true : false}
							/>
						</Box>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
