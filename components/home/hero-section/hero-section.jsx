"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import HeroSectionLoader from "./hero-section-loader";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { projectID } from "@/lib/utils";
import PostComponent from "./post-component";
import QuestionComponent from "./question-components/question-component";
import { useRouter } from "next/navigation";
import usePageBottom from "@/components/custom-hooks/use-page-bottom";
import { useDataContext } from "@/components/contexts/data-provider";
import { IoMdArrowDropupCircle } from "react-icons/io";
export default function HeroSection() {
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [posts, setPosts] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [loadMorePosts, setLoadMorePosts] = useState(false);
	const [hasMoreResults, setHasMoreResults] = useState(true);
	const router = useRouter();
	const reachedBottom = usePageBottom();
	const { reloadPosts, setReloadPosts } = useDataContext();
	// console.log("reachedBottom", reachedBottom);
	if (reachedBottom && hasMoreResults) {
		if (!loadMorePosts) {
			setLoadMorePosts(true);
		}
	}
	function handleReload() {
		router.refresh();
	}
	function handleGoToTop() {
		// window.scroll({ top: 0, behavior: "smooth" });
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
	useEffect(() => {
		if (reloadPosts && !loadMorePosts) {
			async function reload() {
				setReloadPosts(false);
				setLoadMorePosts(true);
				setPage(1);
				setPosts([]);
			}
			reload();
		}
	}, [reloadPosts]);
	async function loadPosts() {
		setHasError(false);
		try {
			const data = await fetch(
				`https://academics.newtonschool.co/api/v1/quora/post?limit=10&page=${page}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						projectID: projectID,
						Authorization: `Bearer ${session.user.jwt}`,
					},
				}
			);
			const res = await data.json();
			if (res.results < 10) {
				setHasMoreResults(false);
			} else {
				setPage((prev) => prev + 1);
			}
			// console.log(res);
			setPosts([...posts, ...res.data]);
		} catch (error) {
			setHasError(true);
		} finally {
			setLoading(false);
			setLoadMorePosts(false);
		}
	}
	useEffect(() => {
		if (loadMorePosts) {
			loadPosts();
		}
	});
	useEffect(() => {
		window.scrollTo(0, 0);
		if (status === "authenticated") loadPosts();
	}, [status]);
	return (
		<div className="flex flex-col gap-2 mt-4 w-full md:w-[550px] mb-4">
			{loading && <HeroSectionLoader />}
			{!loading && !hasError && (
				<>
					<PostComponent />
					{posts.map((data, i) => {
						return (
							<div
								key={i}
								className="border border-[#dee0e1] dark:border-[#262626]"
							>
								<QuestionComponent {...data} />
							</div>
						);
					})}
				</>
			)}
			{hasError && (
				<div className="flex flex-col gap-2 items-center h-[80vh] justify-center">
					<AiOutlineInfoCircle size={24} />
					<div className="text-lg">
						Something went wrong. Wait a moment and try again.
					</div>
					<button
						className="bg-[#2E69FF] text-[#fff] py-2 px-4 rounded-full"
						onClick={handleReload}
					>
						Try again
					</button>
				</div>
			)}
			{loadMorePosts && (
				<div className="bg-[#FFF] dark:bg-[#262626] animate-pulse border border-[#dee0e1] dark:border-[#262626] rounded">
					<div className="h-14 flex flex-col gap-2 p-2">
						<div className="flex-grow bg-slate-300 dark:bg-[#1b1b1b] rounded-lg"></div>
						<div className="flex-grow bg-slate-300 dark:bg-[#1b1b1b] rounded-lg"></div>
						<div className="flex-grow bg-slate-300 dark:bg-[#1b1b1b] rounded-lg"></div>
					</div>
				</div>
			)}
			{!hasMoreResults && !hasError && (
				<button
					onClick={handleGoToTop}
					className="self-center flex gap-3 mt-2 p-2 mb-2 items-center hover:bg-[#00000010] dark:hover:bg-[#ffffff10] transition duration-200 rounded"
				>
					<IoMdArrowDropupCircle size={22} />
					<div>Go To Top</div>
				</button>
			)}
		</div>
	);
}
