"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { RxCross2 } from "react-icons/rx";
import { isValidEmail, isValidPassord } from "@/lib/utils";
import ErrorBox from "./error-box";
const input =
	"outline-none border-2 border-[#dee0e1] py-3 px-2 rounded hover:border-[rgba(45,105,255,0.6)] dark:hover:border-[rgba(45,105,255,0.4)] focus:border-[rgb(46,105,255)] dark:focus:border-[rgb(46,105,255)] focus:shadow-[rgb(235,240,255)0px0px0px2px] transition-colors placeholder:text-[10px] md:placeholder:text-[12px] dark:bg-[#181818] dark:border-[#393839]";
export default function Signup({ show, setShow, setReadyToLogIn }) {
	const [ready, setReady] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [isValidName, setIsValidName] = useState(true);
	const [hasErrorEmail, setHasErrorEmail] = useState(false);
	const [hasErrorPassword, setHasErrorPassword] = useState(false);
	const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
	const [passNotMatching, setPassNotMatching] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [signupFail, setSignupFail] = useState(false);
	async function handleSignup(e) {
		setLoading(true);
		e.preventDefault();
		const data = await fetch("/api/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name,
				email: email,
				password: pass,
			}),
		});
		const res = await data.json();
		if (res.message === "User already exists") {
			setErrorMessage(res.message);
		} else if (
			res.message === "Some Error Occured. Please try again later."
		) {
			setSignupFail(true);
		} else {
			setShow(false);
			setReadyToLogIn(true);
		}
		setLoading(false);
	}
	useEffect(() => {
		setReady(true);
	}, []);
	useEffect(() => {
		const nameTimeout = setTimeout(() => {
			if (name !== "") setIsValidName(name.length >= 3);
		}, 1000);
		return () => {
			clearTimeout(nameTimeout);
		};
	}, [name]);
	useEffect(() => {
		const emailTimeout = setTimeout(() => {
			if (email !== "") setHasErrorEmail(!isValidEmail(email));
		}, 1000);
		return () => {
			clearTimeout(emailTimeout);
		};
	}, [email]);
	useEffect(() => {
		const passTimeOut = setTimeout(() => {
			if (pass !== "") {
				setHasErrorPassword(isValidPassord(pass) !== "valid");
				setPasswordErrorMsg(isValidPassord(pass));
			}
		}, 1000);
		return () => {
			clearTimeout(passTimeOut);
		};
	}, [pass]);
	useEffect(() => {
		const passTimeout = setTimeout(() => {
			if (pass !== "" && confirmPass !== "")
				setPassNotMatching(pass !== confirmPass);
		}, 1000);
		return () => {
			clearTimeout(passTimeout);
		};
	}, [pass, confirmPass]);

	return (
		ready &&
		show &&
		createPortal(
			<div className="absolute w-full h-full flex justify-center items-center bg-black/75 top-0 left-0 px-10">
				<div className="bg-white border border-[#dee0e1] rounded-xl	md:w-[600px] w-full flex flex-col md:text-[14px] text-[12px] dark:bg-[#181818] dark:border-[#393839]">
					<button
						type="button"
						className="rounded-full w-fit p-2 hover:bg-slate-700/5 mt-2 ml-4"
						onClick={() => setShow(false)}
					>
						<RxCross2 size={24} />
					</button>
					<form
						className="px-6 pb-5 border-b dark:border-[#393839] flex flex-col gap-3"
						onSubmit={handleSignup}
					>
						<div className="font-bold text-[18px]">Sign Up</div>
						<div className="flex flex-col">
							<label
								htmlFor="signupName"
								className="font-bold text-[13px] mb-1"
							>
								Name
							</label>
							<input
								className={input}
								type="text"
								id="signupName"
								placeholder="What would you like to be called?"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									setErrorMessage("");
								}}
							/>
							{name !== "" && !isValidName && (
								<ErrorBox
									message={
										"Name must have atleast 3 letters!"
									}
								/>
							)}
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="signupEmail"
								className="font-bold text-[13px] mb-1"
							>
								Email
							</label>
							<input
								className={input}
								type="email"
								id="signupEmail"
								placeholder="Your email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setErrorMessage("");
								}}
							/>
							{email !== "" && hasErrorEmail && (
								<ErrorBox message={"Invalid Email!"} />
							)}
							{errorMessage !== "" && (
								<ErrorBox message={errorMessage} />
							)}
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="signupPass"
								className="font-bold text-[13px] mb-1"
							>
								Password
							</label>
							<input
								className={input}
								type="password"
								id="signupPass"
								placeholder="Create a password"
								value={pass}
								onChange={(e) => {
									setPass(e.target.value);
									setErrorMessage("");
								}}
							/>
							{pass !== "" && hasErrorPassword && (
								<ErrorBox message={passwordErrorMsg} />
							)}
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="signupConfirmPass"
								className="font-bold text-[13px] mb-1"
							>
								Confirm Password
							</label>
							<input
								className={input}
								type="password"
								id="signupConfirmPass"
								placeholder="Re-enter password"
								value={confirmPass}
								onChange={(e) => {
									setConfirmPass(e.target.value);
									setErrorMessage("");
								}}
							/>
							{pass !== "" &&
								confirmPass !== "" &&
								passNotMatching && (
									<ErrorBox
										message={"Passwords are not matching!"}
									/>
								)}
						</div>
						{signupFail && (
							<ErrorBox
								message={
									"Oops! Some Error Occured. Please try again later."
								}
							/>
						)}
					</form>
					<button
						disabled={
							!(
								name !== "" &&
								isValidName &&
								email !== "" &&
								!hasErrorEmail &&
								pass !== "" &&
								!hasErrorPassword &&
								confirmPass !== "" &&
								!passNotMatching &&
								errorMessage === "" &&
								!signupFail
							) || loading
						}
						className="px-5 font-medium bg-[#2e69ff] w-fit self-center text-[#fff] h-10 rounded-full hover:bg-[rgb(26,90,255)] disabled:opacity-40 disabled:bg-blue-500 disabled:text-slate-300 my-3"
						onClick={handleSignup}
					>
						Signup
					</button>
				</div>
			</div>,
			document.getElementById("portal")
		)
	);
}
