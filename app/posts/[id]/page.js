/************************************
 Here the post with the id passed in the url is displayed.
 ************************************/
"use client";

import { useDataContext } from "@/components/contexts/data-provider";
import Advertisements from "@/components/home/advertisements/advertisements";
import QuestionComponent from "@/components/home/hero-section/question-components/question-component";
import { getPostDetail } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Post({ params }) {
	const [loading, setLoading] = useState(true);
	const { data: session, status } = useSession(); // To get details of logged in user.
	const [postData, setPostData] = useState();
	const [postNotFound, setPostNotFound] = useState(false);
	const { stopGlobalLoader } = useDataContext();
	async function fetchPost() {
		const data = await getPostDetail(session.user.jwt, params.id);
		if (data.message === "success") {
			setPostData(data.data);
		} else {
			setPostNotFound(true);
		}
	}
	if (postNotFound) {
		return notFound();
	}
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	useEffect(() => {
		// To get the data initially and later when any changes are made, for exmample upvote, downvote, comment etc.
		async function loadPostData() {
			if (loading && status === "authenticated") {
				await fetchPost();
				setLoading(false);
			}
		}
		loadPostData();
	}, [loading, status]);
	return (
		<div className="pt-[88px] md:pt-14 min-h-screen w-full pb-4">
			<div className="w-full md:w-9/12 mx-auto mt-5">
				{(loading || status === "loading") && (
					<div className="flex gap-4 animate-pulse">
						<div className="flex-grow bg-[#FFF] dark:bg-[#262626] animate-pulse border border-[#dee0e1] dark:border-[#262626] rounded">
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
									{Array.from({ length: 6 }).map((_, i) => {
										return (
											<div
												key={i}
												className="h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"
											></div>
										);
									})}
								</div>
							</div>
						</div>
						<div className="hidden lg:block w-[340px] h-[280px] rounded-lg bg-[#FFF] dark:bg-[#262626]"></div>
					</div>
				)}
				{!loading && status === "authenticated" && (
					<div className="w-full mx-auto flex gap-16 mb-4 justify-center">
						<div className="w-full md:max-w-[550px] border border-[#dee0e1] dark:border-[#262626] h-fit">
							<QuestionComponent {...postData} postPage={true} />
							{/* postPage tells the component it this component is being rendered in the particular post's page.
							So that if the post is deleted the user is redirected to previous page */}
						</div>
						<div className="hidden lg:block sticky top-[72px]">
							<Advertisements className={"top-[78px]"} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
