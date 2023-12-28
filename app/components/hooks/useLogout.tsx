import { USER_TOKEN_KEY } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ActionTypes, store } from "../StoreProvider";

const useLogout = () => {
	const Router = useRouter();
	const { dispatch } = useContext(store);

	const logout = () => {
		localStorage.removeItem(USER_TOKEN_KEY);
		dispatch({
			type: ActionTypes.UpdateUser,
			payload: null,
		});
		Router.push("/login");
	};

	return { logout };
};

export default useLogout;
