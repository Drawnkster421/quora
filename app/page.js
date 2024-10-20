"use client";
import { useDataContext } from "@/components/contexts/data-provider";
import Advertisements from "@/components/home/advertisements/advertisements";
import HeroSection from "@/components/home/hero-section/hero-section";
import SpacesSidebar from "@/components/home/spaces-sidebar";
import { useEffect } from "react";
export default function Home() {
	const { stopGlobalLoader } = useDataContext();
	useEffect(() => {
		stopGlobalLoader();
		// Stop the loader when the page has loaded completed.
	}, []);
	return (
		<div className="min-h-screen w-full md:w-10/12 mx-auto pt-[88px] md:pt-14">
			<div className="flex gap-5 justify-center">
				<div className="hidden md:block">
					{/* Wrapped in div to make sidebar sticky */}
					<SpacesSidebar />
				</div>
				<HeroSection />
				<div className="hidden lg:block pt-4">
					<Advertisements className="top-[72px]" />
				</div>
			</div>
		</div>
	);
}
