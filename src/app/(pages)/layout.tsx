import { MENU_LINKS } from "@/app/const/menu_links";
import Link from "next/link";
import Navbar from "../components/shared/nabvar";
import Image from "next/image";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='drawer lg:drawer-open'>
			<input id='drawer-layout' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>
				<Navbar />
				{children}
			</div>
			<div className='drawer-side z-10'>
				<label htmlFor='drawer-layout' aria-label='close sidebar' className='drawer-overlay'></label>
				<div className='bg-white text-base-content min-h-full w-80 flex flex-col'>
					<div className='p-4 border-b border-base-300'>
						<div className='flex items-center gap-3'>
							<Image src='/insure-ai.png' alt='Insure AI Logo' width={50} height={50} />
							<h1 className='text-xl font-bold'>Dashboard</h1>
						</div>
					</div>
					<ul className='menu p-4 gap-2 w-full'>
						{MENU_LINKS.map((link, index) => (
							<li key={index}>
								<Link
									href={link.href}
									className='flex items-center hover:bg-base-300 rounded-lg transition-colors w-full p-4 text-lg'>
									<span className='text-primary'>{<link.icon />}</span>
									<span>{link.label}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default LayoutDashboard;
