"use client";

import { USER_TOKEN_KEY } from "@/utils/constant";
import Auth from "../components/Auth";
import { errorHanlder } from "@/utils/errorHandler";
import { authUrl } from "@/utils/network";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import withoutAuth from "../components/hocs/withoutAuth";
import useAxiosHandler from "@/utils/axiosHandler";

interface LoginType {
	token: string;
	user: {
		username: string;
		email: string;
		created_at: string;
		updated_at: string;
	};
}

const Login = () => {
	const [loading, SetLoading] = useState(false);
	const Router = useRouter();
	const { axiosHandler } = useAxiosHandler();

	const onSubmit = async (
		e: FormEvent<HTMLFormElement>,
		formRef: React.RefObject<HTMLFormElement>
	) => {
		e.preventDefault();
		SetLoading(true);

		const args = {
			email: formRef.current?.email.value,
			password: formRef.current?.password.value,
		};

		const response = await axiosHandler<LoginType>({
			method: "POST",
			url: authUrl.login,
			data: args,
			isAuthorized: true,
			hanldeError: true,
		});

		SetLoading(false);

		if (response.data) {
			localStorage.setItem(USER_TOKEN_KEY, response.data.token);
			Router.push("/");
		}
	};

	return (
		<Auth
			accountInfoText={{
				actionLink: "/sign-up",
				actionText: "sign up",
				initialText: "Have an account?",
			}}
			onSubmit={onSubmit}
			showRemebered
			loading={loading}
		/>
	);
};

export default withoutAuth(Login);
