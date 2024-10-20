"use client";

import { useDataContext } from "@/components/contexts/data-provider";
import { useEffect } from "react";

export default function Following() {
	// To stop the globar loader
	const { stopGlobalLoader } = useDataContext();
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	return;
}
