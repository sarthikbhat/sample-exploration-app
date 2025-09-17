import PropTypes from "prop-types";
export default function Input({
	type,
	name,
	placeholder,
	extraStyles,
	register,
	optional = false,
	errors,
	extraValidations,
}) {

	return (
		<div className={"flex flex-col w-full max-w-full " + extraStyles}>
			<input
				type={type}
				name={name}
				aria-invalid={errors[name] ? "true" : "false"}
				aria-label={name}
				placeholder={placeholder}
				{...register(name, { required: !optional, ...extraValidations })}
				className={
					"rounded-xs border-1 border-[#4e4f50] max-w-full outline-0 text-sm text-black p-2 pl-4 w-full appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " +
					(errors[name] ? "border-red-800 " : "border-[#4e4f50] ")
				}
			/>
			{errors[name] && errors[name].type === "required" && (
				<span role="alert" className="text-xs text-red-800">
					{errors[name].message || "This is required"}
				</span>
			)}
			{errors[name] && errors[name].type === "maxLength" && (
				<span role="alert" className="text-xs text-red-800">
					{errors[name].message || "Max length exceeded"}
				</span>
			)}

			{errors[name] && errors[name].type === "validate" && (
				<span role="alert" className="text-xs text-red-800">
					{errors[name].message || "Min length required"}
				</span>
			)}
		</div>
	);
}

Input.propTypes = {
	type: PropTypes.oneOf(["text", "number", "email"]).isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	extraStyles: PropTypes.string,
	optional: PropTypes.bool,
	register: PropTypes.any.isRequired,
	errors: PropTypes.any,
	extraValidations: PropTypes.any,
};
