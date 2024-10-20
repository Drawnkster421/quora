import { FaBriefcase } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import dayjs from "dayjs";
export default function MoreSkills({
	closeMoreHighlights,
	workExperience,
	education,
	address,
	createdAt,
}) {
	return (
		<div className="bg-white dark:bg-[#181818] w-screen h-screen md:h-fit md:w-fit p-4 flex flex-col gap-2 rounded-t-xl md:rounded-3xl text-[13px] md:text-[15px]">
			<div>
				<button
					onClick={closeMoreHighlights}
					className="p-1 hover:dark:bg-[#ffffff38] transition rounded-full"
				>
					<RxCross2 size={24} />
				</button>
			</div>
			{workExperience?.[0] && (
				<div className="flex gap-2 items-center px-2 border-b pb-2 dark:border-[#393839]">
					<div className="rounded-full p-2 bg-[#f1f2f2] dark:bg-transparent text-[#636466] dark:text-[#b1b3b6]">
						<FaBriefcase size={14} />
					</div>
					<div>
						<p>
							<span>
								{workExperience[0].designation} at{" "}
								{workExperience[0].companyName}
							</span>
							<span className="inline-block w-[2px] h-[2px] md:w-1 md:h-1 align-middle mx-2 rounded-full bg-[#939598]"></span>
							<span className="text-[#939598]">
								{workExperience[0].startDate &&
									new dayjs(
										workExperience[0].startDate
									)?.format("YYYY")}{" "}
								-{" "}
								{workExperience[0].endDate
									? new dayjs(
											workExperience[0].endDate
									  )?.format("YYYY")
									: "Present"}
							</span>
						</p>
						<p>
							<span>{workExperience[0].description}</span>
						</p>
					</div>
				</div>
			)}
			{education.length > 0 && (
				<div className="flex gap-2 items-center border-b pb-2 dark:border-[#393839] px-2 ">
					<div className="rounded-full p-2 bg-[#f1f2f2] dark:bg-transparent text-[#636466] dark:text-[#b1b3b6]">
						<FaGraduationCap size={14} />
					</div>
					<div>
						<p>
							<span>{education[0].degree}</span>
							<span className="inline-block w-[2px] h-[2px] md:w-1 md:h-1 align-middle mx-2 rounded-full bg-[#939598]"></span>
							<span className="text-[#939598]">
								{education[0].startDate &&
									new dayjs(education[0].startDate)?.format(
										"YYYY"
									)}{" "}
								-{" "}
								{education[0].endDate &&
									new dayjs(education[0].endDate)?.format(
										"YYYY"
									)}
							</span>{" "}
						</p>
						<p>
							<span>{education[0].description}</span>
							<span className="inline-block w-[2px] h-[2px] md:w-1 md:h-1 align-middle mx-2 rounded-full bg-[#939598]"></span>
							<span className="text-[#939598]">
								{education[0].schoolName}
							</span>
						</p>
					</div>
				</div>
			)}
			{address.length > 0 && (
				<div className="flex gap-2 items-center px-2 border-b pb-2 dark:border-[#393839]">
					<div className="rounded-full p-2 bg-[#f1f2f2] dark:bg-transparent text-[#636466] dark:text-[#b1b3b6]">
						<FaLocationDot size={14} />
					</div>
					<div>
						<p>
							Lives in {address[0].city}, {address[0].state},{" "}
							{address[0].country}
						</p>
					</div>
				</div>
			)}
			<div className="flex gap-2 items-center px-2 border-b pb-2 dark:border-[#393839]">
				<div className="rounded-full p-2 bg-[#f1f2f2] dark:bg-transparent text-[#636466] dark:text-[#b1b3b6]">
					<FaCalendar size={14} />
				</div>
				<div>Joined {new dayjs(createdAt).format("MMMM YYYY")}</div>
			</div>
		</div>
	);
}
