"use client";
import { getSpaces } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import noChhanelImg from "@/assets/channel-no-profile.webp";
import Image from "next/image";
import { COVER_IMAGES_SPACES } from "@/lib/utils";
import Link from "next/link";
import CreateSpace from "@/components/spaces/create-space";
import Advertisements from "@/components/home/advertisements/advertisements";
import { useDataContext } from "@/components/contexts/data-provider";

export default function Spaces() {
	const [loading, setLoading] = useState(true);
	const [spaces, setSpaces] = useState([]);
	const { data: session, status } = useSession();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const { stopGlobalLoader, startGlobalLoader } = useDataContext();
	async function fetchSpaces() {
		const data = await getSpaces();
		if (data.message === "success") {
			setSpaces(data.data);
		}
	}
	function handleLinkClick() {
		startGlobalLoader();
	}
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	useEffect(() => {
		async function load() {
			await fetchSpaces();
			setLoading(false);
		}
		load();
	}, [loading, status]);
	return (
		<div className="pt-[88px] md:pt-14 min-h-screen w-full pb-4">
			<div className="w-full md:w-9/12 mx-auto flex gap-4">
				{(loading || status === "loading") && (
					<div className="w-full md:w-9/12 mx-auto flex flex-col gap-4">
						<div className="pt-4 pb-4 px-4 bg-white dark:bg-[#262626] border dark:border-[#262626] rounded-sm flex flex-col items-start gap-3 md:mt-7 animate-pulse">
							<div className="w-20 h-5 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
							<div className="w-4/6 h-5 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
							<div className="w-4/6 h-5 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
							<div className="w-4/6 h-5 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
						</div>
						<div className="pt-4 pb-4 px-4 dark:border-[#262626] rounded-sm flex flex-col gap-5 md:mt-7">
							<div className="w-32 h-5 bg-white dark:bg-[#262626] rounded-full animate-pulse"></div>
							<div className="flex gap-3 flex-wrap justify-center">
								{Array.from({ length: 20 }).map((_, i) => {
									return (
										<div
											key={i}
											className="rounded-2xl w-44 h-56 animate-pulse bg-white dark:bg-[#262626] pt-6 flex flex-col gap-3 items-center"
										>
											<div className="w-8 h-8 rounded-lg bg-slate-300 dark:bg-[#1b1b1b]"></div>
											<div className="w-11/12 h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
											<div className="w-11/12 h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
											<div className="w-11/12 h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
											<div className="w-11/12 h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
											<div className="w-7/12 h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}

				{!loading && status === "authenticated" && (
					<>
						<div className="w-full md:w-9/12 mx-auto flex flex-col gap-4">
							<div className="pt-4 pb-4 bg-white dark:bg-[#262626] border dark:border-[#262626] rounded-sm flex flex-col items-start gap-2 md:mt-7">
								<div className="font-bold text-[18px] px-4">
									Your Spaces
								</div>
								<button
									onClick={() => setShowCreateModal(true)}
									className="border-2 rounded-full flex items-center gap-1 px-2 mx-4 py-1 text-[#2e69ff] dark:text-[#4894fd] border-[#2e69ff] dark:border-[#4894fd] hover:bg-[#ebf0ff] dark:hover:bg-[#282d41] transition"
								>
									<GoPlusCircle size={20} />
									<div className="text-[13px] font-medium">
										Create Space
									</div>
								</button>
								<CreateSpace
									show={showCreateModal}
									setShow={setShowCreateModal}
								/>
								{spaces
									.filter(
										(space) =>
											space.owner._id === session.user.id
									)
									.map((space) => {
										return (
											<Link
												key={space._id}
												href={`/spaces/${space._id}`}
												className="w-full"
												onClick={handleLinkClick}
											>
												<div className="flex gap-2 items-center w-full border-b dark:border-[#393839] py-2 px-4">
													<div className="w-6 h-6 relative">
														<Image
															src={
																space.image ||
																noChhanelImg
															}
															alt={`Profile picture for space ${space.name}`}
															fill
															sizes="24px"
															className="rounded-md"
														/>
													</div>
													<div className="text-[13px] font-bold">
														{space.name}
													</div>
												</div>
											</Link>
										);
									})}
							</div>
							<div className="font-bold text-xl px-4">
								Discover Spaces
							</div>
							<div className="font-medium  px-4">
								Spaces you might like
							</div>
							<div className="flex flex-wrap gap-2 justify-center px-4">
								{spaces
									.filter(
										(space) =>
											space.owner._id !== session.user.id
									)
									.map((space, index) => {
										return (
											<Link
												key={space._id}
												href={`/spaces/${space._id}`}
												onClick={handleLinkClick}
											>
												<div className="bg-white dark:bg-[#262626] rounded-2xl w-44 h-56 overflow-hidden text-center">
													<div
														className="w-full h-10 rounded-t-2xl relative"
														style={{
															backgroundImage: `url(${
																COVER_IMAGES_SPACES[
																	index % 5
																].src
															})`,
														}}
													>
														<div className="w-8 h-8 absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
															<Image
																src={
																	space.image ||
																	noChhanelImg
																}
																alt={`Profile picture for space ${space.name}`}
																fill
																sizes="32px"
																className="rounded-lg border-2 border-white dark:border-[#262626]"
															/>
														</div>
													</div>
													<div className="pt-5 text-[13px] font-bold px-3">
														{space.name}
													</div>
													<div className="text-[13px] px-3 h-[112px] overflow-hidden text-ellipsis">
														{space.description}
													</div>
												</div>
											</Link>
										);
									})}
							</div>
						</div>
						<div className="hidden lg:block pt-7">
							<Advertisements className="top-[84px]" />
						</div>
					</>
				)}
			</div>
		</div>
	);
}
