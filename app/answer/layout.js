import Maintainence from "@/components/maintainence/main-page";
export const metadata = {
	title: "Answer",
	// description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
	return <Maintainence>{children}</Maintainence>;
}
