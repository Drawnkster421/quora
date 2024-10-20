"use client";

import Link from "next/link";
import QuoraIcon from "@/components/nav-icons/quora-icon";
import { useDataContext } from "@/components/contexts/data-provider";
import { useEffect } from "react";

export default function QuoraHomeButton() {
	const { startGlobalLoader, stopGlobalLoader } = useDataContext();
	// useEffect(() => {
	// 	stopGlobalLoader();
	// }, []);

	return (
		<div className="flex-1 flex justify-center">
			<Link href={"/"} onClick={() => startGlobalLoader()}>
				<QuoraIcon className="fill-white h-11 w-20" />
			</Link>
		</div>
	);
}
