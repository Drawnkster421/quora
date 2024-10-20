/*
	Reusable component for creatinga modal
*/
"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, close, show }) {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, []);
	return (
		!loading &&
		createPortal(
			show && (
				<div
					className="z-50 fixed w-screen h-screen top-0 left-0 bg-black/80 flex justify-center items-center"
					onClick={close}
				>
					<div onClick={(e) => e.stopPropagation()}>{children}</div>
				</div>
			),
			document.getElementById("portal")
		)
	);
}
