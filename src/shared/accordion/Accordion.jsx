import { useState } from "react";
import PropTypes from "prop-types";
import { BiMinus, BiPlus } from "react-icons/bi";

export default function Accordion({ label, children }) {
	const [currState, setCurrState] = useState(false);

	return (
		<>
			<button
				onClick={() => setCurrState((prev) => !prev)}
				className="mt-3 w-full text-sm text-black font-light cursor-pointer"
				tabIndex={0}
			>
				<p className="flex justify-between">
					{label} {currState ? <BiMinus /> : <BiPlus />}
				</p>
				{currState && <>{children}</>}
			</button>
			<hr className="last:hidden border-black mt-2" />
		</>
	);
}

Accordion.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};
