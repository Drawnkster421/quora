"use client";
import notFound from "@/assets/not-found.svg";
import { useDataContext } from "@/components/contexts/data-provider";
import Image from "next/image";
import { useEffect } from "react";

export default function PageNotFound() {
	const { stopGlobalLoader } = useDataContext();
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	return (
		<>
			<title>Page Not Found</title>
			<div className="pt-[88px] md:pt-14 min-h-screen w-full bg-white dark:bg-[#181818]">
				<div className="w-full md:w-9/12 mx-auto mt-5">
					<div className="flex flex-col gap-5 mt-[120px] mx-4 items-center justify-between h-[400px]">
						<div className="text-lg md:text-2xl font-semibold text-center">
							Oops! The Page you are looking for does not exist.
						</div>
						<div className="relative w-full flex-grow">
							<Image
								src={notFound}
								alt="user not found"
								fill
								sizes="100vw"
								className="object-contain"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
