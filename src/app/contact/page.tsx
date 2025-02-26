import Link from 'next/link'
import { MdOutlineEmail, MdFacebook } from 'react-icons/md'
import { PiTelegramLogo } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { GrInstagram } from "react-icons/gr";

const Contact = () => {
	return (
		<main className="flex min-h-screen w-full flex-col items-center p-4">
			<div className="w-full max-w-4xl space-y-12">
				{/* Header Section */}
				<div className="text-center space-y-6">
					<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Contact Us
					</h1>
					<p className="text-xl text-neutral-700 dark:text-neutral-300">
						We'd love to hear from you! Whether you have questions, feedback, or need assistance, 
						our team is here to help.
					</p>
				</div>

				{/* Contact Methods */}
				<div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
					{/* Email */}
					<div className="group relative bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
						<div className='flex items-center p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-lg bg-gradient-to-r hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 hover:text-white'>
							<MdOutlineEmail className='h-10 w-10 mr-4' />
							<div>
								<p className="font-semibold text-lg">Email</p>
								<p className="text-neutral-600 dark:text-neutral-400 group-hover:text-white">
									admin@bitcoinpokertour.com
								</p>
							</div>
						</div>
					</div>

					<div className="my-8" /> {/* Spacer */}

					{/* Telegram */}
					<Link href="https://t.me/+4_ll8Wiu8zQ0MTE9" target='_blank' rel="noopener noreferrer">
						<div className="group relative bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
							<div className='flex items-center p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-lg bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white'>
								<PiTelegramLogo className='h-10 w-10 mr-4' />
								<div>
									<p className="font-semibold text-lg">Telegram</p>
									<p className="text-neutral-600 dark:text-neutral-400 group-hover:text-white">
										Join Our Channel!
									</p>
								</div>
							</div>
						</div>
					</Link>

					<div className="my-8" /> {/* Spacer */}

					{/* Twitter/X */}
					<Link href="https://x.com/BTC_PokerTour" target='_blank' rel="noopener noreferrer">
						<div className="group relative bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
							<div className='flex items-center p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-lg hover:bg-black hover:text-white'>
								<RiTwitterXFill className='h-10 w-10 mr-4' />
								<div>
									<p className="font-semibold text-lg">X</p>
									<p className="text-neutral-600 dark:text-neutral-400 group-hover:text-white">
										Follow us on X
									</p>
								</div>
							</div>
						</div>
					</Link>

					<div className="my-8" /> {/* Spacer */}

					{/* Instagram */}
					<Link href="https://www.instagram.com/bitcoinpokertour/" target='_blank' rel="noopener noreferrer">
						<div className="group relative bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
							<div className='flex items-center p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-lg bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:text-white'>
								<GrInstagram className='h-10 w-10 mr-4' />
								<div>
									<p className="font-semibold text-lg">Instagram</p>
									<p className="text-neutral-600 dark:text-neutral-400 group-hover:text-white">
										Follow us on Instagram
									</p>
								</div>
							</div>
						</div>
					</Link>

					<div className="my-8" /> {/* Spacer */}

					{/* Facebook */}
					<Link href="https://www.facebook.com/profile.php?id=61561210327705" target='_blank' rel="noopener noreferrer">
						<div className="group relative bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
							<div className='flex items-center p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-lg hover:bg-blue-600 hover:text-white'>
								<MdFacebook className='h-10 w-10 mr-4' />
								<div>
									<p className="font-semibold text-lg">Facebook</p>
									<p className="text-neutral-600 dark:text-neutral-400 group-hover:text-white">
										Follow us on Facebook
									</p>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Contact;
