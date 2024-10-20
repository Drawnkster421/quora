"use client";
import { NAV_ICONS } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import userImg from "@/assets/default_user.webp";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProfileSideMenu from "./profile-side-menu";
import { useDataContext } from "@/components/contexts/data-provider";

export default function MobileTabs() {
	const pathName = usePathname();
	const [showProfileSideBar, setShowProfileSideBar] = useState(false);
	const { stopGlobalLoader, startGlobalLoader } = useDataContext();
	function toggleProfileSideBar() {
		setShowProfileSideBar((prev) => !prev);
	}
	function hideProfileSideBar() {
		setShowProfileSideBar(false);
	}

	function handleLinkClick() {
		startGlobalLoader();
	}
	return (
		<div className="flex dark:bg-[#202020]">
			{NAV_ICONS.map(({ path, Icon, ActiveIcon }) => {
				return (
					<Link
						key={path}
						href={`/${path}`}
						className="flex-1 flex justify-center items-center border-r border-y border-[#dee0e1] dark:border-[#393839] h-11"
						onClick={() => {
							if (`/${path}` !== pathName) {
								handleLinkClick();
							} else {
							}
						}}
					>
						{`/${path}` === pathName && <ActiveIcon />}
						{`/${path}` !== pathName && <Icon />}
					</Link>
				);
			})}
			<button
				onClick={toggleProfileSideBar}
				className="flex-1 flex justify-center items-center border-r border-y border-[#dee0e1] dark:border-[#393839] h-11"
			>
				<Image
					src={userImg}
					alt="Profile for User"
					className="w-6 h-6 rounded-full"
				/>
			</button>
			<ProfileSideMenu
				closeSideBar={hideProfileSideBar}
				isSideBarVisible={showProfileSideBar}
				toggleSideBar={toggleProfileSideBar}
			/>
		</div>
	);
}
