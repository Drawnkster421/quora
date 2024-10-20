import { projectID } from "@/lib/utils";

// GET function is just for show.
export async function GET(req) {
	return Response.json({ message: "got it" });
}
// this function is called when the user tries to signup
export async function POST(req) {
	const body = await req.json();
	try {
		const data = await fetch(
			"https://academics.newtonschool.co/api/v1/user/signup",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					projectID: projectID,
				},
				body: JSON.stringify({ ...body, appType: "quora" }),
			}
		);
		const res = await data.json();
		// here I return the customized message based on the message returned by the signup Api.
		if (res.message && res.message === "User already exists") {
			return Response.json({
				message: "User already exists",
			});
		}
		return Response.json({ message: "Successful" });
	} catch (error) {
		return Response.json({
			mesaage: "Some Error Occured. Please try again later.",
		});
	}
}
