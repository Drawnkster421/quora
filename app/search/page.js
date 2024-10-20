"use client";

import Advertisements from "@/components/home/advertisements/advertisements";
import { searchData } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import userImg from "@/assets/default_user.webp";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useDataContext } from "@/components/contexts/data-provider";

export default function Search({ searchParams }) {
	const query = searchParams.q;
	const [loading, setLoading] = useState(true);
	const { data: session, status } = useSession();
	const [posts, setPosts] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const { stopGlobalLoader } = useDataContext();
	async function search() {
		const data = await searchData(session.user.jwt, query);
		if (data.message === "success") {
			if (data.posts) setPosts(data.posts);
			else setPosts([]);
			if (data.users) setProfiles(data.users);
			else setProfiles([]);
			setLoading(false);
			stopGlobalLoader();
		}
	}
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	useEffect(() => {
		if (loading && status === "authenticated") {
			search();
		}
	}, [loading, status]);

	// Reload if query changes
	useEffect(() => {
		setLoading(true);
	}, [searchParams]);
	return (
		<>
			{(loading || status === "loading") && (
				<>
					<div className="flex-grow flex flex-col bg-white dark:bg-[#262626] border dark:border-[#393839] animate-pulse">
						<div className="p-3 border-b dark:border-[#393839] font-medium">
							<div className="h-6 w-36 bg-slate-300 dark:bg-[#1b1b1b] rounded-3xl"></div>
						</div>

						<div className="m-3 border-b dark:border-[#393839] w-16 h-5 rounded-2xl bg-slate-300 dark:bg-[#1b1b1b]"></div>
						{Array.from({ length: 5 }).map((_, i) => {
							return (
								<div
									key={i}
									className="bg-[#FFF] dark:bg-[#262626] rounded p-3 flex flex-col gap-1 border-b dark:border-[#393839]"
								>
									<div className="flex gap-3 items-center">
										<div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
										<div className="flex flex-col gap-2">
											<div className="flex gap-2 items-center font-bold text-[13px]">
												<span className="w-[85px] h-4 rounded-lg bg-slate-300 dark:bg-[#1b1b1b]"></span>
												<span className="bg-[#636466] w-[2px] h-[2px] rounded-full"></span>
												<span className="w-[85px] h-4 rounded-lg bg-slate-300 dark:bg-[#1b1b1b]"></span>
											</div>
											<div className="w-24 h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
										</div>
									</div>
									<div className="w-9/12 h-5 rounded-full my-1 bg-slate-300 dark:bg-[#1b1b1b]"></div>
									<div className="w-full h-3 rounded-full my-1 bg-slate-300 dark:bg-[#1b1b1b]"></div>
									<div className="w-full h-3 rounded-full my-1 bg-slate-300 dark:bg-[#1b1b1b]"></div>
									<div className="w-8/12 h-3 rounded-full my-1 bg-slate-300 dark:bg-[#1b1b1b]"></div>
								</div>
							);
						})}

						<div className="m-3 border-b dark:border-[#393839] w-10 h-5 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
						{Array.from({ length: 5 }).map((_, i) => {
							return (
								<div
									key={i}
									className="flex gap-3 p-3 border-b dark:border-[#393839] hover:bg-[#f4f4f4] dark:hover:bg-[#ffffff0a] transition"
								>
									<div className="relative h-10 w-10 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
									<div className="flex flex-col gap-3">
										<div className="w-40 h-5 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
										<div className="w-24 h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="hidden lg:block sticky w-[340px] h-[280px] rounded bg-white dark:bg-[#262626] animate-pulse"></div>
				</>
			)}
			{!loading && status === "authenticated" && (
				<>
					<div className="flex-grow flex flex-col bg-white dark:bg-[#262626] border dark:border-[#393839]">
						<div className="p-3 border-b dark:border-[#393839] font-medium">
							Results for{" "}
							<span className="font-bold">{query}</span>
						</div>
						{posts.length > 0 && (
							<>
								<div className="p-3 font-medium border-b dark:border-[#393839]">
									Posts :
								</div>
								{posts.map((item) => {
									const {
										author,
										createdAt,
										_id,
										title,
										content,
									} = item;
									const {
										name,
										_id: aid,
										profileImage,
									} = author;
									return (
										<div
											key={_id}
											className="bg-[#FFF] dark:bg-[#262626] rounded p-3 flex flex-col gap-1 border-b dark:border-[#393839]"
										>
											<div className="flex gap-3 items-center">
												<Image
													src={
														profileImage ?? userImg
													}
													width={36}
													height={36}
													alt={`profile picture for ${name}`}
													className="rounded-full object-cover w-7 h-7 md:h-9 md:w-9"
												/>
												<div>
													<div className="flex gap-2 items-center font-bold text-[13px]">
														<span className="text-[#282829] dark:text-[#d5d6d6] capitalize">
															{name}
														</span>
														<span className="bg-[#636466] w-[2px] h-[2px] rounded-full"></span>
														<Link
															href={`/profile/${aid}`}
														>
															<span className="text-[#2e69ff] hover:underline font-medium">
																View Profile
															</span>
														</Link>
													</div>
													{createdAt && (
														<div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
															{new dayjs(
																createdAt
															).format(
																"DD MMMM, YYYY"
															)}
														</div>
													)}
												</div>
											</div>
											<Link href={`/posts/${_id}`}>
												<div className="text-base font-bold hover:underline underline-offset-1">
													{title}
												</div>
											</Link>
											<div className="text-[15px]">
												{content}
											</div>
										</div>
									);
								})}
							</>
						)}
						{profiles.length > 0 && (
							<>
								<div className="p-3 font-medium border-b dark:border-[#393839]">
									Users :
								</div>
								{profiles.map((item) => {
									const {
										createdAt,
										profileImage,
										_id,
										name,
									} = item;
									return (
										<Link
											href={`/profile/${_id}`}
											key={_id}
										>
											<div className="flex gap-3 p-3 border-b dark:border-[#393839] hover:bg-[#f4f4f4] dark:hover:bg-[#ffffff0a] transition">
												<div className="relative h-10 w-10">
													<Image
														src={
															profileImage ||
															userImg
														}
														alt={`Profile picture for ${name}`}
														fill
														sizes="40px"
														className="rounded-full"
													/>
												</div>
												<div className="flex flex-col">
													<div className="text-[14px] font-bold">
														{name}
													</div>
													{createdAt && (
														<div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
															{new dayjs(
																createdAt
															).format(
																"DD MMMM, YYYY"
															)}
														</div>
													)}
												</div>
											</div>
										</Link>
									);
								})}
							</>
						)}
						{posts.length === 0 && profiles.length === 0 && (
							<div className="p-3">
								We couldn't find any results for '{query}'.
							</div>
						)}
					</div>
					<div className="hidden lg:block sticky">
						<Advertisements className="top-[72px]" />
					</div>
				</>
			)}
		</>
	);
}
