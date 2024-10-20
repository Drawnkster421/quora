"use client";
import QuestionComponent from "@/components/home/hero-section/question-components/question-component";
import { getChannelData, getChannelPosts } from "@/lib/actions";
import { COVER_IMAGES_SPACES } from "@/lib/utils";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import noPosts from "@/assets/end-of-page.webp";
import noChhanelImg from "@/assets/channel-no-profile.webp";
import { MdEditNote } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import EditSpace from "@/components/spaces/edit-space";
import DeleteSpace from "@/components/spaces/delete-space";
import Advertisements from "@/components/home/advertisements/advertisements";
import { useDataContext } from "@/components/contexts/data-provider";
export default function Page({ params }) {
	const [channelData, setChannelData] = useState({});
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { data: session, status } = useSession();
	const [coverIndex] = useState(Math.floor(Math.random() * 5)); // for the background cover
	const [showEditBox, setShowEditBox] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const { stopGlobalLoader, startGlobalLoader } = useDataContext();
	function openDeleteConfirmation() {
		setShowDeleteConfirmation(true);
	}
	function closeDeleteConfirmation() {
		setShowDeleteConfirmation(false);
	}
	function openEditModal() {
		setShowEditBox(true);
	}
	function handleLinkClick() {
		startGlobalLoader();
	}
	async function fetchChannel() {
		const data = await getChannelData(params.id);
		if (data.message === "success") {
			setChannelData(data.data);
			document.title = data.data.name;
		}
	}
	async function fetchChannelPosts() {
		const data = await getChannelPosts(params.id);
		if (data.message === "success") {
			setPosts(data.posts);
		}
	}
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	useEffect(() => {
		async function load() {
			if (status === "authenticated" && loading) {
				await fetchChannel();
				await fetchChannelPosts();
				setLoading(false);
			}
		}
		load();
	}, [status, loading]);
	const { _id, name, description, image, owner, createdAt } = channelData;

	return (
		<>
			{(status === "loading" || loading) && (
				<div className="pt-[88px] md:pt-12 min-h-screen w-full bg-white dark:bg-[#181818]">
					<div className="w-full sm:w-10/12 pt-14 pb-5 sm:mx-auto bg-[#f2f2f2] dark:bg-[#262626] rounded-b-2xl animate-pulse">
						<div className="w-28 h-28 rounded-lg ml-6 bg-slate-300 dark:bg-[#1b1b1b]"></div>
						<div className="w-4/12 h-5 mt-5 ml-4 rounded-lg bg-slate-300 dark:bg-[#1b1b1b]"></div>
						<div className="w-7/12 h-5 mt-5 ml-4 rounded-lg bg-slate-300 dark:bg-[#1b1b1b]"></div>
					</div>
					<div className="w-full sm:w-10/12 flex gap-6 mx-auto my-5">
						<div className="flex flex-col flex-grow max-w-[550px] gap-3">
							{Array.from({ length: 10 }).map((_, i) => {
								return (
									<div
										key={i}
										className="bg-[#FFF] dark:bg-[#262626] animate-pulse border border-[#dee0e1] dark:border-[#262626] rounded"
									>
										<div className="h-11 flex px-2 gap-2 items-center">
											<div className="h-9 w-9 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
											<div className="flex flex-col gap-2 h-full w-full py-2">
												<div className="flex-grow w-1/4 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
												<div className="flex-grow w-10/12 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
											</div>
										</div>
										<div className="h-44 flex flex-col px-2 gap-2 py-3">
											<div className="h-5 w-9/12 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
											<div className="flex flex-col py-2 px-3 justify-between h-full">
												{Array.from({ length: 6 }).map(
													(_, i) => {
														return (
															<div
																key={i}
																className="h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"
															></div>
														);
													}
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className="hidden md:block sticky top-[70px] w-[340px] h-[280px] bg-[#f2f2f2] dark:bg-[#262626] rounded-2xl"></div>
					</div>
				</div>
			)}
			{status === "authenticated" && !loading && (
				<div className="pt-[88px] md:pt-12 min-h-screen w-full bg-white dark:bg-[#181818] pb-4">
					<div
						className="w-full bg-no-repeat bg-cover "
						style={{
							backgroundImage: `url(${COVER_IMAGES_SPACES[coverIndex].blurDataURL})`,
						}}
					>
						<div className="w-full md:w-9/12 mx-auto relative pb-4">
							<div
								className="w-full h-20 md:h-52 bg-no-repeat bg-cover bg-center rounded-b-2xl"
								style={{
									backgroundImage: `url(${COVER_IMAGES_SPACES[coverIndex].src})`,
								}}
							>
								<div className="absolute top-12 left-5 md:top-32 md:left-5 h-20 w-20 md:w-32 md:h-32">
									<Image
										src={image || noChhanelImg}
										alt={`Profile Picture for ${name}`}
										fill
										sizes="80px"
										className=" rounded-[30px]"
									/>
								</div>
							</div>

							<div className="px-5 flex flex-col gap-2 mt-12 md:mt-14">
								<div className="flex w-full justify-between">
									<div className="text-white font-bold text-[18px] md:text-[27px]">
										{name}
									</div>
									{owner._id === session.user.id && (
										<div className="flex gap-4">
											<button onClick={openEditModal}>
												<div className="transition-all p-[6px] md:p-2 duration-200 text-white bg-[#0000000d] hover:bg-[#080809] rounded-full">
													<MdEditNote className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
												</div>
											</button>
											<EditSpace
												channelID={params.id}
												show={showEditBox}
												setShow={setShowEditBox}
												oldTitle={name}
												oldContent={description}
												setLoading={setLoading}
											/>
											<button
												onClick={openDeleteConfirmation}
											>
												<div className="transition-all p-[6px] md:p-2 duration-200 text-white bg-[#0000000d] hover:bg-[#080809] rounded-full">
													<RiDeleteBinLine className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
												</div>
											</button>
											<DeleteSpace
												closeDeleteSpaceModal={
													closeDeleteConfirmation
												}
												showDeleteSpaceModal={
													showDeleteConfirmation
												}
												channelID={params.id}
											/>
										</div>
									)}
								</div>
								<div className="text-white text-[13px]">
									{description}
								</div>
								<div className="text-white text-[13px]">
									Created By{" "}
									<Link
										href={`/profile/${owner._id}`}
										className="capitalize font-semibold hover:underline"
										onClick={handleLinkClick}
									>
										{owner.name}
									</Link>{" "}
									at{" "}
									{new dayjs(createdAt).format("MMMM, YYYY")}
								</div>
							</div>
						</div>
					</div>
					<div className="w-full md:w-9/12 flex gap-8 justify-center mx-auto items-start">
						<div className="flex flex-col gap-3 mt-4 w-full md:w-[550px] mb-4 mx-auto">
							{/* <div className="text-xl font-semibold ml-3">Posts</div> */}
							{posts.length > 0 &&
								posts.map((data, i) => {
									return (
										<div
											key={i}
											className=" dark:border-[#262626] shadow-[0_0_10px_rgba(0,0,0,0.15)]"
										>
											<QuestionComponent {...data} />
										</div>
									);
								})}
							{!posts ||
								(posts.length === 0 && (
									<div className="flex flex-col items-center gap-3">
										<div className="relative w-28 h-28">
											<Image
												src={noPosts}
												alt="no posts found"
												fill
												sizes="112px"
											/>
										</div>
										<div className="mx-4 text-center text-[#636466] dark:text-[#B1B3B6] font-bold text-[18px]">
											No stories
										</div>
										<div className="mx-4 text-center text-[#636466] dark:text-[#B1B3B6]">
											There are no stories in this Space
											yet.
										</div>
										{/* <Link
										href={"/answer"}
										className="px-3 py-2 rounded-full text-white bg-[#2e69ff] hover:bg-[#1a5aff] transition"
									>
										Answer questions
									</Link> */}
									</div>
								))}
						</div>
						<div className="hidden lg:block pt-4 sticky top-[60px]">
							<Advertisements className="top-[72px]" />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
