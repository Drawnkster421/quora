"use client";
import { deleteComment, getUserNameAndProfile } from "@/lib/actions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import userImg from "@/assets/default_user.webp";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { HiDotsHorizontal } from "react-icons/hi";
import ClickAwayListener from "react-click-away-listener";
import Modal from "@/components/common/modal";
import { useDataContext } from "@/components/contexts/data-provider";
import { toast } from "react-toastify";

export default function Comment({
	item,
	isChild,
	setLoadingComments,
	reloadPost,
}) {
	const [loading, setLoading] = useState(true);
	const { data: session, status } = useSession();
	const [user, setUser] = useState({});
	const [showDropDown, setShowDropDown] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { startGlobalLoader } = useDataContext();
	function handleLinkClick() {
		startGlobalLoader();
	}
	function closeDeleteModal() {
		setShowDeleteModal(false);
		setShowDropDown(false);
	}
	function toggleDropDown() {
		setShowDropDown((prev) => !prev);
	}
	async function getUser() {
		const data = await getUserNameAndProfile(session.user.jwt, item.author);
		if (data.message === "success") {
			setUser(data.data);
		}
		setLoading(false);
	}
	function handleEditBtn() {
		setShowDropDown(false);
	}
	async function handleDelete() {
		setShowDropDown(false);
		closeDeleteModal();
		const data = await deleteComment(session.user.jwt, item._id);
		if (data.message === "success") {
			setLoadingComments(true);
			reloadPost();
			toast.success("Comment Deleted");
		} else {
			toast.error("OOPS! Some error occured.");
		}
	}
	useEffect(() => {
		if (loading) {
			getUser();
		}
	}, [loading]);
	return (
		<>
			{loading && (
				<>
					{/* <div className="flex gap-2 py-1 items-center animate-pulse">
						<div
							className={
								"relative flex-shrink-0 rounded-full" +
								(isChild ? " w-5 h-5" : " w-8 h-8")
							}
						></div>
						<div className="flex flex-col flex-grow">
							<div className="flex justify-between flex-grow relative">
								<div className="flex gap-2">
									<div className="w-24 h-3 rounded-full"></div>
									<div className="w-14 h-3 rounded-full"></div>
								</div>
							</div>
							<div className="w-full h-3 rounded-full"></div>
							<div className="w-9/12 h-3 rounded-full"></div>
						</div>
					</div> */}
					<div className="flex gap-2 my-1 px-2 animate-pulse">
						<div
							className={
								"rounded-full bg-slate-300 dark:bg-[#1b1b1b]" +
								(isChild ? " w-5 h-5" : " w-8 h-8")
							}
						></div>
						{/* <div
							className={
								"relative flex-shrink-0 rounded-full" +
								(isChild ? " w-5 h-5" : " w-8 h-8")
							}
						></div> */}
						<div className="flex flex-col flex-grow gap-2">
							<div className="w-8/12 h-2 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
							<div className="w-full h-2 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
							<div className="w-7/12 h-2 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
						</div>
					</div>
				</>
			)}
			{!loading && (
				<div
					className={
						"flex gap-2 py-1 " + (isChild ? "items-center" : "")
					}
				>
					<div
						className={
							"relative flex-shrink-0" +
							(isChild ? " w-5 h-5" : " w-8 h-8")
						}
					>
						<Image
							src={user.profileImage || userImg}
							alt={`Profile picture for ${user.name}`}
							fill
							sizes={"20px, 32px"}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col flex-grow">
						<div className="flex justify-between flex-grow relative">
							<div className="flex gap-2">
								<Link
									href={`/profile/${item.author}`}
									onClick={handleLinkClick}
								>
									<div className="font-bold text-[13px] hover:underline capitalize">
										{user.name}
									</div>
								</Link>
								<div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
									{new dayjs(item.createdAt).format(
										"MMM, YYYY"
									)}
								</div>
							</div>
							{item.author === session.user.id && (
								<>
									<button
										onClick={toggleDropDown}
										className="absolute right-0 p-1 rounded-full hover:bg-[#cfd0d3] dark:hover:bg-[#161515] transition"
									>
										<HiDotsHorizontal className="text-lg" />
									</button>
									{showDropDown && (
										<ClickAwayListener
											onClickAway={() =>
												setShowDropDown(false)
											}
										>
											<div className="flex flex-col gap-1 items-start absolute right-0 top-7 bg-white dark:bg-[#262626] dark:border-[#262626] shadow-lg rounded-md border z-[1]">
												{/* <button
													onClick={handleEditBtn}
													className="px-4 py-1 w-full hover:bg-[#edeef0] transition"
												>
													Edit
												</button> */}
												<button
													onClick={() =>
														setShowDeleteModal(true)
													}
													className="px-6 py-2 hover:bg-[#edeef0] dark:hover:bg-[#161515] transition rounded-md shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(0,0,0,0.4)]"
												>
													Delete
												</button>
												<Modal
													show={showDeleteModal}
													close={closeDeleteModal}
												>
													<div className="p-6 rounded-lg bg-white dark:bg-[#262626] flex flex-col gap-3 items-center">
														<div className="font-semibold text-[20px]">
															Do you want to
															delete this comment?
														</div>
														<div className="flex gap-2 w-full justify-end">
															<button
																onClick={
																	closeDeleteModal
																}
																className="rounded-full border-2 dark:border-[#1d1c1ccf] px-4 py-2 font-medium text-[#636466] dark:text-[#eaeaea] hover:bg-[#00000010] dark:hover:bg-[#0e0e0e2c] transition"
															>
																Cancel
															</button>
															<button
																onClick={
																	handleDelete
																}
																className="rounded-full border-2 border-[#2e69ff] px-4 py-2 font-medium bg-[#2e69ff] hover:bg-[#1a5aff] text-[#fff] transition"
															>
																Confirm
															</button>
														</div>
													</div>
												</Modal>
											</div>
										</ClickAwayListener>
									)}
								</>
							)}
						</div>
						<div>{item.content}</div>
						{item.children.length > 0 && (
							<div>
								{item.children.map((item) => {
									return (
										<Comment
											key={item._id}
											item={item}
											isChild={true}
											setLoadingComments={
												setLoadingComments
											}
										/>
									);
								})}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
