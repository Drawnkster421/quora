import React from "react";

import Search from "./search";
import AddPost from "./addpost";
import MobileTabs from "./tabs";
import QuoraHomeButton from "./quora-home-link";

export default function MobileNavbar() {
	return (
		<div className="mx-auto h-full w-full flex flex-col md:hidden">
			<div className="bg-[#b92b27] dark:bg-[#202020] w-full flex px-4">
				<Search />
				<QuoraHomeButton />
				<AddPost />
			</div>
			<MobileTabs />
		</div>
	);
}
