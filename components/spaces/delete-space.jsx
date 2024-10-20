import React from "react";
import Modal from "../common/modal";
import { deleteASpace } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDataContext } from "../contexts/data-provider";

export default function DeleteSpace({
	showDeleteSpaceModal,
	closeDeleteSpaceModal,
	channelID,
}) {
	const { data: session } = useSession();
	const router = useRouter();
	const { startGlobalLoader } = useDataContext();
	async function handleDeleteSpace() {
		closeDeleteSpaceModal();
		const data = await deleteASpace(session.user.jwt, channelID);
		if (data.message === "success") {
			startGlobalLoader();
			toast.success("Space deleted.");
			router.push("/");
		} else {
			toast.error("OOPS! Some error occurred.");
		}
	}
	return (
		<Modal show={showDeleteSpaceModal} close={closeDeleteSpaceModal}>
			<div className="p-6 rounded-lg bg-white dark:bg-[#181818] flex flex-col gap-3 items-center">
				<div className="font-semibold text-[20px]">
					Do you want to delete this space?
				</div>
				<div className="flex gap-2 w-full justify-end">
					<button
						onClick={closeDeleteSpaceModal}
						className="rounded-full border-2 dark:border-[#262626] px-4 py-2 font-medium text-[#636466] dark:text-[#e2e2e2] hover:bg-[#00000010] dark:hover:bg-[#00000050] transition"
					>
						Cancel
					</button>
					<button
						onClick={handleDeleteSpace}
						className="rounded-full border-2 border-[#2e69ff] px-4 py-2 font-medium bg-[#2e69ff] hover:bg-[#1a5aff] text-[#fff] transition"
					>
						Confirm
					</button>
				</div>
			</div>
		</Modal>
	);
}
