import { getServerSession } from "next-auth";

export const metadata = {
	title: "Search",
};

export default async function RootLayout({ children }) {
	const session = await getServerSession();
	return (
		<div className="pt-[88px] md:pt-14 min-h-screen w-full pb-4">
			<div className="w-full md:w-9/12 mx-auto flex gap-4 md:pt-4">
				{session && children}
			</div>
		</div>
	);
}
