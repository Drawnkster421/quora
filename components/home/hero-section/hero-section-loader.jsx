export default function HeroSectionLoader() {
	return (
		<>
			<div className="bg-[#FFF] dark:bg-[#262626] animate-pulse border border-[#dee0e1] dark:border-[#262626] rounded">
				<div className="h-10 flex gap-2 px-2 items-center">
					<div className="h-7 w-7 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
					<div className="h-6 w-full rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
				</div>
				<div className="h-10 flex items-center gap-4 pl-10 pr-4">
					<div className="flex-grow h-5 mx-8 bg-slate-300 dark:bg-[#1b1b1b] rounded-lg"></div>
					<div className="flex-grow h-5 mx-8 bg-slate-300 dark:bg-[#1b1b1b] rounded-lg"></div>
				</div>
			</div>
			{Array.from({ length: 10 }).map((_, i) => {
				return (
					<div
						key={i}
						className="bg-[#FFF] dark:bg-[#262626] animate-pulse border border-[#dee0e1] dark:border-[#262626] rounded"
					>
						<div className="h-11 flex px-2 gap-2 items-center">
							<div className="h-9 w-9 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
							<div className="flex flex-col gap-2 h-full w-full py-2">
								<div className="flex-grow w-1/4 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
								<div className="flex-grow w-10/12 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
							</div>
						</div>
						<div className="h-44 flex flex-col px-2 gap-2 py-3">
							<div className="h-5 w-9/12 bg-slate-300 dark:bg-[#1b1b1b] rounded-full"></div>
							<div className="flex flex-col py-2 px-3 justify-between h-full">
								{Array.from({ length: 6 }).map((_, i) => {
									return (
										<div
											key={i}
											className="h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"
										></div>
									);
								})}
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}
