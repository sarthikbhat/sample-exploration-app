export default function Footer() {
	return (
		<footer className="flex flex-col items-center pt-8 mt-10 border-t-[1px] border-[#a6a8ac]">
			<section className="w-full md:px-28">
				<h3 className="font-medium text-lg text-center mb-5">Useful Links</h3>
				<div className="flex justify-center gap-4 md:gap-20">
					{[...Array(4).keys()].map((elm) => {
						return (
							<div key={elm}>
								<span className="font-semibold pb-20">Lorem Ipsum</span>
								<ul className="text-xs md:text-lg">
									<li>
										<a href="/">Lorem</a>
									</li>
									<li>
										<a href="/">Lorem</a>
									</li>
									<li>
										<a href="/">Lorem</a>
									</li>
									<li>
										<a href="/">Lorem</a>
									</li>
								</ul>
							</div>
						);
					})}
				</div>
			</section>
			<section className="banner bg-black uppercase text-[#eef2f8] text-center text-xs md:text-md lg:text-lg px-2 mt-5 w-full">
				Copyrights site.com. All rights reserved
			</section>
		</footer>
	);
}
