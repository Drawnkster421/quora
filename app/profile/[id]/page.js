"use client";
import { getUser, getUsersPosts, toggleFollow } from "@/lib/actions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import userImg from "@/assets/default_user.webp";
import Image from "next/image";
import Modal from "@/components/common/modal";
import Skills from "@/components/profile/skils";
import MoreSkills from "@/components/profile/more-skills";
import FollowSvg from "@/components/profile/follow-svg";
import FollowingSvg from "@/components/profile/following-svg";
import noPosts from "@/assets/end-of-page.webp";
import QuestionComponent from "@/components/home/hero-section/question-components/question-component";
import Link from "next/link";
import Advertisements from "@/components/home/advertisements/advertisements";
import { useDataContext } from "@/components/contexts/data-provider";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";

export default function Profile({ params }) {
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [userData, setUserData] = useState({});
	const [showMoreHighlights, setShowMoreHighlights] = useState(false);
	const [posts, setPosts] = useState();
	const { stopGlobalLoader } = useDataContext();
	function closeMoreHighlights() {
		setShowMoreHighlights(false);
	}
	if (hasError) {
		//redirect to not found page if user does not exist
		return notFound();
	}
	async function loadUser() {
		setHasError(false);
		const data = await getUser(session.user.jwt, params.id);
		if (data.status === "success") {
			setUserData(data.data);
			document.title = data.data.name;
		} else {
			setHasError(true);
			return;
		}
	}
	async function loadPosts() {
		setHasError(false);
		const data = await getUsersPosts(session.user.jwt, params.id);
		if (data.message === "success") {
			setPosts(data.posts);
		} else {
			setHasError(true);
		}
	}
	const {
		address,
		createdAt,
		education,
		email,
		gender,
		isFollowed,
		name,
		profileImage,
		skills,
		workExperience,
		_id,
	} = userData;

	async function handleFollowButtons() {
		// setLoading(true);
		const data = await toggleFollow(!isFollowed, session.user.jwt, _id);
		if (data.message === "success") {
			toast.success(
				(!isFollowed ? `You are now following ` : `You unfollowed `) +
					(name.slice(0, 1).toUpperCase() + name.slice(1))
			);
		} else {
			toast.error("OOPS! Some error occurred.");
		}
		loadUser();
	}
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	useEffect(() => {
		async function initialize() {
			if (status === "authenticated" && loading === true) {
				await loadUser();
				await loadPosts();
				setLoading(false);
			}
		}
		initialize();
	}, [status, loading]);

	return (
		<div className="pt-[88px] md:pt-14 min-h-screen w-full bg-white dark:bg-[#181818]">
			<div className="w-full md:w-9/12 mx-auto mt-5">
				{status === "loading" ||
					(loading && (
						<div className="flex flex-col">
							<div className="flex flex-col md:flex-row gap-2">
								<div className="flex gap-3 sm:gap-8 items-center flex-grow p-4 animate-pulse">
									<div className="relative">
										<div className="w-[120px] h-[120px] rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
									</div>
									<div className="flex flex-col gap-2">
										<div className="h-5 w-28 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
										<div className="h-5 w-24 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
										<div className="h-7 w-30 rounded-3xl bg-slate-300 dark:bg-[#3f3f3f]"></div>
									</div>
								</div>
								<div className="flex flex-col gap-2 flex-grow animate-pulse">
									<div className="border-b-2 dark:border-[#393839] pb-2 p-3 flex justify-between items-center">
										<div className="bg-slate-300 dark:bg-[#3f3f3f] w-36 h-8 rounded-full"></div>
										<div className="bg-slate-300 dark:bg-[#3f3f3f] w-12 h-5 rounded-lg"></div>
									</div>
									<div className="flex gap-2">
										<div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
										<div className="flex-grow h-7 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
									</div>
									<div className="flex gap-2">
										<div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
										<div className="flex-grow h-7 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
									</div>
									<div className="flex gap-2">
										<div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
										<div className="flex-grow h-7 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
									</div>
									<div className="flex gap-2">
										<div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
										<div className="flex-grow h-7 rounded-full bg-slate-300 dark:bg-[#3f3f3f]"></div>
									</div>
								</div>
							</div>
							<div className="w-full mx-auto flex gap-8 animate-pulse">
								<div className="flex flex-col gap-3 mt-4 w-full md:w-[550px] mb-4">
									<div className="ml-3 bg-slate-300 dark:bg-[#3f3f3f] w-14 h-7 rounded-2xl"></div>
									{Array.from({ length: 5 }).map((_, i) => {
										return (
											<div
												key={i}
												className=" dark:border-[#262626] shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-slate-300 dark:bg-[#3f3f3f] max-w-[550px] h-[350px]"
											></div>
										);
									})}
								</div>
								<div className="hidden lg:block pt-4 mt-9 sticky top-[60px] w-80 h-72 bg-slate-300 dark:bg-[#3f3f3f] rounded"></div>
							</div>
						</div>
					))}
				{status === "authenticated" && !loading && (
					<div className="flex flex-col">
						<div className="flex flex-col md:flex-row gap-2">
							<div className="flex gap-3 sm:gap-8 items-center flex-grow p-4">
								<div className="relative">
									<Image
										src={profileImage ?? userImg}
										width={120}
										height={120}
										priority
										className="object-cover rounded-full min-w-20"
										alt={`Profile Image for ${name}`}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<div className="font-bold text-xl sm:text-3xl capitalize">
										{name}
									</div>
									<div className="text-[14px] text-[#939598]">
										{email}
									</div>
									{session.user.id !== _id && (
										<div>
											{isFollowed ? (
												<button
													disabled={loading}
													onClick={
														handleFollowButtons
													}
													className="px-3 py-2 flex gap-1 items-center rounded-full transition border-[#2e69ff] text-[#2e69ff] dark:text-[#4894FD] shadow-[rgb(46,105,255)_0px_0px_0px_1px_inset] hover:bg-[#ebf0ff] dark:hover:bg-[#282d41] disabled:opacity-35 disabled:hover:bg-white"
												>
													<div>
														<FollowingSvg className="stroke-[#2e69ff] fill-[#2e69ff] dark:stroke-[#4894FD] dark:fill-[#4894FD]" />
													</div>
													<div>Following</div>
												</button>
											) : (
												<button
													disabled={loading}
													className="px-3 py-2 text-white flex gap-1 items-center bg-[#2e69ff] hover:bg-[#1a5aff] rounded-full transition disabled:opacity-35 disabled:hover:bg-[#2e69ff]"
													onClick={
														handleFollowButtons
													}
												>
													<div>
														<FollowSvg className="stroke-white h-5 w-5" />
													</div>
													<div>Follow</div>
												</button>
											)}
										</div>
									)}
								</div>
							</div>
							<div className="flex flex-col gap-2 flex-grow">
								<div className="border-b-2 dark:border-[#393839] pb-2 p-3 flex justify-between items-center">
									<div className="font-medium text-[#282829] dark:text-[#d5d6d6]">
										Credentials & Highlights
									</div>
									<button
										onClick={() =>
											setShowMoreHighlights(true)
										}
										className="text-[13px] text-[#939598] dark:text-[#b1b3b6] hover:underline"
									>
										More
									</button>
									<Modal
										show={showMoreHighlights}
										close={closeMoreHighlights}
									>
										<MoreSkills
											{...{
												closeMoreHighlights,
												workExperience,
												education,
												address,
												createdAt,
											}}
										/>
									</Modal>
								</div>
								<Skills
									{...{
										workExperience,
										education,
										address,
										createdAt,
									}}
								/>
							</div>
						</div>
						<div className="w-full mx-auto flex gap-16 mb-4 justify-center">
							<div className="flex flex-col gap-3 mt-4 w-full md:w-[550px] mb-4">
								<div className="text-xl font-semibold ml-3">
									Posts
								</div>
								{posts &&
									posts.length > 0 &&
									posts.map((data, i) => {
										return (
											<div
												key={data._id}
												className=" dark:border-[#262626] shadow-[0_0_10px_rgba(0,0,0,0.15)]"
											>
												<QuestionComponent
													{...data}
													shouldReloadParent={true}
													reloadParent={() =>
														setLoading(true)
													}
												/>
											</div>
										);
									})}
								{(!posts || posts.length === 0) && (
									<div className="flex flex-col items-center gap-3">
										<div className="relative w-28 h-28">
											<Image
												src={noPosts}
												alt="no posts found"
												fill
												sizes="112px"
											/>
										</div>
										{_id === session.user.id && (
											<>
												<div className="mx-4 text-center text-[#636466] dark:text-[#B1B3B6]">
													You haven't shared, answered
													or posted anything yet.
												</div>
												<Link
													href={"/answer"}
													className="px-3 py-2 rounded-full text-white bg-[#2e69ff] hover:bg-[#1a5aff] transition"
												>
													Answer questions
												</Link>
											</>
										)}
										{_id !== session.user.id && (
											<div>
												<div className="mx-4 text-center text-[#636466] dark:text-[#B1B3B6]">
													<span className="capitalize">
														{name}
													</span>{" "}
													hasn't shared, answered or
													posted anything yet.
												</div>
											</div>
										)}
									</div>
								)}
							</div>
							<div className="hidden lg:block pt-4 mt-9 sticky top-[60px]">
								<Advertisements className="top-[72px]" />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
