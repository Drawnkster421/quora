"use client";
import { useTheme } from "next-themes";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function MessageBox() {
	const { theme, systemTheme } = useTheme();
	return (
		<ToastContainer
			autoClose={3000} // close after 3 seconds
			position="top-left" // position of notification
			theme={theme === "system" ? systemTheme : theme} // to set the theme
			pauseOnFocusLoss={false}
			limit={4} // maximum number of notifications visible at one time
		/>
	);
}
