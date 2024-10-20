/******************  
	Here I am using nextAuth library for authorization.
	It logs in user and stores the name, email, id and jwt in a cookie
****************** */
import { userLogin } from "@/lib/actions";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	// maxAge is the life of the cookie in seconds, here 30 days.
	pages: { signIn: "/login", signOut: "/login" },
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ user, token }) {
			if (user?.status && user.status === "success") {
				token.name = user.data.name;
				token.email = user.data.email;
				token.id = user.data._id;
				token.jwt = user.token;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = { ...token };
			return session;
		},
	},
	// as of now I have only one provider, Credentials.
	providers: [
		CredentialsProvider({
			type: "credentials",
			name: "Credentials",
			async authorize(credentials, req) {
				const { email, password } = credentials;
				const body = {
					email: email,
					password: password,
					appType: "quora",
				};
				const res = await userLogin(body);
				if (res.message && res.message === "fail") {
					return null;
				}
				return res;
			},
		}),
	],
});
export { handler as GET, handler as POST };
