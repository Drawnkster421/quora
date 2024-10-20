import Maintainence from "@/components/maintainence/main-page";
export const metadata = {
	title: "Following",
};

export default async function RootLayout({ children }) {
	return <Maintainence>{children}</Maintainence>;
}
