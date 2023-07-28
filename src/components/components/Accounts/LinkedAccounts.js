import React, { useContext } from 'react';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { PlaidContext } from '../../../services/Plaid/Plaid.context';
import AccountLink from './AccountLink';
import firebase from 'firebase';
import { db } from '../../../config/Firebase';
import moment from 'moment';

function LinkedAccounts({ history }) {
	const { secondaryAccessTokens, setSecondaryAccessTokens, accounts } =
		useContext(PlaidContext);
	const { currentUser, userType, subscriptionActive, membershipEndDate } =
		useContext(AuthenticationContext);

	const disconnectAccountSecondary = async (account) => {
		// const FieldValue = firebase.firestore.FieldValue;
		try {
			setSecondaryAccessTokens(
				secondaryAccessTokens.filter((token) => token !== account.accessToken)
			);
			db.collection('users')
				.doc(currentUser.uid)
				.collection('access_tokens')
				.doc(account.accessToken)
				.delete()
				.then(() => {
					window.location.reload();
				});
			// reload the page
		} catch (err) {
			console.log(err);
		}
	};

	const cancelMembership = async () => {
		try {
			const functionRef = firebase
				.app()
				.functions('us-central1')
				.httpsCallable('cancelSubscription');
			const result = await functionRef();

			console.log('cancel', result);
			window.location.reload();
		} catch (error) {
			console.log('cancel', error);
		}
	};

	return (
		<div className='accountType'>
			{userType && userType === 'Basic' ? (
				<div className='flex space-x-5 items-center'>
					<div>Account Type: Basic</div>
					<div
						className='cursor-pointer border-2 border-arca-blue px-4 py-1 rounded-md text-arca-blue hover:bg-arca-blue hover:text-white'
						onClick={() => {
							history.push('/premium');
						}}
					>
						Go Premium
					</div>
				</div>
			) : (
				<div>
					<p className='text-premium py-2'>Account Type: Premium</p>
					<p className='font-semibold text-lg'>Linked Accounts</p>

					{accounts.size > 0 ? (
						Array.from(accounts).map((account, index) => {
							return (
								<div key={index} className='my-2'>
									{
										// show only 10 chars from last of account.account_id
										// account.account_id.substring(account.account_id.length - 10)
									}
									<button onClick={() => disconnectAccountSecondary(account)}>
										****
										{account.account_id.substring(
											account.account_id.length - 4
										)}{' '}
										&nbsp; Unlink Brokerage
									</button>
								</div>
							);
						})
					) : (
						<></>
					)}
					<div className='flex space-x-4'>
						<p>Link New Brokerage With Plaid</p>
						<AccountLink />
					</div>

					<div
						className={
							'cursor-pointer mt-3 ' +
							(subscriptionActive ? 'text-arca-blue' : 'text-gray-500')
						}
						onClick={() => {}}
					>
						<button onClick={cancelMembership} disabled={!subscriptionActive}>
							Cancel Membership
						</button>
						{subscriptionActive ? (
							''
						) : (
							<div className='text-xs text-gray-500'>
								{'Your membership will expire on ' +
									moment.unix(membershipEndDate).toDate().toLocaleDateString()}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default LinkedAccounts;
