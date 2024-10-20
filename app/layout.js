import NextThemeProvider from "@/components/contexts/theme-provider";
import "./globals.css";
import Session from "@/components/contexts/session-provider";
import { getServerSession } from "next-auth";
import Navbar from "@/components/home/navbar/navbar";
import DataContextProvider from "@/components/contexts/data-provider";
import GlobalLoader from "@/components/common/global-loader";
import "react-toastify/dist/ReactToastify.css";
import MessageBox from "@/components/common/message-box";

export const metadata = {
	title: "Quora - A place to share knowledge and better understand the world",
};

export default async function RootLayout({ children }) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body>
				<Session>
					{/* To provide access to useSession to child components */}
					<DataContextProvider>
						<NextThemeProvider>
							{session && <Navbar />}
							{/* To load Navbar only when user is logged in */}
							<div className="bg-[#F1F2F2] dark:bg-[#181818] flex justify-center">
								{children}
								<div id="portal"></div>
							</div>
							<MessageBox />
							<GlobalLoader />
						</NextThemeProvider>
					</DataContextProvider>
				</Session>
			</body>
		</html>
	);
}
