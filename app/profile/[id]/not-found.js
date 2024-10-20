// Fallback page if the user does not exist
import notFound from "@/assets/not-found.svg";
import Image from "next/image";

export default function UserNotFound() {
	return (
		<>
			<title>User Not Found</title>
			<div className="pt-[88px] md:pt-14 min-h-screen w-full bg-white dark:bg-[#181818]">
				<div className="w-full md:w-9/12 mx-auto mt-5">
					<div className="flex flex-col gap-5 mt-[120px] mx-4 items-center justify-between h-[400px]">
						<div className="text-lg md:text-2xl font-semibold text-center">
							Oops! The User you are looking for does not exist.
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
