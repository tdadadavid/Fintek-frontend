import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const errorHanlder = (e: AxiosError) => {
	console.error(e);
	//@ts-ignore
	const message = e.response?.data?.error || e.response?.data?.message;
	toast(JSON.stringify(message) || e.message, {
		type: "error",
	});
};
