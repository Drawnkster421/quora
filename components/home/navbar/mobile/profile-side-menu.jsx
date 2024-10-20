"use client";
import { createPortal } from "react-dom";
import { signOut, useSession } from "next-auth/react";
import userImg from "@/assets/default_user.webp";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import Modal from "@/components/common/modal";
import { RxCross2 } from "react-icons/rx";
import { THEMES } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useDataContext } from "@/components/contexts/data-provider";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

export default function ProfileSideMenu({
	closeSideBar,
	isSideBarVisible,
	toggleSideBar,
}) {
	const { data: session, status } = useSession();
	let user;
	if (status === "authenticated") user = session.user;
	const [showThemeModal, setShowThemeModal] = useState(false);
	const { theme, setTheme, systemTheme } = useTheme();
	const curTheme = theme === "system" ? systemTheme : theme;
	const [selectedCheckBox, setSelectedCheckBox] = useState(theme);
	const pathName = usePathname();
	const { startGlobalLoader } = useDataContext();
	function handleLinkclick() {
		startGlobalLoader();
	}
	function openThemeModal() {
		setShowThemeModal(true);
	}
	function closeThemeModal() {
		setShowThemeModal(false);
	}
	function handleButtonClick(type) {
		setTheme(type);
		setSelectedCheckBox(type);
	}
	async function handleLogOut() {
		const data = await signOut();
		startGlobalLoader();
		closeSideBar();
		toast.success("Logged out successfully.");
	}
	return (
		status === "authenticated" &&
		createPortal(
			isSideBarVisible && (
				<div
					className="z-50 fixed w-screen h-screen top-0 left-0 bg-black/80 md:hidden"
					onClick={closeSideBar}
				>
					<div
						className="h-screen w-64 bg-white dark:bg-[#262626]"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex p-4 pl-6 border-b dark:border-[#393839] bg-[#f7f7f8] dark:bg-[#202020] justify-between items-center">
							<div className="text-[20px] font-semibold">
								Your Account
							</div>
							<button onClick={closeSideBar}>
								<RxCross2 size={24} />
							</button>
						</div>
						<Link
							href={`/profile/${user.id}`}
							onClick={() => {
								closeSideBar();
								if (!pathName.startsWith("/profile"))
									handleLinkclick();
								else {
								}
							}}
						>
							<div className="py-5 px-3 pl-6 border-b dark:border-[#393839] hover:bg-white/5 hover:opacity-70 flex flex-col gap-4">
								<Image
									src={userImg}
									alt="Profile for User"
									className="w-10 h-10 rounded-full"
								/>
								<div className="w-full flex justify-between items-center">
									<p className="capitalize text-[20px] font-semibold">
										{user.name}
									</p>
									<IoIosArrowForward
										size={20}
										// color="rgba(0,0,0,0.6)"
										className="text-[#00000099] dark:text-[#d5d6d6]"
									/>
								</div>
							</div>
						</Link>
						<div className="flex flex-col border-b  dark:border-[#393839]">
							<div>
								<button
									onClick={openThemeModal}
									className="flex justify-between items-center p-3 pl-6 w-full hover:bg-[#00000008] dark:hover:bg-[#ffffff0a] transition"
								>
									<div className="text-sm">Dark Mode</div>
									<div className="rounded-full px-[6px] py-[1px] text-[11px] dark:text-[#4894fd] font-semibold bg-[#e6e7e8] dark:bg-[#282d41]">
										{curTheme === "light" ? "OFF" : "ON"}
									</div>
								</button>
								<Modal
									close={closeThemeModal}
									show={showThemeModal}
								>
									<div
										onClick={(e) => e.stopPropagation()}
										className="bg-white dark:bg-[#181818] rounded-2xl p-4 flex flex-col gap-4"
									>
										<div className="flex justify-between items-center">
											<div className="font-semibold text-lg">
												Theme Setting
											</div>
											<button onClick={closeThemeModal}>
												<RxCross2 size={24} />
											</button>
										</div>
										<div className="text-[#636466] dark:text-[#b1b3b6] text-[13px]">
											Adjust how you'd like Quora to
											appear on this browser.
										</div>
										<div className="flex gap-3 max-w-[600px]">
											{THEMES.map(
												({ name, ThemeImage }) => {
													const type =
														name === "Auto"
															? "system"
															: name.toLowerCase();
													return (
														<label
															htmlFor={
																"check" + name
															}
															key={name}
															className={
																"flex-grow cursor-pointer hover:bg-[#00000010] dark:hover:bg-[#ffffff0a] flex flex-col gap-2 p-2 rounded transition-all duration-300" +
																(type ===
																selectedCheckBox
																	? " bg-[#edf1f5] hover:bg-[#edf1f5] dark:bg-[#1a2035] dark:hover:bg-[#1a2035]"
																	: "")
															}
															style={{
																":hover input":
																	{
																		borderColor:
																			"#2e69ff",
																	},
															}}
															onClick={() =>
																handleButtonClick(
																	type
																)
															}
														>
															<div className="flex gap-2 items-center font-semibold">
																<input
																	type="checkbox"
																	id={
																		"check" +
																		name
																	}
																	className="w-4 h-4 border border-[#b1b3b6] cursor-pointer"
																	checked={
																		type ===
																		selectedCheckBox
																	}
																/>
																<div>
																	{name}
																</div>
															</div>
															<div>
																<ThemeImage />
															</div>
														</label>
													);
												}
											)}
										</div>
									</div>
								</Modal>
							</div>
							<button
								onClick={handleLogOut}
								className="flex justify-between items-center p-3 pl-6 w-full hover:bg-[#00000008] dark:hover:bg-[#ffffff0a] transition"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			),
			document.getElementById("portal")
		)
	);
}
