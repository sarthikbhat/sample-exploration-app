import { useDispatch } from "react-redux";
import { setLoading } from "../store/slices/loading";

export const useLoader = () => {
	const dispatch = useDispatch();

    function setIsLoading(isLoading){
        
        dispatch(setLoading(isLoading));
    }

    return {
        setIsLoading
    }

};
