import { useForm } from "react-hook-form";
import Checkbox from "../../shared/checkbox/Checkbox";
import Input from "../../shared/input/Input";
import PropTypes from "prop-types";

export default function Address({ handleAddressSubmit }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	function handleFormSubmit(data) {
		handleAddressSubmit(data);
	}

	function validations(type, value) {
		switch (type) {
			case "zipcode":
				if (value.length < 6 || value.length > 6)
					return "Zipcode should be 6 digits";
				break;

			case "contactNumber":
				if (value.length < 10 || value.length > 10)
					return "Contact Number should be 10 digits";
				break;

			default:
				return null;
		}
		return null;
	}

	return (
		<section className="checkout-address flex gap-2 flex-wrap">
			<Input
				type="text"
				name="firstName"
				register={register}
				errors={errors}
				placeholder="First Name"
				extraStyles="flex-1"
			/>
			<Input
				type="text"
				name="lastName"
				register={register}
				errors={errors}
				placeholder="Last Name"
				extraStyles="flex-1"
			/>
			<Input
				type="text"
				name="addressLine1"
				register={register}
				errors={errors}
				placeholder="Address"
			/>
			<Input
				type="text"
				name="addressLine2"
				register={register}
				errors={errors}
				placeholder="Address line 2 (optional)"
				optional
			/>
			<Input
				type="text"
				name="country"
				register={register}
				errors={errors}
				placeholder="Country"
				extraStyles="flex-1"
			/>
			<Input
				type="text"
				name="city"
				register={register}
				errors={errors}
				placeholder="City"
				extraStyles="flex-1"
			/>
			<Input
				type="number"
				name="zipcode"
				register={register}
				errors={errors}
				placeholder="Zipcode"
				extraStyles="flex-1"
				extraValidations={{
					validate: (value) => validations("zipcode", value),
				}}
			/>
			<Input
				type="number"
				name="contactNo"
				register={register}
				errors={errors}
				placeholder="Contact Number"
				extraValidations={{
					validate: (value) => validations("contactNumber", value),
				}}
			/>
			<Input
				type="text"
				name="optional"
				register={register}
				errors={errors}
				placeholder="Optional"
				optional
			/>
			<Checkbox
				label="Save contact information"
				setValue={() => {}}
				name="save_contact"
			/>
			<button
				type="button"
				data-testid="address-submit"
				onClick={handleSubmit(handleFormSubmit)}
				className="border-1 p-2 py-2.5 mt-2 bg-black w-full text-white font-medium cursor-pointer"
			>
				Continue to shipping
			</button>
		</section>
	);
}

Address.propTypes = {
	handleAddressSubmit: PropTypes.func.isRequired,
};
