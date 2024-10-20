"use client";
import { searchData } from "@/lib/actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import userImg from "@/assets/default_user.webp";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import { useDataContext } from "@/components/contexts/data-provider";
export default function SearchBox() {
	const inputRef = useRef();
	const containerRef = useRef();
	const resultsContainer = useRef();
	const [query, setQuery] = useState("");
	const { data: session, status } = useSession();
	const [posts, setPosts] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [resultsDropDown, setResultsDropDown] = useState(false);
	const [loading, setLoading] = useState(false);
	const { startGlobalLoader } = useDataContext();
	const router = useRouter();
	function openDropDown() {
		setResultsDropDown(true);
	}
	function closeDropDown() {
		setResultsDropDown(false);
	}
	function focusHandler(e) {
		containerRef.current.classList.remove("border-[#dee0e1]");
		containerRef.current.classList.add("border-[#2e69ff]");
		containerRef.current.classList.remove("dark:border-[#393839]");
		containerRef.current.classList.add("dark:border-[#2e69ff]");
		containerRef.current.classList.add(
			"dark:shadow-[0_0_0_2px_rgb(40,45,65)]"
		);
		containerRef.current.classList.add(
			"shadow-[0_0_0_2px_rgb(235,240,255)]"
		);
		containerRef.current.classList.add("w-72");
		openDropDown();
	}
	function blurHandler(e) {
		containerRef.current.classList.remove("border-[#2e69ff]");
		containerRef.current.classList.add("border-[#dee0e1]");
		containerRef.current.classList.remove("dark:border-[#2e69ff]");
		containerRef.current.classList.add("dark:border-[#393839]");
		containerRef.current.classList.remove(
			"dark:shadow-[0_0_0_2px_rgb(40,45,65)]"
		);
		containerRef.current.classList.remove(
			"shadow-[0_0_0_2px_rgb(235,240,255)]"
		);
		containerRef.current.classList.remove("w-72");
	}
	function handleKeyDown(e) {
		if (e.code === "Enter" && query !== "") {
			setQuery("");
			navigateToSearch(e);
		}
	}
	function navigateToSearch(e) {
		e.stopPropagation();
		inputRef.current.blur();
		closeDropDown();
		startGlobalLoader();
		router.push(`/search?q=${encodeURI(query)}`);
	}
	function handleQueryChange(e) {
		setQuery(e.target.value);
	}
	async function getResults() {
		setLoading(true);
		const data = await searchData(session.user.jwt, query, true);
		if (data.message === "success") {
			if (data.posts) setPosts(data.posts);
			else setPosts([]);
			if (data.users) setProfiles(data.users);
			else setProfiles([]);
		}
		setLoading(false);
	}
	function handleClick(e) {
		e.stopPropagation();
		startGlobalLoader();
		inputRef.current.blur();
		closeDropDown();
	}
	useEffect(() => {
		const id = setTimeout(() => {
			if (query !== "") getResults();
		}, 150);
		return () => {
			clearTimeout(id);
		};
	}, [query]);
	return (
		<ClickAwayListener onClickAway={closeDropDown}>
			<div className="relative w-60 h-12 z-10 bg-white dark:bg-[#262626]">
				<div
					ref={containerRef}
					onClick={() => inputRef.current.focus()}
					className="absolute top-0 left-0 w-60 flex bg-white dark:bg-[#181818] my-2 lg:mx-2 p-2 gap-2 rounded-[3px] border border-[#dee0e1] dark:border-[#393839] hover:border-[#2e69ff] dark:hover:border-[#2e69ff]"
				>
					<FiSearch
						size={16}
						className="text-[#939598] dark:text-[#8e9092]"
					/>
					<input
						ref={inputRef}
						onFocus={focusHandler}
						onBlur={blurHandler}
						className="outline-none bg-transparent text-[13px] w-full"
						placeholder="Search Quora"
						value={query}
						onChange={handleQueryChange}
						onKeyDown={handleKeyDown}
					/>

					{resultsDropDown && (
						<div
							ref={resultsContainer}
							className="absolute w-72 bg-white dark:bg-[#262626] border dark:border-[#393839] top-full -translate-x-2 translate-y-[2px]"
						>
							{query !== "" && (
								<>
									<div
										className="p-3 border-b dark:border-[#393839] cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-[#ffffff0a] transition"
										onClick={navigateToSearch}
									>
										Search: <span>{query}</span>
									</div>
									{loading && (
										<div className="my-2 mx-5 flex flex-col gap-[6px] items-center animate-pulse">
											<div className="w-full h-[6px] rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
											<div className="w-full h-[6px] rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
											<div className="w-full h-[6px] rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
										</div>
									)}
									{!loading &&
										posts.length > 0 &&
										posts.map((item) => {
											const {
												_id,
												title = "",
												content = "",
											} = item;
											return (
												<Link
													href={`/posts/${_id}`}
													key={_id}
												>
													<div
														className="py-2 px-3 border-b dark:border-[#393839] hover:bg-[#f2f2f2] dark:hover:bg-[#ffffff0a] transition"
														onClick={handleClick}
													>
														<div className="font-semibold text-[13px]">
															{title.length > 40
																? title.slice(
																		0,
																		40
																  ) + "..."
																: title}
														</div>
														<div className="text-[13px]">
															{content.length > 40
																? content.slice(
																		0,
																		40
																  ) + "..."
																: content}
														</div>
													</div>
												</Link>
											);
										})}
									{!loading &&
										profiles.length > 0 &&
										profiles.map((item) => {
											const { _id, profileImage, name } =
												item;
											return (
												<Link
													key={_id}
													href={`/profile/${_id}`}
												>
													<div
														onClick={handleClick}
														className="p-2 border-b dark:border-[#393839] flex gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#ffffff0a] transition"
													>
														<div className="w-5 h-5 relative">
															<Image
																src={
																	profileImage ||
																	userImg
																}
																alt={`profile picture for ${name}`}
																fill
																sizes="20px"
																className="rounded-full"
															/>
														</div>
														<div className="capitalize font-bold">
															{name.length > 20
																? name.slice(
																		0,
																		20
																  )
																: name}
														</div>
													</div>
												</Link>
											);
										})}
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</ClickAwayListener>
	);
}
