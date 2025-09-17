import PropTypes from "prop-types";

export default function Checkbox({ name, checked, label, _type, setValue }) {
	function handleClick(val) {
		setValue({ name, checked: val.target.checked, type: _type });
	}

	return (
		<label className="flex gap-2 text-md items-center capitalize">
			<input
				type="checkbox"
				onChange={(e) => handleClick(e)}
				className="w-4 h-4"
				name={name}
				data-testid={_type}
				checked={checked}
			/>
			{label}
		</label>
	);
}

Checkbox.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	_type: PropTypes.string,
};
