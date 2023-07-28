import React, { useRef } from 'react';
import addCircle from '../../../assets/add-circle.svg';

const ImageUploader = ({ setImageFile }) => {
	const imageRef = useRef();

	const addImage = (e) => {
		imageRef.current.click();
	};

	const handleChange = (e) => {
		const reader = new FileReader();

		const file = e.target.files[0];

		if (file) {
			reader.onload = () => {
				if (reader.readyState === 2) {
					setImageFile(file);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setImageFile(null);
		}
	};

	return (
		<div className='absolute bottom-5 left-20'>
			<img
				src={addCircle}
				alt='upload profile'
				onClick={addImage}
				className='cursor-pointer'
			/>
			<input
				ref={imageRef}
				type='file'
				className='hidden'
				accept='/image/*'
				onChange={handleChange}
			/>
		</div>
	);
};

export default ImageUploader;
