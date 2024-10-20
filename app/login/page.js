import Login from "@/components/login-signup/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginComponent() {
	const session = await getServerSession();
	// If a logged in user tries to visit the login page he/she is redirected to home page.
	if (session) {
		redirect("/");
	} else {
		return <Login />;
	}
}
