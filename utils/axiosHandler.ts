import useLogout from "@/app/components/hooks/useLogout";
import axios, { AxiosError, AxiosResponse } from "axios";
import { USER_TOKEN_KEY } from "./constant";
import { errorHanlder } from "./errorHandler";

interface AxiosHandlerType {
	method: "GET" | "POST" | "PATCH" | "PUT";
	url: string;
	data?: Record<string, number | string>;
	hanldeError?: boolean;
	isAuthorized?: boolean;
}

interface ResponseType<T> {
	data?: T;
	error: AxiosError | null;
}

const useAxiosHandler = () => {
	const { logout } = useLogout();

	const axiosHandler = async <T>({
		method,
		url,
		data,
		isAuthorized,
		hanldeError = true,
	}: AxiosHandlerType): Promise<ResponseType<T>> => {
		const config = {
			method,
			url,
			data,
			headers: {},
		};

		if (isAuthorized) {
			const userToken = localStorage.getItem(USER_TOKEN_KEY);
			config.headers = {
				"Content-Type": "application/json",
				"Access-Control-Request-Headers": "authorization,content-type",
				Authorization: `Bearer ${userToken}`,
			};
		}

		let error = null;

		const response = (await axios(config).catch((err: AxiosError) => {
			if (err.response?.status === 401) {
				logout();
			}

			if (hanldeError) {
				errorHanlder(err);
			} else {
				error = err;
			}
		})) as AxiosResponse<T>;

		return {
			data: response?.data,
			error,
		};
	};

	return { axiosHandler };
};

export default useAxiosHandler;
