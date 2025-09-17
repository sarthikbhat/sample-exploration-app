import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "../../shared/input/Input";

export default function Payment({ handlePaymentSubmit }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	function handleFormSubmit(data) {
		handlePaymentSubmit(data);
	}

	function validations(type, value) {
		switch (type) {
			case "month":
				if (value < 1 || value > 12) return "Month should be between 1 and 12";
				break;

			case "year":
				if (value.toString().length !== 4) return "Year should be 4 digits";
				break;

			case "cvv":
				if (value.length < 3 || value.length > 3)
					return "CVV should be 3 digits";
				break;
			case "cardNumber":
				if (value.length < 16 || value.length > 16)
					return "Card number should be 16 digits";
				break;

			default:
				return "Invalid type";
		}
		return null;
	}

	return (
		<section className="checkout-payment flex gap-2 flex-wrap">
			<Input
				type="text"
				name="cardholderName"
				register={register}
				errors={errors}
				placeholder="Cardholder Name"
			/>
			<Input
				type="number"
				name="cardNumber"
				register={register}
				errors={errors}
				placeholder="Card Number"
				extraValidations={{
					validate: (value) => validations("cardNumber", value),
				}}
			/>
			<Input
				type="number"
				name="month"
				register={register}
				errors={errors}
				placeholder="Month"
				extraStyles="flex-1"
				extraValidations={{
					validate: (value) => validations("month", value),
				}}
			/>
			<Input
				type="number"
				name="year"
				register={register}
				errors={errors}
				placeholder="Year"
				extraStyles="flex-1"
				extraValidations={{
					validate: (value) => validations("year", value),
				}}
			/>
			<Input
				type="number"
				name="cvv"
				register={register}
				errors={errors}
				placeholder="CVV"
				extraStyles="flex-1"
				extraValidations={{
					validate: (value) => validations("cvv", value),
				}}
			/>

			<button
				type="button"
				data-testid="payment-submit"
				onClick={handleSubmit(handleFormSubmit)}
				className="border-1 p-2 py-2.5 mt-2 bg-black w-full text-white font-medium cursor-pointer"
			>
				Pay with card
			</button>
		</section>
	);
}

Payment.propTypes = {
	handlePaymentSubmit: PropTypes.func.isRequired,
};
