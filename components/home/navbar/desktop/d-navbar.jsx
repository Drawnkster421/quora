"use client";
import { NAV_ICONS } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import userImg from "@/assets/default_user.webp";
import quoraLogo from "@/assets/quora.png";
import SearchBox from "./searchbox";
import { usePathname } from "next/navigation";
import ProfileDropDown from "./profile-dropdown";
import CreatePost from "../../create-post";
import { useDataContext } from "@/components/contexts/data-provider";
export default function DesktopNavbar() {
	const [showMenu, setShowMenu] = useState(false);
	const pathName = usePathname();
	const [showCreatePost, setShowCreatePost] = useState(false);
	const { startGlobalLoader } = useDataContext();
	function toggleShowMenu() {
		setShowMenu((prev) => !prev);
	}
	function closeShowMenu() {
		setShowMenu(false);
	}
	function handleLinkClick() {
		startGlobalLoader();
	}
	return (
		<div className="mx-auto h-full w-fit md:flex items-center gap-1 hidden">
			<Link
				href="/"
				onClick={() => {
					if (`/` !== pathName) handleLinkClick();
				}}
			>
				<Image
					src={quoraLogo}
					alt="Quora Logo"
					className="w-24 h-full object-cover object-center"
					priority
				/>
			</Link>
			<div className="flex mx-1 items-center">
				{NAV_ICONS.map(({ path, Icon, ActiveIcon }) => {
					return (
						<div
							key={path}
							className="flex flex-col items-center gap-1 relative"
						>
							{`/${path}` === pathName ? (
								<div className="flex flex-col items-center gap-1 relative cursor-pointer">
									<div className="flex flex-col items-center hover:bg-white/5 transition"></div>

									<ActiveIcon />
									<div className="w-9/12 h-[3px] bg-[#f52936] rounded-full absolute -bottom-2"></div>
								</div>
							) : (
								<Link
									href={`/${path}`}
									onClick={handleLinkClick}
									className="flex flex-col items-center gap-1 relative"
								>
									<div className="flex flex-col items-center hover:bg-white/5 transition"></div>

									<Icon />
									<div className="w-9/12 h-[3px] bg-transparent rounded-full absolute -bottom-2"></div>
								</Link>
							)}
						</div>
					);
				})}
			</div>
			<SearchBox />
			<div className="relative p-3">
				<button
					onClick={toggleShowMenu}
					className="ml-2 lg:ml-4 flex justify-center items-center rounded-[3px] transition"
				>
					<Image
						src={userImg}
						alt="Profile for User"
						className="w-6 h-6 rounded-full hover:bg-white/5 hover:opacity-70"
					/>
				</button>
				<ProfileDropDown
					showMenu={showMenu}
					toggleMenu={toggleShowMenu}
					closeMenu={closeShowMenu}
				/>
			</div>
			<button
				onClick={() => setShowCreatePost(true)}
				className="dark:bg-[#f52936] text-[#fff] rounded-full ml-2 py-2 px-2 lg:px-3 font-medium text-[13px] leading-none bg-[#b92b27] hover:bg-[#a82723] transition"
			>
				Create Post
			</button>
			<CreatePost show={showCreatePost} setShow={setShowCreatePost} />
		</div>
	);
}
