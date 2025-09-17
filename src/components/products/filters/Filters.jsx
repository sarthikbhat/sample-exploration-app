import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../../../hooks/useLoader";
import {
	addCategoryAction,
	addRatingAction,
	clearFilterAction,
	getAllFilters,
	removeCategoryAction,
	removeRatingAction,
	updateMaxPriceAction,
	updateMinPriceAction,
} from "../../../store/slices/filter";
import Checkbox from "../../../shared/checkbox/Checkbox";
import { STRING_UTILS } from "../../../utils/stringUtils";
import { fetchProductCategories } from "../../../api/products";

export default function Filters() {
	const [categories, setCategories] = useState([]);
	const [currState, setCurrState] = useState(false);
	const [isMobileSize, setIsMobileSize] = useState(false);
	const apiCalled = useRef(false);
	const dispatch = useDispatch();
	const filters = useSelector(getAllFilters);
	const { setIsLoading } = useLoader();

	async function fetchData() {
		setIsLoading(true);
		const data = await fetchProductCategories();
		setIsLoading(false);
		setCategories(data);
	}

	function handleResizeListener() {
		if (window.innerWidth < 768) {
			setIsMobileSize(true);
		} else {
			setIsMobileSize(false);
		}
	}

	useEffect(() => {
		if (!apiCalled.current) {
			handleResizeListener();
			fetchData();
			apiCalled.current = true;
		}
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleResizeListener);

		return () => window.removeEventListener("resize", handleResizeListener);
	}, []);

	function getCheckboxValue(value) {
		if (value.type === STRING_UTILS.CATEGORY) {
			if (value.checked) dispatch(addCategoryAction(value.name));
			else dispatch(removeCategoryAction(value.name));
		} else if (value.type === STRING_UTILS.RATING) {
			if (value.checked) dispatch(addRatingAction(value.name));
			else dispatch(removeRatingAction(value.name));
		}
	}

	function handleInputChange(value, type) {
		if (type === "min") dispatch(updateMinPriceAction(value));
		else if (type === "max") dispatch(updateMaxPriceAction(value));
	}

	return (
		<section className="w-full md:flex-[0.37] flex flex-col translate-y-8 gap-6  md:relative z-10 ">
			<div className="flex items-center gap-4">
				{isMobileSize ? (
					<button
						tabIndex={0}
						className="text-lg font-normal"
						onClick={() => setCurrState((prev) => !prev)}
					>
						Filters
					</button>
				) : (
					<h4 className="text-lg font-normal">Filters</h4>
				)}
				<button
					onClick={() => dispatch(clearFilterAction())}
					className="text-xs underline font-light text-[#4e4f50] cursor-pointer"
				>
					Clear Filters
				</button>
			</div>
			{(currState || !isMobileSize) && (
				<>
					<span className="text-sm font-medium">Categories</span>
					<ul className="flex flex-wrap gap-2 md:flex-col">
						{!!categories.length &&
							categories.map((category) => {
								return (
									<li className="max-w-[50%]" key={category}>
										<Checkbox
											name={category}
											checked={filters.categories.includes(category)}
											_type={STRING_UTILS.CATEGORY}
											label={category}
											setValue={getCheckboxValue}
										/>
									</li>
								);
							})}
					</ul>
					<div>
						<span className="text-sm font-medium">Price Range </span>
						<div className="flex gap-2 max-w-[20%] mt-3">
							<input
								type="number"
								className="border-1 border-[#4e4f50] max-w-full outline-0 text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								name="min"
								id="min"
								autoComplete="off"
								value={filters.minPrice}
								placeholder="Min"
								min={0}
								max={999999999}
								onChange={(e) => handleInputChange(e.target.value, "min")}
							/>
							<input
								type="number"
								className="border-1 border-[#4e4f50] max-w-full outline-0 text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								name="max"
								id="max"
								value={filters.maxPrice}
								placeholder="Max"
								min={0}
								max={999999999}
								autoComplete="off"
								onChange={(e) => handleInputChange(e.target.value, "max")}
							/>
						</div>
					</div>
					<span className="text-sm font-medium">Customer Rating</span>
					<ul>
						<li className="">
							<Checkbox
								name="4"
								label="4 ⭐️ &
						above"
								_type={STRING_UTILS.RATING}
								setValue={getCheckboxValue}
								checked={filters.rating.includes("4")}
							/>
						</li>
						<li>
							<Checkbox
								name="3"
								label="3 ⭐️ &
						above"
								_type={STRING_UTILS.RATING}
								setValue={getCheckboxValue}
								checked={filters.rating.includes("3")}
							/>
						</li>
					</ul>
				</>
			)}
		</section>
	);
}
