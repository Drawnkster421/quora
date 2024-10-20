"use client";
import Modal from "@/components/common/modal";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchBoxMobile from "./searchboxmoble";
export default function Search() {
	const [showSearchBox, setShowSearchBox] = useState(false);
	function openSearchBox() {
		setShowSearchBox(true);
	}
	function closeSearchBox() {
		setShowSearchBox(false);
	}
	return (
		<div className="text-white self-center lg:hidden block">
			<button
				onClick={openSearchBox}
				className="flex gap-2 text-[14px] font-medium items-center"
			>
				<FiSearch size={22} />
				Search
			</button>
			<Modal show={showSearchBox} close={closeSearchBox}>
				<div className="w-screen h-screen">
					<SearchBoxMobile close={closeSearchBox} />
				</div>
			</Modal>
		</div>
	);
}
