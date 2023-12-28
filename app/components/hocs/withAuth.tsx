import { USER_TOKEN_KEY } from "@/utils/constant";
import { useContext, useEffect, useState } from "react";
import { userUrl } from "@/utils/network";
import useAxiosHandler from "@/utils/axiosHandler";
import { ActionTypes, store } from "../StoreProvider";
import useLogout from "../hooks/useLogout";

export interface UserType {
	id: string;
	created_at: string;
	updated_at: string;
	email: string;
	username?: string;
}

const WithAuth = <T extends object>(Component: React.ComponentType<T>) => {

	const Wrapper = (props: T) => {
		const [checking, setChecking] = useState(true);
		const { axiosHandler } = useAxiosHandler();
		const { logout } = useLogout();
		const {
			dispatch,
			state: { activeUser },
		} = useContext(store);

		const handleAuth = async () => {
			const userToken = localStorage.getItem(USER_TOKEN_KEY);
			if (userToken) {
				if (!activeUser) {
					const response = await axiosHandler<UserType>({
						method: "GET",
						url: userUrl.me,
						isAuthorized: true,
					});

					if (response.data) {
						dispatch({
							type: ActionTypes.UpdateUser,
							payload: response.data,
						});
						setChecking(false);
					} else {
						logout();
					}
				} else {
					setChecking(false);
				}
			} else {
				logout();
			}
		};

		useEffect(() => {
			handleAuth();
		}, []);

		if (checking) {
			return <h3>Loading... Please wait.</h3>;
		}

		return <Component {...props} />;
	};

	return Wrapper;
};

export default WithAuth;
