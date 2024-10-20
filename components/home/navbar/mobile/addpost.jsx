"use client";
import React, { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import CreatePost from "../../create-post";
export default function AddPost() {
	const [showCreatePost, setShowCreatePost] = useState(false);
	function showCreatePostModal() {
		setShowCreatePost(true);
	}
	return (
		<div className="text-white self-center">
			<button
				onClick={showCreatePostModal}
				className="flex gap-2 text-[14px] font-medium items-center"
			>
				<BsPlusCircle size={22} />
				Add
			</button>
			<CreatePost show={showCreatePost} setShow={setShowCreatePost} />
		</div>
	);
}
