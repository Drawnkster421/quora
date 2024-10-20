export default function Advertisements({ className }) {
	return (
		<div
			className={
				className +
				" sticky flex flex-col justify-end gap-4 w-[340px] h-[575px] pt-2 border bg-[#f7f7f8] dark:bg-[#202020] dark:border-[#262626]"
			}
		>
			<iframe
				data-creative-load-listener=""
				id="200_278_express_html_inpage_0.if"
				src="https://s0.2mdn.net/sadbundle/12492554015069590311/index.html?ev=01_250"
				width="300"
				height="250"
				allowFullScreen={true}
				style={{ width: 300, height: 250 }}
				className="mx-[20px]"
			></iframe>
			<iframe
				data-creative-load-listener=""
				id="200_278_express_html_inpage_0.if"
				src="https://s0.2mdn.net/sadbundle/12492554015069590311/index.html?ev=01_250"
				width="300"
				height="250"
				allowFullScreen={true}
				style={{ width: 300, height: 250 }}
				className="mx-[20px]"
			></iframe>
			<div className="w-[340px] text-center py-2 text-xs text-[#939598] dark:text-[#8e9092] border dark:border-[#393839] dark:bg-[#262626]">
				Advertisements
			</div>
		</div>
	);
}
