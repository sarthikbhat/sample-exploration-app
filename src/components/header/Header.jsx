import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { fetchCartThunk, getCartItems } from "../../store/slices/cart";

export default function Header() {
	const cartItems = useSelector(getCartItems);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(fetchCartThunk());
	}, []);

	const isLogin = location.pathname === "/login";

	return (
		<>
			<header className="border-b-[1px] border-[#a6a8ac]">
				<nav className="flex justify-between items-center p-2 px-2 md:px-14 lg:px-28 text-xs md:text-lg">
					<section className="header-left flex gap-4">
						<Link to="/" className="font-medium">
							Website
						</Link>
						{!isLogin && (
							<>
								<Link to="/orders">My Orders</Link>
								<div
									className="flex gap-1 items-center font-light"
									role="search"
								>
									<CiSearch className="text-md absolute" />
									<input
										className="outline-0 border-0 border-b-1 border-black/30 w-18 md:w-25 pl-6"
										type="text"
										name="search"
										id="search"
										placeholder="Search"
										autoComplete="off"
									/>
								</div>
							</>
						)}
					</section>
					{!isLogin && (
						<section className="header-right flex gap-4">
							<Link
								to="/cart"
								data-testid="cart-size"
								className="flex gap-1 items-center"
							>
								<BsBag className="text-md md:text-lg" /> {cartItems.length}
							</Link>
							<Link to="/login">Login</Link>
							<Link to="">Sign Up</Link>
						</section>
					)}
				</nav>
			</header>
			<main className="min-h-92">
				<Outlet />
			</main>
		</>
	);
}
