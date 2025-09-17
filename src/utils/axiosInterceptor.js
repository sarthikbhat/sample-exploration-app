import axios from "axios";
import { toast } from "react-toastify";

const CustomAxios = axios.create({
	baseURL: "https://fake-ecommerce-app-api.onrender.com",
});

CustomAxios.interceptors.response.use(
	async (response) => {
		return response.data;
	},
	async (error) => {
		if (error.code == "ERR_CANCELED") return;
		toast.error("Some error occured in API !!", { toastId: error.code });
		return Promise.reject(error);
	}
);

export default CustomAxios;
