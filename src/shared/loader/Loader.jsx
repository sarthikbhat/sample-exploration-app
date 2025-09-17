import { useSelector } from "react-redux";
import { getLoadingState } from "../../store/slices/loading";

export default function Loader() {
	const isLoading = useSelector(getLoadingState);
    
	return (
		<>
			{isLoading ? (
				<div data-testid="app-loader" className="h-full w-full fixed top-0 left-0 bg-black/20 z-[99999]">
					<div className="fixed top-0  h-1.5 rounded-xs bg-black loading-bar">
						<span className="loading loading-spinner loading-lg text-primary" />
					</div>
				</div>
			) : null}
		</>
	);
}
