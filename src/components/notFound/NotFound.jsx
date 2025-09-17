import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
	return (
		<section className="not-found flex flex-col gap-1 items-center my-23">
			<TbError404 className="text-9xl" />
			<p className="text-sm md:text-md">Uh Oh! This page does not exist</p>
			<p className="text-sm md:text-md">
				Go to <Link className="underline" to={"/"}>Home</Link>
			</p>
		</section>
	);
}
