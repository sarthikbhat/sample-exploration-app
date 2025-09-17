import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { STRING_UTILS } from "../../utils/stringUtils";

export default function Pagination({
	totalItems,
	perPage = 8,
	handlePagination,
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / perPage));

	useEffect(() => {
		setTotalPages(Math.ceil(totalItems / perPage));
	}, [totalItems, perPage]);

	useEffect(() => {
		handlePagination(0, perPage);
		setCurrentPage(1);
	}, []);

	function calculateNewOffsets(currPage) {
		const start = (currPage - 1) * perPage;
		const end = start + perPage;
		handlePagination(start, end);
	}

	function paginate(type) {
		if (type === STRING_UTILS.NEXT) {
			const currPage = currentPage + 1;
			if (currPage <= totalPages) {
				setCurrentPage(currPage);
				calculateNewOffsets(currPage);
			}
		}
		if (type === STRING_UTILS.PREV) {
			const currPage = currentPage - 1;
			if (currPage >= 1) {
				setCurrentPage(currPage);
				calculateNewOffsets(currPage);
			}
		}
		if (type === STRING_UTILS.LAST) {
			const currPage = totalPages;
			setCurrentPage(currPage);
			calculateNewOffsets(currPage);
		}
		if (type === STRING_UTILS.FIRST) {
			const currPage = 1;
			setCurrentPage(currPage);
			calculateNewOffsets(currPage);
		}
	}

	return (
		<section className="orders-paginate w-full flex justify-center">
			<div className="flex gap-4 justify-center items-center border-1 border-black w-fit p-2 px-10 rounded-md shadow-2xs">
				<RxDoubleArrowLeft
					data-testid={STRING_UTILS.FIRST}
					aria-disabled={currentPage === 1}
					onClick={() => paginate(STRING_UTILS.FIRST)}
					className={
						"text-xl cursor-pointer " +
						(currentPage === 1 && "text-black cursor-not-allowed")
					}
				/>
				<RiArrowLeftSLine
					data-testid={STRING_UTILS.PREV}
					aria-disabled={currentPage === 1}
					onClick={() => paginate(STRING_UTILS.PREV)}
					className={
						"text-xl cursor-pointer " +
						(currentPage === 1 && "text-black cursor-not-allowed")
					}
				/>
				<p>
					{currentPage} of {totalPages}
				</p>
				<RiArrowRightSLine
					data-testid={STRING_UTILS.NEXT}
					onClick={() => paginate(STRING_UTILS.NEXT)}
					className={
						"text-xl cursor-pointer " +
						(currentPage === totalPages && "text-black cursor-not-allowed")
					}
					aria-disabled={currentPage === totalPages}
				/>
				<RxDoubleArrowRight
					data-testid={STRING_UTILS.LAST}
					aria-disabled={currentPage === totalPages}
					onClick={() => paginate(STRING_UTILS.LAST)}
					className={
						"text-xl cursor-pointer " +
						(currentPage === totalPages && "text-black cursor-not-allowed")
					}
				/>
			</div>
		</section>
	);
}

Pagination.propTypes = {
	totalItems: PropTypes.number.isRequired,
	perPage: PropTypes.number.isRequired,
	handlePagination: PropTypes.func.isRequired,
};
