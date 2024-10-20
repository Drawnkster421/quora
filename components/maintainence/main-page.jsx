import Image from "next/image";
import maintainence from "@/assets/maintainence.svg";
export default function Maintainence({ children }) {
	return (
		<div className="pt-[88px] md:pt-14 min-h-screen w-full pb-4">
			<div className="w-full mt-7 md:w-9/12 px-3 mx-auto flex flex-col justify-center items-center gap-4 md:pt-4">
				<div className="text-center text-lg">
					This part of website is under maintainence
				</div>
				<div className="w-11/12 h-80 relative">
					<Image
						src={maintainence}
						alt="maintainence"
						fill
						sizes="400px"
					/>
				</div>
				{children}
			</div>
		</div>
	);
}
