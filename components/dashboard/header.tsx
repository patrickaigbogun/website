import { Profile } from '@components/reuse/button';
import { DrawBar } from '@components/reuse/drawer';
import { Brand } from '@components/reuse/logo';

export default function Header() {
	return (
		<nav className=' flex flex-row justify-between items-center p-2 mb-5 '>
			<DrawBar />
			<Brand>Levra</Brand>
			<Profile />
		</nav>
	);
}
