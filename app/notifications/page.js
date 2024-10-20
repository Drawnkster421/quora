"use client";

import { useDataContext } from "@/components/contexts/data-provider";
import { useEffect } from "react";

export default function Following() {
	const { stopGlobalLoader } = useDataContext();
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	return;
}
