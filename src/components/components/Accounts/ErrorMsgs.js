export const ImageError = () => {
	return (
		<p className='text-center text-sm text-red-600'>
			There was an error saving your image
		</p>
	);
};

export const LogoutError = () => {
	return <p className='text-center text-sm text-red-600'>Logout Error</p>;
};

export const ResetError = () => {
	return (
		<p className='text-center text-sm text-red-600'>Password Reset Error</p>
	);
};

export const SaveError = () => {
	return (
		<p className='text-center text-sm text-red-600'>
			There was an error saving your information
		</p>
	);
};
