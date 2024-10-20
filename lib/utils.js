import DarkThemeImg from "@/components/home/navbar/themes/dark-svg";
import LightThemeImg from "@/components/home/navbar/themes/light-svg";
import SytemThemeImg from "@/components/home/navbar/themes/system-svg";
import AnswerIcon from "@/components/nav-icons/answer-icon";
import AnswerIconFilled from "@/components/nav-icons/answer-icon-filled";
import FollowingIcon from "@/components/nav-icons/following-icon";
import FollowingIconFilled from "@/components/nav-icons/following-icon-filled";
import HomeIcon from "@/components/nav-icons/home-icon";
import HomeIconFilled from "@/components/nav-icons/home-icon-filled";
import NotificationIcon from "@/components/nav-icons/notification-icon";
import NotificationIconFilled from "@/components/nav-icons/notification-icon-filled";
import SpacesIcon from "@/components/nav-icons/spaces-icon";
import SpacesIconFilled from "@/components/nav-icons/spaces-icon-filled";
import cover1 from "@/assets/spaces-bg-1.webp";
import cover2 from "@/assets/spaces-bg-2.webp";
import cover3 from "@/assets/spaces-bg-3.webp";
import cover4 from "@/assets/spaces-bg-4.webp";
import cover5 from "@/assets/spaces-bg-5.webp";

export function isValidPassord(pass) {
	// to match for a passwored of atleaset 8 characters and has a lowercase alphabet,
	// a uppercase alphabet, a digit and no special sysmbols.
	// const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	// const pattern = /^[ A-Za-z0-9_@./#&+-]*$/;
	// if (!password) return pattern.test(password);
	let password = pass.toLowerCase();
	if (password.length < 6) {
		return "Password should contain atleast 6 characters.";
	}
	if (!password.match(/[a-zA-Z]/)) {
		return "Password should contain atleast 1 alphabet";
	}
	if (!password.match(/\d/)) {
		return "Password should contain atleast 1 digit";
	}
	return "valid";
}
export function isValidEmail(email) {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern.test(email);
}
export const projectID = "8kb9c2pokhxg";

export const NAV_ICONS = [
	{
		path: "",
		Icon: HomeIcon,
		ActiveIcon: HomeIconFilled,
	},
	{
		path: "following",
		Icon: FollowingIcon,
		ActiveIcon: FollowingIconFilled,
	},
	{
		path: "answer",
		Icon: AnswerIcon,
		ActiveIcon: AnswerIconFilled,
	},
	{
		path: "spaces",
		Icon: SpacesIcon,
		ActiveIcon: SpacesIconFilled,
	},
	{
		path: "notifications",
		Icon: NotificationIcon,
		ActiveIcon: NotificationIconFilled,
	},
];
export const THEMES = [
	{ name: "Light", ThemeImage: LightThemeImg },
	{ name: "Dark", ThemeImage: DarkThemeImg },
	{
		name: "Auto",
		ThemeImage: SytemThemeImg,
		description:
			"Select this theme to apply your system settings if supported.",
	},
];

export const COVER_IMAGES_SPACES = [cover1, cover2, cover3, cover4, cover5];
