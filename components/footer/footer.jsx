export default function Footer() {
	return (
		<div
			className="bg-[#f1f2f2] rounded-e w-full flex flex-wrap gap-1 items-center justify-center py-4 px-2
		dark:bg-[#181818]"
		>
			<a href="https://www.quora.com/about" target="_blank">
				<p className="text-[13px] text-[#636466] dark:text-[#b1b3b6] hover:underline">
					About
				</p>
			</a>
			<span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>

			<a href="https://www.careers.quora.com/" target="_blank">
				<p className="text-[13px] text-[#636466] dark:text-[#b1b3b6] hover:underline">
					Careers
				</p>
			</a>
			<span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>
			<a href="https://www.quora.com/about/tos" target="_blank">
				<p className="text-[13px] text-[#636466] dark:text-[#b1b3b6] hover:underline">
					Terms
				</p>
			</a>
			<a href="https://www.quora.com/about/privacy" target="_blank"></a>
			<span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>

			<a href="https://www.quora.com/about/privacy" target="_blank">
				<p className="text-[13px] text-[#636466] dark:text-[#b1b3b6] hover:underline">
					Privacy
				</p>
			</a>
			<span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>
			<a
				href="https://www.quora.com/about/acceptable_use"
				target="_blank"
			>
				<p className="text-[13px] text-[#636466] dark:text-[#b1b3b6] hover:underline">
					Acceptable Use
				</p>
			</a>
			<span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>
			<a
				href="https://www.quora.com/business?medium=businesses&source=dropdown_footer"
				target="_blank"
			>
				<p className="text-[13px] text-[#636466] dark:text-[#b1b3b6] hover:underline">
					Advertise
				</p>
			</a>
			<span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>
			<a href="https://www.quora.com/press" target="_blank">
				<p className="text-[13px] text-[#636466] dark:text-[#b1b3b6] hover:underline">
					Press
				</p>
			</a>
			<span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>

			<p className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
				© Quora, Inc. 2024
			</p>
		</div>
	);
}
