"use client";
import { ThemeProvider } from "next-themes";

export default function NextThemeProvider({ props, children }) {
	return (
		<ThemeProvider
			{...props}
			attribute="class" // this tells how the theme is toggling, here using class
			defaultTheme="system"
			enableSystem // allow to use user's system theme
			disableTransitionOnChange // for smooth an quick toggle
		>
			{children}
		</ThemeProvider>
	);
}
