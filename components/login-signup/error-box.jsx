import { IoIosInformationCircleOutline } from "react-icons/io";
// to display errors while user is trying to login or signup
export default function ErrorBox({ message }) {
	return (
		<div className="text-[#cb4b10] text-[14px] font-medium flex gap-3 items-center mt-1">
			<IoIosInformationCircleOutline
				size={20}
				className="flex-shrink-0"
			/>
			<div>{message}</div>
		</div>
	);
}
