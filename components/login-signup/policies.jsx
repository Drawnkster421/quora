"use client";
import { useEffect, useState } from "react";
import Signup from "./signup";
import { useDataContext } from "../contexts/data-provider";
export default function Policies() {
	const [showSignUp, setShowSignUp] = useState(false);
	const [readToLogin, setReadyToLogIn] = useState(false);
	const { stopGlobalLoader } = useDataContext();
	useEffect(() => {
		stopGlobalLoader();
	}, []);
	return (
		<div className="w-full flex flex-col gap-2 sm:gap-7 sm:px-6 px-4 pb-4 border-r border-[#dee0e1] dark:border-[#393839]">
			<div className="text-[#939598] text-[12px] sm:text-[13px] text-center">
				By continuing you indicate that you agree to Quora’s Terms of
				Service and Privacy Policy.
			</div>
			<div className="flex flex-col gap-2">
				<div className="hidden sm:flex gap-3 border p-2 items-center hover:bg-black/5 dark:border-[#393839] dark:bg-[#181818]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fillRule="evenodd"
						viewBox="0 0 24 24"
						style={{
							height: "28px",
							width: "28px",
						}}
					>
						<path
							d="M20.16 12.193c0-.603-.054-1.182-.155-1.739H12v3.288h4.575a3.91 3.91 0 0 1-1.696 2.565v2.133h2.747c1.607-1.48 2.535-3.659 2.535-6.248z"
							fill="#4285f4"
						></path>
						<path
							d="M12 20.5c2.295 0 4.219-.761 5.625-2.059l-2.747-2.133c-.761.51-1.735.811-2.878.811-2.214 0-4.088-1.495-4.756-3.504h-2.84v2.202A8.497 8.497 0 0 0 12 20.5z"
							fill="#34a853"
						></path>
						<path
							d="M7.244 13.615A5.11 5.11 0 0 1 6.977 12a5.11 5.11 0 0 1 .267-1.615V8.183h-2.84C3.828 9.33 3.5 10.628 3.5 12s.328 2.67.904 3.817l2.84-2.202z"
							fill="#fbbc05"
						></path>
						<path
							d="M12 6.881c1.248 0 2.368.429 3.249 1.271l2.438-2.438C16.215 4.342 14.291 3.5 12 3.5a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202C7.912 8.376 9.786 6.881 12 6.881z"
							fill="#ea4335"
						></path>
					</svg>
					<p className="sm:text-[13px] text-[12px]">
						Continue with Google <span>(Coming Soon)</span>
					</p>
				</div>
				<div className="hidden sm:flex gap-3 border p-2 items-center hover:bg-black/5 dark:border-[#393839] dark:bg-[#181818]">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							height: "28px",
							width: "28px",
						}}
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M20.5 12a8.5 8.5 0 1 0-9.83 8.397v-5.94H8.513v-2.458h2.159v-1.872c0-2.13 1.269-3.307 3.21-3.307.93 0 1.903.166 1.903.166v2.091h-1.072c-1.056 0-1.385.656-1.385 1.328V12h2.358l-.377 2.457h-1.98v5.94A8.503 8.503 0 0 0 20.5 12Z"
							fill="#1877F2"
						></path>
					</svg>
					<p className="sm:text-[13px] text-[12px]">
						Continue with Facebook <span>(Coming Soon)</span>
					</p>
				</div>
				<button
					className="text-[#fff] font-medium text-[13px] py-2 rounded-full bg-[#2e69ff] hover:bg-[rgb(26,90,255)] dark:hover:bg-[rgba(255,255,255,0.04)] transition"
					onClick={() => setShowSignUp(true)}
				>
					Sign Up
				</button>
				{readToLogin && (
					<div className="bg-[#ebf0ff] dark:bg-[#282d41] text-[#2e69ff] dark:text-[#4894fd] rounded p-4">
						Congrats!! Your account has been created. You can now
						use those credentials to login.
					</div>
				)}
			</div>
			{showSignUp && (
				<Signup
					show={showSignUp}
					setShow={setShowSignUp}
					setReadyToLogIn={setReadyToLogIn}
				/>
			)}
		</div>
	);
}
