import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoader } from "../../hooks/useLoader";
import { CiHeart, CiShare1 } from "react-icons/ci";
import { addToCartThunk } from "../../store/slices/cart";
import { fetchProductById } from "../../api/products";

export default function Product() {
	const dipatch = useDispatch();

	const [counter, setCounter] = useState(1);
	const [product, setProduct] = useState(null);

	const { setIsLoading } = useLoader();

	const params = useParams();
	const apiCalled = useRef(false);

	async function fetchData() {
		const data = await fetchProductById(params.id)
		setProduct(data);
	}

	useEffect(() => {
		if (!apiCalled.current) {
			fetchData();
			apiCalled.current = true;
		}
	}, []);

	async function addToCart(product) {
		const payload = {
			productId: product.id,
			userId: 128,
			quantity: counter,
		};
		setIsLoading(true);
		await dipatch(addToCartThunk(payload));
		setIsLoading(false);
	}

	const increment = () => setCounter((prev) => prev + 1);
	const decrement = () => setCounter((prev) => Math.max(prev - 1, 1));

	return (
		<section className="single-product p-2 px-2 justify-center flex gap-10 mt-4 flex-wrap md:px-14 lg:px-28">
			<section className="app-product-images w-full md:flex-1">
				<section className="all-catalogue grid grid-cols-2 md:grid-cols-2 gap-4">
					{[...Array(4).keys()].map((elm) => {
						return product ? (
							<img
								key={elm}
								className="w-full h-50 after:bg-gray-300"
								alt={product?.title}
								src={product?.image}
							/>
						) : (
							<div key={elm} className="w-full h-50 bg-gray-300"></div>
						);
					})}
				</section>
			</section>
			<section className="app-product-desc flex-1 w-[100%] md:w-[80%] flex flex-col gap-1">
				{product && (
					<>
						<div className="product-desc-header w-[100%] lg:w-[80%] flex justify-between items-center">
							<h1 className="text-3xl">{product.title}</h1>
							<div className="flex gap-4 text-2xl">
								<CiHeart />
								<CiShare1 />
							</div>
						</div>
						<p>$ {product.price}</p>
						<p className="w-[65%] font-light mt-2">{product.description}</p>
						<p className="w-[65%] font-light mt-2">By Lorem Ipsum</p>
						<div className="w-[100%] lg:w-[80%] flex gap-2 mt-20 items-end h-auto">
							<button
								type="button"
								data-testid="add-to-cart"
								className="border-1 p-2 flex-[0.8] bg-black text-white font-medium cursor-pointer"
								onClick={() => addToCart(product)}
							>
								Add to Cart - ${product.price}
							</button>
							<div className="flex flex-[0.2] gap-4 items-center justify-center border-1 p-1.5 px-2">
								<button
									onClick={decrement}
									type="button"
									className="cursor-pointer"
								>
									-
								</button>
								<span>{counter}</span>
								<button
									onClick={increment}
									type="button"
									className="cursor-pointer"
								>
									+
								</button>
							</div>
						</div>
						<div className="flex gap-4 mt-1">
							<p className="text-xs text-black">Free standard shipping</p>
							<p className="text-xs text-black underline">Free Returns</p>
						</div>
					</>
				)}
			</section>
		</section>
	);
}
