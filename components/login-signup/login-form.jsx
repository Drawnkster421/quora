"use client";
import { useEffect, useState } from "react";
import { login } from "@/lib/actions";
import { signIn } from "next-auth/react";
import { isValidEmail } from "@/lib/utils";
import ErrorBox from "./error-box";
import { useRouter } from "next/navigation";
import { useDataContext } from "../contexts/data-provider";
const label = "text-[13px] font-bold w-fit mb-2";
const input =
	"outline-none border-2 border-[#dee0e1] py-3 px-2 rounded hover:border-[#2d69ff99] dark:hover:border-[rgba(45,105,255,0.4)] focus:border-[#2e69ff] dark:focus:border-[#2e69ff] focus:shadow-[rgb(235,240,255)0px0px0px2px] transition-colors dark:bg-[#181818] dark:border-[#393839]";
const btn =
	"px-5 font-medium bg-[#2e69ff] w-fit self-center text-[#fff] h-10 rounded-full hover:bg-[rgb(26,90,255)] disabled:opacity-40 disabled:bg-blue-500 disabled:text-slate-300 transition";
export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [hasErrorEmail, setHasErrorEmail] = useState(false);
	const [loginFail, setLoginFail] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const { startGlobalLoader, stopGlobalLoader } = useDataContext();
	const router = useRouter();
	async function handleLogin(e) {
		setLoading(true);
		startGlobalLoader();
		e.preventDefault();
		const res = await signIn("credentials", {
			redirect: false,
			email: email,
			password: password,
		});
		// const data = await res.json();
		if (!res.error) {
			router.push("/");
			router.refresh();
			return;
		}
		if (res.status === 401) {
			setLoginFail(true);
			setErrorMessage("Incorrect EmailId or Password");
		} else {
			setLoginFail(true);
			setErrorMessage(
				"OOPS! Some error occured. Please try again later."
			);
		}
		stopGlobalLoader();
		setLoading(false);
	}
	useEffect(() => {
		const emailTimeout = setTimeout(() => {
			if (email !== "") setHasErrorEmail(!isValidEmail(email));
		}, 300);
		return () => {
			clearTimeout(emailTimeout);
		};
	}, [email]);
	return (
		<div className="sm:px-6 px-4 flex flex-col gap-3 mb-4">
			<div className="border-b border-[#dee0e1] pb-3 font-medium dark:border-[#393839]">
				<p>Login</p>
			</div>
			<form className="flex flex-col gap-4" onSubmit={handleLogin}>
				<div className="flex flex-col">
					<label htmlFor="email" className={label}>
						Email
					</label>
					<input
						className={input}
						type="email"
						name="email"
						id="email"
						placeholder="Your email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setLoginFail(false);
						}}
					/>
					{email !== "" && hasErrorEmail && (
						<ErrorBox message={"Invalid Email!"} />
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="password" className={label}>
						Password
					</label>
					<input
						className={input}
						type="password"
						name="password"
						id="password"
						placeholder="Your password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							setLoginFail(false);
						}}
					/>
				</div>
				{loginFail && <ErrorBox message={errorMessage} />}
				<button
					disabled={!(password !== "" && !hasErrorEmail) || loading}
					className={btn}
				>
					Login
				</button>
			</form>
		</div>
	);
}
