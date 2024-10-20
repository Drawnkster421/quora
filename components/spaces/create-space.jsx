"use client";
import Modal from "../common/modal";
import { RxCross2 } from "react-icons/rx";
import { FaRegImages } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { createASpace } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useDataContext } from "../contexts/data-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function CreateSpace({ show, setShow }) {
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const { data: session, status } = useSession();
	const { startGlobalLoader } = useDataContext();
	const imagesInput = useRef();
	const router = useRouter();
	function filesBtnHandler(e) {
		setFiles([...e.target.files]);
	}
	function handleRemoveFile(index) {
		const newFiles = [...files];
		newFiles.splice(index, 1);
		setFiles(newFiles);
	}
	function closeModal() {
		setShow(false);
		setFiles([]);
		setTitle("");
		setDescription("");
	}
	async function addSpace() {
		const formData = new FormData();
		formData.append("name", title);
		setTitle("");
		if (description) {
			formData.append("description", description);
			setDescription("");
		}
		if (files.length > 0) {
			for (let file of files) formData.append("image", file);
			setFiles([]);
		}

		closeModal();
		const data = await createASpace(session.user.jwt, formData);
		if (data?.status === "success") {
			toast.success("Space created.");
			startGlobalLoader();
			router.push(`/spaces/${data.data._id}`);
		} else {
			toast.error("OOPS! Some error occured. Please try again later.");
		}
	}
	return (
		<Modal show={show} close={closeModal}>
			<div className="h-screen w-screen md:h-fit md:max-h-screen md:max-w-[600px] bg-white dark:bg-[#181818] rounded-lg p-6 flex flex-col items-start gap-2">
				<div className="w-full flex justify-between items-center">
					<div className="flex gap-4">
						<button
							onClick={closeModal}
							className="rounded-full p-2 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#ffffff15] transition duration-300"
						>
							<RxCross2 size={24} />
						</button>
						<button
							disabled={title === "" || title.length < 2}
							onClick={addSpace}
							className="hidden sm:block bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[13px] sm:text-[15px] font-medium p-2 sm:p-3 rounded-full transition duration-300"
						>
							Create
						</button>
					</div>
					<div className="px-5 flex justify-between items-center">
						<div className="flex gap-5 items-center w-full">
							{/* add overflow-y-scroll to dive below if want to add multiple images */}
							<div className="flex gap-4 flex-wrap max-h-[100px] w-full">
								{files.length === 0 && (
									<div>No File Chosen</div>
								)}
								{files.length > 0 &&
									files.map((file, index) => {
										return (
											<div
												key={file.lastModified}
												className="flex gap-1"
											>
												<div className="relative w-10 sm:w-14 h-10">
													<Image
														src={URL.createObjectURL(
															file
														)}
														alt=""
														fill
														sizes="48px"
													/>
												</div>
												<button
													onClick={() =>
														handleRemoveFile(index)
													}
												>
													<RiDeleteBin6Line
														size={18}
													/>
												</button>
											</div>
										);
									})}
							</div>
							<label className="relative cursor-pointer">
								<input
									ref={imagesInput}
									type="file"
									className="absolute w-0 h-0"
									accept="image/*"
									onChange={filesBtnHandler}
								/>
								<FaRegImages size={24} />
							</label>
						</div>
					</div>
				</div>

				<div className="text-[18px] font-semibold mx-auto text-center">
					Create Space
				</div>
				<div className="w-full h-1 bg-[#2e69ff] rounded-t"></div>

				<label htmlFor="space-title" className="font-semibold">
					Space Title <span className="font-normal">(required)</span>:
				</label>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					id="space-title"
					className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff] transition-all duration-300"
					placeholder="Enter The Space Title"
				/>
				<label htmlFor="space-content" className="font-semibold">
					Space Description :
				</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					id="space-content"
					rows={10}
					placeholder="Enter Description"
					className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff]  transition-all duration-300"
				/>
				<button
					disabled={title === "" || title.length < 2}
					onClick={addSpace}
					className="sm:hidden w-full mt-4 bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[15px] font-medium p-2 rounded-full transition duration-300"
				>
					Create
				</button>
			</div>
		</Modal>
	);
}
