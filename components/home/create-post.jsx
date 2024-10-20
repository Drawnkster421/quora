"use client";
import Modal from "../common/modal";
import { RxCross2 } from "react-icons/rx";
import { FaRegImages } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRef, useState } from "react";
import { createAPost } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useDataContext } from "../contexts/data-provider";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function CreatePost({ show, setShow }) {
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const { data: session, status } = useSession();
	const { setReloadPosts, startGlobalLoader } = useDataContext();
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
		setTitle("");
		setDescription("");
		setFiles([]);
	}
	async function addPost() {
		// Since we are posting images we need to post in formData
		const formData = new FormData();
		formData.append("title", title);
		setTitle("");
		if (description) {
			formData.append("content", description);
			setDescription("");
		}
		if (files.length > 0) {
			for (let file of files) formData.append("images", file);
			setFiles([]);
		}

		const data = await createAPost(session.user.jwt, formData);
		closeModal();
		if (data.message === "success") {
			toast.success("Post created.");
			startGlobalLoader();
			router.push(`/posts/${data.id}`);
		} else {
			toast.error("OOPS! Some error occurred.");
		}
	}
	return (
		<Modal show={show} close={closeModal}>
			<div className="h-screen w-screen md:h-fit md:max-h-screen md:max-w-[600px] bg-white dark:bg-[#181818] rounded-lg py-6 px-3 sm:px-6 flex flex-col items-start gap-2">
				<div className="w-full flex justify-between items-center">
					<div className="flex gap-4 items-center">
						<button
							onClick={closeModal}
							className="rounded-full p-[6px] flex-shrink-0 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#ffffff15] transition duration-300"
						>
							<RxCross2 size={24} />
						</button>
						<button
							disabled={title === "" || title.length < 2}
							onClick={addPost}
							className="hidden sm:block bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[13px] sm:text-[15px] font-medium p-2 sm:p-3 rounded-full transition duration-300"
						>
							Add Post
						</button>
					</div>
					<div className="px-3 sm:px-5 flex justify-between items-center ">
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
									multiple
									accept="image/*"
									onChange={filesBtnHandler}
								/>
								<FaRegImages size={24} />
							</label>
						</div>
					</div>
				</div>

				<div className="text-[18px] font-semibold mx-auto text-center">
					Create Post
				</div>
				<div className="w-full h-1 bg-[#2e69ff] rounded-t"></div>
				<div className="p-3 w-full bg-[#ebf0ff] dark:bg-[#282d41] text-[#2e69ff] dark:text-[#4894fd] rounded-md text-[12px] sm:text-[15px]">
					<div className="font-bold">
						Tips on getting good answers quickly
					</div>
					<ul className="list-disc list-inside">
						<li>
							Make sure your question has not been asked already
						</li>
						<li>Keep your question short and to the point</li>
						<li>Double-check grammar and spelling</li>
					</ul>
				</div>

				<label htmlFor="post-title" className="font-semibold">
					Post Title <span className="font-normal">(required)</span>:
				</label>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					id="post-title"
					className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff] transition-all duration-300"
					placeholder="Enter The Question or Title"
				/>
				<label htmlFor="post-content" className="font-semibold">
					Post Description :
				</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					id="post-content"
					rows={10}
					placeholder="Enter Description or Answer"
					className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff]  transition-all duration-300"
				/>
				<button
					disabled={title === "" || title.length < 2}
					onClick={addPost}
					className="sm:hidden w-full mt-4 bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[15px] font-medium p-2 rounded-full transition duration-300"
				>
					Add Post
				</button>
			</div>
		</Modal>
	);
}
