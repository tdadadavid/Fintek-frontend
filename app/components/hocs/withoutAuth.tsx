import { USER_TOKEN_KEY } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withoutAuth = <T extends Object>(Component: React.ComponentType<T>) => {
	const wrapper = (props: T) => {
		const [checking, SetChecking] = useState(true);
		const Router = useRouter();


		useEffect(() => {
			const userToken = localStorage.getItem(USER_TOKEN_KEY);
			if (userToken) {
				Router.push('/');
			} else {
				SetChecking(false);
			}
		}, []);

		if (checking) {
			return <h3>Loading... Please wait.</h3>;
		}

		return <Component {...props} />;
	};

	return wrapper;
};

export default withoutAuth;
