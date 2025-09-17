import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import router from "./routes";
import appStore from "./store/store";
import Footer from "./components/footer/Footer";
import Loader from "./shared/loader/Loader";

function App() {
	return (
		<Provider store={appStore()}>
			<Loader />
			<RouterProvider router={router} />
			<Footer />
			<ToastContainer hideProgressBar position="bottom-right" />
		</Provider>
	);
}

export default App;
