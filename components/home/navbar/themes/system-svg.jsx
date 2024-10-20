import DarkThemeImg from "./dark-svg";
import LightThemeImg from "./light-svg";

export default function SytemThemeImg() {
	return (
		<div className="relative w-full overflow-hidden">
			<div className="w-full">
				<LightThemeImg />
			</div>
			<div className="z-10 absolute left-1/2 top-0 w-1/2 overflow-hidden">
				<div className="w-[200%] -translate-x-1/2">
					<DarkThemeImg />
				</div>
			</div>
		</div>
	);
}
