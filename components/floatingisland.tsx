'use client';

import { HouseSimple, GearSix, BellSimple, UserCircle, SignOut, ChatTeardropText } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from 'react';

export const MobileIsland = () => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="relative"  >
			<div className="flex flex-row p-3 space-y-4 bg-gray-800 shadow-lg left-5 top-1/3 rounded-xl">
				{/* Toggle Quick Actions */}
				<button onClick={() => setIsActive(!isActive)} className="text-gray-100">
					<GearSix size={20} weight="bold" />
				</button>
				<hr />
				{/* Quick Action Buttons */}
				{isActive && (
					<div className="space-y-4">
						<div>
							<button className="text-gray-100 hover:text-white">
								<HouseSimple size={20} weight="fill" />
							</button>
						</div>
						<div>
							<button className="text-gray-100 hover:text-white">
								<BellSimple size={20} weight="fill" />
							</button>
						</div>
						<div>
							<button className="text-gray-100 hover:text-white">
								<UserCircle size={20} weight="fill" />
							</button>
						</div>
						<div>
							<button className="text-gray-100 hover:text-white">
								<SignOut size={20} weight="fill" />
							</button>
						</div>
						<hr />
						<div>
							<button className="text-gray-100 hover:text-white">
								<ChatTeardropText size={20} weight="fill" />
							</button>
						</div>
					</div>

				)}

			</div>
		</div>
	);
}

export const DesktopIsland = () => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="absolute z-40"  >

			<div className="flex flex-col p-3 space-y-4 bg-gray-800 shadow-lg left-5 top-1/3 rounded-xl">
				{/* Toggle Quick Actions */}
				<button onClick={() => setIsActive(!isActive)} className="text-gray-100">
					<GearSix size={28} weight="bold" />
				</button>
				<hr />
				{/* Quick Action Buttons */}
				{isActive && (
					<div className="space-y-4">
						<div>
							<button className="text-gray-100 hover:text-white">
								<HouseSimple size={28} weight="fill" />
							</button>
						</div>
						<div>
							<button className="text-gray-100 hover:text-white">
								<BellSimple size={28} weight="fill" />
							</button>
						</div>
						<div>
							<button className="text-gray-100 hover:text-white">
								<UserCircle size={28} weight="fill" />
							</button>
						</div>
						<div>
							<button className="text-gray-100 hover:text-white">
								<SignOut size={28} weight="fill" />
							</button>
						</div>
						<hr />
						<div>
							<button className="text-gray-100 hover:text-white">
								<ChatTeardropText size={28} weight="fill" />
							</button>
						</div>
					</div>

				)}

			</div>
		</div>
	);
}

function FloatingIsland() {
	const [width, setwidth] = useState(window.innerWidth);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setwidth(window.innerWidth)
		}
		const handleResize = () => setwidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (width > 700) {
		return (
			
			<section>
				<DesktopIsland />
			</section>
		);
	}
	return (
		<section>
			<MobileIsland />
		</section>
	);
}

export default FloatingIsland;