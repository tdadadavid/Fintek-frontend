import { USER_TOKEN_KEY } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WithoutAuth = <T extends object>(Component: React.ComponentType<T>) => {

	const Wrapper = (props: T) => {
		const Router = useRouter();
		const [checking, setChecking] = useState(true);

		useEffect(() => {
			const userToken = localStorage.getItem(USER_TOKEN_KEY);
			if (userToken) {
				Router.push("/");
			} else {
				setChecking(false);
			}
		}, []);

		if (checking) {
			return <h3>Loading... Please wait.</h3>;
		}

		return <Component {...props} />;
	};

	return Wrapper;
};

export default WithoutAuth;
