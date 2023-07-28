import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { NavBeforeLogin } from '../../components/NavBeforeLogin';

function LandingPage(props) {
	let history = useHistory();

	const [modal, setModal] = useState("");

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const redirectHandler = (path) => {
		history.push(path)
	};

	return (
		<>
			<div className='h-screen'>
				{/* TODO: fix this */}
				<style>
					@import
					url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap');
				</style>



				{/* Navbar */}
				<NavBeforeLogin modal={modal} setModal={setModal} />


				{/* Header */}
				<div className='container mx-auto'>
					<div className='sm:w-2/3 md:w-1/2 xl:1/4 w-full mx-auto'>
						<h2 className='font-sans-pro text-5xl mt-24 text-regal-blue text-center'>
							Your One-Stop-Shop <br />for the <span className='font-bold text-arca-blue'>Stock Market</span>
						</h2>
						<p className='my-4 text-lg mt-8 text-regal-blue text-center'>
							Arcafeed scours the web for relevant, credible, and reliable
							news articles and market discrepencies.
						</p>


						<div className='w-full mt-8'>
							<div className='flex justify-center'>
								<Button
									className='w-1/4 text-base'
									variant='contained'
									onClick={() => { setModal("signup") }}
									// TODO: fix this
									style={{
										marginLeft: '2%',
										height: '55px',
										color: 'white',
										backgroundColor: '#0090B9',
										borderRadius: '100px'
									}}
								>
									Get Started
								</Button>
								<Button
									className='w-1/4 text-base'
									variant='contained'
									onClick={() => { redirectHandler("/news") }}
									// TODO: fix this
									style={{
										marginLeft: '2%',
										height: '55px',
										color: 'white',
										backgroundColor: '#000066',
										borderRadius: '100px'
									}}
								>
									Go To News
								</Button>
							</div>
						</div>

					</div>
					<div className="h-72 mt-24 mx-auto">
						<img
							className='mx-auto h-full md:mt-10'
							src="/new_design/landing-page-img2.svg"
						/>
					</div>

					{/* Section 2 body */}
					<div className='bg-features-section-gray rounded-3xl pt-14'>
						<h2 className='font-sans text-5xl text-center font-sans-pro text-white'>
							Trusted By:
						</h2>
						<section>
							<div className="max-w-6xl px-5 mx-auto mt-5 mb-5 text-center">
								<div className="grid grid-cols-1 lg:grid-cols-4">
									<div className="flex items-center justify-center">
										<img src="/new_design/TrustBestFeatures_img1.svg" />
									</div>
									<div className="flex items-center justify-center">
										<img src="/new_design/TrustBestFeatures_img2.svg" />
									</div>
									<div className="flex items-center justify-center">
										<img src="/new_design/TrustBestFeatures_img3.svg" />
									</div>
									<div className="flex items-center justify-center">
										<img src="/new_design/TrustBestFeatures_img4.svg" />
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>

				{/* Section 3 body */}
				<div className="w-full lg:w-3/4 mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-3 mt-14 lg:mt-20">
						<div className="mx-auto w-10/12">
							<div className='h-full rounded-xl text-black bg-white border-2 border-black p-8'>
								<img src="/new_design/WCAFeatures_img1.svg" className='mx-auto' />
								<h1 className='font-sans text-2xl font-semibold mt-10'>
									Connect your brokerage
								</h1>
								<p className='text-gray-500 mt-4 text-md mt-6'>
									Plaid let's you reliably connect your investment accounts to Arcafeed so  you can view your data in real time.
								</p>
								<Button
									className='block border-black mx-auto p-3 px-6 pt-2 rounded-full'
									type='submit'
									variant='contained'
									onClick={() => { setModal("signup") }}
									// TODO: fix this
									style={{
										marginTop: '20px',
										color: 'black',
										backgroundColor: 'white',
										border: '2px solid black'
									}}
								>
									<b>Learn more</b>
								</Button>
							</div>
						</div>
						<div className="mx-auto w-10/12 mt-12 lg:mt-0">
							<div className='h-full rounded-xl text-black bg-white border-2 border-black p-8'>
								<img src="/new_design/WCAFeatures_img2.svg" className='mx-auto' />
								<h1 className='font-sans text-2xl font-semibold mt-10'>
									Connect your brokerage
								</h1>
								<p className='text-gray-500 mt-4 text-md mt-6'>
									Plaid let's you reliably connect your investment accounts to Arcafeed so  you can view your data in real time.
								</p>
								<Button
									className='block border-black mx-auto p-3 px-6 pt-2 rounded-full'
									type='submit'
									variant='contained'
									onClick={() => { setModal("signup") }}
									// TODO: fix this
									style={{
										marginTop: '20px',
										color: 'black',
										backgroundColor: 'white',
										border: '2px solid black'
									}}
								>
									<b>Learn more</b>
								</Button>
							</div>
						</div>
						<div className="mx-auto w-10/12 mt-12 lg:mt-0">
							<div className='h-full rounded-xl text-black bg-white border-2 border-black p-8'>
								<img src="/new_design/WCAFeatures_img3.svg" className='mx-auto' />
								<h1 className='font-sans text-2xl font-semibold mt-10'>
									Community
								</h1>
								<p className='text-gray-500 mt-4 text-md mt-6'>
									Gain access to a network of professional traders who provide real time relevent insights, socially curated and verified using machine learning
								</p>
								<Button
									className='block border-black mx-auto p-3 px-6 pt-2 rounded-full'
									type='submit'
									variant='contained'
									onClick={() => { setModal("signup") }}
									// TODO: fix this
									style={{
										marginTop: '20px',
										color: 'black',
										backgroundColor: 'white',
										border: '2px solid black'
									}}
								>
									<b>Learn more</b>
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col items-center justify-center block md:hidden'>
					<div className='mt-20 mb-20'>
						<img src="/new_design/footerButton.svg" onClick={scrollToTop} />
					</div>
				</div>

				<img src="img/logo-white.svg" className="h-8" alt="" />
				{/* <Footer history={history} ad={true} /> */}

				<footer className="bg-white m-h-[75vh]">
					<div className="container mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-6 sm:px-8 px-5 py-16 h-4/6">
							<div className='col-span-2 flex flex-col justify-between'>
								<img src="/arcafeed.png" alt="" width={150} />
								<div className='mt-12 lg:mt-0'>
									<div className="text-navy-blue font-semibold text-3xl">
										Be a smarter, better informed investor
									</div>
									<div className="text-navy-blue">
										Subscribe to Arcafeed premium for $4.99/month
									</div>
								</div>

							</div>
							<div className="col-span-2 lg:col-span-1">
								<div className='w-full lg:w-9/12 ml-auto mt-12 lg:mt-0'>
									<div className="text-navy-blue text-xl">
										Contact Us
									</div>
									<div className='mt-12 text-gray-500'>
									 Boston, MA 02118
									</div>
									<div className='mt-4 text-gray-500'>
										+1(857)-348-9205
									</div>
								</div>
							</div>
							<div className="col-span-2 lg:col-span-1">
								<div className="w-full lg:w-9/12 ml-auto mt-12 lg:mt-0">
									<div className="text-navy-blue text-xl">
										Social Media
									</div>
									<div className='mt-12 text-gray-500'>
										Linkedin
									</div>
									<div className='mt-4 text-gray-500'>
										Facebook
									</div>
									<div className='mt-4 text-gray-500'>
										Twitter
									</div>
									<div className='mt-4 text-gray-500'>
										Instagram
									</div>
								</div>
							</div>
							<div className="col-span-2 lg:col-span-1 hidden md:block">
								<div className="w-9/12 ml-auto">
									<img src="/new_design/footerButton.svg" onClick={scrollToTop} />
								</div>
							</div>
						</div>
						<div className="h-2/6 flex flex-col justify-end text-center lg:text-start">
							<div className="grid grid-cols-1 lg:grid-cols-5 px-5">
								<div className="col-span-2">
									<div>
										© 2023 Arcafeed. All rights reserved
									</div>
								</div>
								<div className="col-span-2 lg:col-span-1">
									<div className="w-full lg:w-9/12 ml-auto mt-4 lg:mt-0">Terms & Conditions</div>
								</div>
								<div className="col-span-2 lg:col-span-1">
									<div className="w-full lg:w-9/12 ml-auto mt-4 lg:mt-0">Privacy</div>
								</div>
								<div className="col-span-2 lg:col-span-1">
									<div className="w-full lg:w-9/12 ml-auto mt-4 lg:mt-0">Site by Acrafeed</div>
								</div>
							</div>
						</div>
					</div>

				</footer>




			</div>
		</>
	);
}

export default LandingPage;
