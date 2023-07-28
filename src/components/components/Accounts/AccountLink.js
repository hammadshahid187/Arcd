import React, { useContext, useEffect, useCallback, useState } from 'react';

import { PlaidLink } from 'react-plaid-link';
import { PlaidContext } from '../../../services/Plaid/Plaid.context';
import { AuthenticationContext } from '../../../services/authentication/authentication.context.js';

const AccountLink = ({ text }) => {
	const [uid, setUid] = useState(null);
	const [secondaryToken, setSecondaryToken] = useState(null);
	const { token, secondaryAccessTokens, setSecondaryAccessTokens, onSuccess } =
		useContext(PlaidContext);

	const { currentUser } = useContext(AuthenticationContext);

	useEffect(() => {
		if (currentUser) {
			setUid(currentUser.uid);
		}
	}, [currentUser, uid]);

	const onExit = () => {};

	const onEvent = () => {};

	useEffect(() => {
		console.log('plaid u', uid);
	}, [uid]);

	const secondarySuccess = useCallback(async (public_token) => {
		console.log('plaid heeere', uid);
		setSecondaryToken(public_token);
	}, []);

	return (
		<>
			<PlaidLink
				className='-mt-2 -mb-2 -ml-1'
				style={
					text
						? { padding: '20px', fontSize: '16px', cursor: 'pointer' }
						: { borderWidth: 0 }
				}
				token={token ? token : ''}
				onExit={onExit}
				onSuccess={onSuccess}
				onEvent={onEvent}
			>
				<span className='text-md text-arca-blue'>
					{text ? text : 'Connect'}
				</span>
			</PlaidLink>
		</>
	);
};

export default AccountLink;
