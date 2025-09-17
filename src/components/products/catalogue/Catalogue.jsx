import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoader } from "../../../hooks/useLoader";
import { BiStar } from "react-icons/bi";
import { STRING_UTILS } from "../../../utils/stringUtils";
import { getAllFilters } from "../../../store/slices/filter";
import { fetchProducts } from "../../../api/products";

export default function Catalogue() {
	const LIMIT = 6;
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortType, setSortType] = useState(STRING_UTILS.ASC);
	const [products, setProducts] = useState([]);
	const filters = useSelector(getAllFilters);
	const { setIsLoading } = useLoader();

	async function fetchData(
		initial = false,
		page = 1,
		sort = STRING_UTILS.ASC,
		controller = null
	) {
		const apiArgs = { controller, filters, page, sort, limit: LIMIT };
		setIsLoading(true);
		const data = await fetchProducts(apiArgs);
		setIsLoading(false);

		if (data) {
			initial
				? setProducts(data.products)
				: setProducts([...products, ...data.products]);
			setTotalPages(data.totalPages);
			setCurrentPage(data.currentPage);
		}
	}

	useEffect(() => {
		fetchData(true, 1, STRING_UTILS.ASC);
		return () => {};
	}, [filters]);

	function loadMoreProducts() {
		let currPage = currentPage;
		setCurrentPage((prev) => prev + 1);
		fetchData(false, currPage + 1, sortType);
	}

	function sortProducts(value) {
		setCurrentPage(1);
		setSortType(value);
		fetchData(true, 1, value);
	}

	return (
		<section className="flex-1 md:flex-[0.8] lg:flex-1 flex flex-col gap-4">
			{products.length > 0 ? (
				<>
					<section className="catalogue-sort-outer flex justify-end">
						<div className="flex flex-col">
							<div className="flex gap-2 border-1 p-1.5 md:p-2 justify-center w-fit text-sm md:text-md ">
								<div className="font-normal text-[#4e4f50]">Sort By</div>
								<select
									className="outline-0 font-medium"
									defaultValue={STRING_UTILS.ASC}
									onChange={(e) => sortProducts(e.target.value)}
									name="sortby"
									aria-label="sortby"
								>
									<option value={STRING_UTILS.ASC}>Ascending</option>
									<option value={STRING_UTILS.DESC}>Descending</option>
								</select>
							</div>
							<span className="text-xs md:text-sm text-right mt-2">
								Showing {products.length} Products
							</span>
						</div>
					</section>
					<section className="all-catalogue mt-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
						{products.map((product) => {
							return (
								<Link
									to={`/product/${product.id}`}
									className="product flex flex-col gap-0.5"
									key={product.id + product.title}
								>
									<img
										data-testid="products-image"
										className="w-full h-70 after:bg-gray-300"
										alt={product.title}
										src={product.image}
									/>
									<div className="flex justify-between">
										<p className="font-light text-sm text-black/75 capitalize">
											{product.category}
										</p>
										<p className="flex gap-2 items-center">
											{product.rating} <BiStar />
										</p>
									</div>
									<p className="font-medium text-md truncate">
										{product.title}
									</p>
									<p>$ {product.price}</p>
								</Link>
							);
						})}
					</section>
					{currentPage !== totalPages && !!products.length && (
						<button
							type="button"
							data-testid="button-load-more"
							className="border-1 p-3 mt-10 m-auto w-20 md:w-[30%] font-medium cursor-pointer"
							onClick={() => loadMoreProducts()}
						>
							Load More Products
						</button>
					)}
				</>
			) : (
				<p className="text-2xl text-black/75 font-light text-center mt-30">
					No items to show !!
				</p>
			)}
		</section>
	);
}
