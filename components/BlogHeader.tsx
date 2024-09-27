
interface Props {
	image: string;
	name: string;
}

export default async function BlogHeader({image, name}:Props) {

	return (
		<header className="flex flex-row justify-between p-5 text-white bg-stone-500 " >
			<div className="flex items-center" >
				<div>Logo/Sitename</div>
			</div>
			<div className="flex flex-row items-center justify-center space-x-3" >
				<div className="justify-center p-2 font-normal transition-all duration-200 ease-in-out rounded-full hover:font-bold hover:scale-105 hover:text-black bg-slate-500" >Nav Items</div>
				<div className="justify-center p-2 font-normal transition-all duration-200 ease-in-out rounded-full hover:font-bold hover:scale-105 hover:text-black bg-slate-500" >Nav Items</div>
				<div className="justify-center p-2 font-normal transition-all duration-200 ease-in-out rounded-full hover:font-bold hover:scale-105 hover:text-black bg-slate-500" >Nav Items</div>
			</div>
			<div className="flex items-center" >
					<img src={image} alt={name} width={36} height={36} className="object-fill rounded-full hover:brightness-50 hover:scale-110" />
			</div>
		</header>
	)
}
