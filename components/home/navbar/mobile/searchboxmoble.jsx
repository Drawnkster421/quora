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
import { IoIosArrowBack } from "react-icons/io";
import { useDataContext } from "@/components/contexts/data-provider";
export default function SearchBoxMobile({ close }) {
	const inputRef = useRef();
	const containerRef = useRef();
	const resultsContainer = useRef();
	const [query, setQuery] = useState("");
	const { data: session, status } = useSession();
	const [posts, setPosts] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [resultsDropDown, setResultsDropDown] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { startGlobalLoader } = useDataContext();
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
		inputRef.current.blur();
		closeDropDown();
		startGlobalLoader();
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
		<div className="p-2 flex gap-2 bg-[#b92b27] items-center justify-center">
			<button onClick={close}>
				<IoIosArrowBack
					size={24}
					className="text-white flex-shrink-0"
				/>
			</button>
			<div
				ref={containerRef}
				onClick={() => inputRef.current.focus()}
				className="w-52 sm:w-80 flex bg-white dark:bg-[#262626] my-2 lg:mx-2 p-2 gap-2 rounded-[3px] border border-[#dee0e1] dark:border-[#393839] hover:border-[#2e69ff] dark:hover:border-[#2e69ff]"
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
						className="absolute w-screen bg-white dark:bg-[#262626] border dark:border-[#393839] left-0 top-16 -translate-x-2 translate-y-[2px]"
					>
						{query !== "" && (
							<>
								<div
									className="z-[10000] p-3 px-5 border-b dark:border-[#393839] cursor-pointer"
									onClick={navigateToSearch}
								>
									Search:{" "}
									<span className="overflow-x-hidden overflow-ellipsis whitespace-nowrap">
										{query}
									</span>
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
													className="py-2 px-5 border-b dark:border-[#393839]"
													onClick={handleClick}
												>
													<div className="font-semibold text-[13px] overflow-x-hidden overflow-ellipsis whitespace-nowrap">
														{title}
													</div>
													<div className="text-[13px] overflow-x-hidden overflow-ellipsis whitespace-nowrap">
														{content}
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
													className="py-2 px-5 border-b dark:border-[#393839] flex gap-2"
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
													<div className="capitalize font-bold overflow-x-hidden overflow-ellipsis whitespace-nowrap">
														{name}
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
	);
}
