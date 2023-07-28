import React from 'react';
import Switch from '@mui/material/Switch';

const AccountNotifications = ({
	accountSummary,
	newsletter,
	handleFormChange
}) => {
	return (
		<div className='h-full pt-7 px-4 lg:pl-4'>
			<h1 className='text-[34px] font-bold'>Notifications</h1>
			<div className='pt-4 md:grid lg:grid-cols-2 lg:gap-x-4'>
				{/* Newsletter */}
				<div className='col-span-1 col-start-1'>
					<h3 className='mb-2.5 font-semibold'>Weekly Newsletter</h3>
					<div className='mb-4 flex justify-between items-end'>
						<p>A small text of what the newsletter might contain.</p>
						<Switch
							checked={newsletter}
							inputProps={{ 'aria-label': 'newsletter', name: 'newsletter' }}
							onChange={handleFormChange}
						/>
					</div>
				</div>
				{/* Account Summary */}
				<div className='col-span-1 col-start-1'>
					<h3 className='mb-2.5 font-semibold'>Account Summary</h3>
					<div className='mb-4 flex justify-between items-end'>
						<p>A small text of what the account summary might contain.</p>
						<Switch
							checked={accountSummary}
							inputProps={{
								'aria-label': 'accountSummary',
								name: 'accountSummary'
							}}
							onChange={handleFormChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountNotifications;
