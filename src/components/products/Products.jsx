import Catalogue from "./catalogue/Catalogue";
import Filters from "./filters/Filters";

export default function Products() {
	return (
		<>
			<section className="products p-2 px-2 md:px-14 lg:px-28">
				<section className="app-hero">
					<h1 className="text-3xl md:text-3xl my-6 mt-8 font-medium">
						E-Commerce Shop App
					</h1>
					<p className="text-md w-full md:w-[40%] text-[#4e4f50] font-light leading-6">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
						architecto repellat voluptatibus illum, sequi laudantium recusandae
						quia rem delectus asperiores.
					</p>
				</section>
				<section className="app-products flex mt-10 flex-wrap">
					<Filters />
					<Catalogue />
				</section>
			</section>
		</>
	);
}
