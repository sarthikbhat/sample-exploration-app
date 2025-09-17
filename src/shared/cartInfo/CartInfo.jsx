import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function CartInfo({ item, deleteFromCart, type = "md" }) {
	const navigate = useNavigate();

	const [typeClassNames, setTypeClassNames] = useState({
		img: "w-30 h-30",
		text: "text-lg",
	});

	useEffect(() => {
		if (type == "sm") {
			const tempClassName = typeClassNames;
			tempClassName.img = "w-20 h-20";
			tempClassName.text = "text-sm";
			setTypeClassNames({ ...tempClassName });
		} else if (type === "md") {
			const tempClassName = typeClassNames;
			tempClassName.img = "w-30 h-30";
			tempClassName.text = "text-lg";
			setTypeClassNames({ ...tempClassName });
		} else if (type === "lg") {
			const tempClassName = typeClassNames;
			tempClassName.img = "w-40 h-40";
			tempClassName.text = "text-lg";
			setTypeClassNames({ ...tempClassName });
		}
	}, [type]);

	function calclulatePrice(price, quantity) {
		return price * quantity;
	}

	return (
		<div
			key={item.id}
			className="flex flex-[0.2] gap-2 border-b-1 pb-4 last:border-0 border-black"
			data-testid="cart-item"
		>
			<div
				className={typeClassNames.img + " cursor-pointer"}
				onClick={() => navigate(`/product/${item.productId}`)}
			>
				<img
					className="w-full h-full after:bg-gray-300"
					alt={item.title}
					src={item.image}
				/>
			</div>
			<div className="py-1 flex flex-col  w-[80%]">
				<h4 className={typeClassNames.text}>{item.title}</h4>
				<div className="other-characteristics text-xs font-light">
					<p>Quantity: {item.quantity}</p>
				</div>
				<div className="flex justify-between w-full items-end h-[100%]">
					<p>$ {calclulatePrice(item.price, item.quantity)}</p>
					<button
						onClick={() => deleteFromCart(item.id)}
						type="button"
						data-testid="remove-cart"
						className="text-xs underline cursor-pointer"
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
}

CartInfo.propTypes = {
	item: PropTypes.object.isRequired,
	type: PropTypes.string,
	deleteFromCart: PropTypes.func.isRequired,
};
