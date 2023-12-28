"use client";

import Auth from "../components/Auth";
import { authUrl } from "@/utils/network";
import axios, { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorHanlder } from "@/utils/errorHandler";
import withoutAuth from "../components/hocs/withoutAuth";
import useAxiosHandler from "@/utils/axiosHandler";

const Register = () => {
	const [loading, SetLoading] = useState(false);
	const Router = useRouter();
	const { axiosHandler } = useAxiosHandler();

	const onSubmit = async (
		e: FormEvent<HTMLFormElement>,
		formRef: React.RefObject<HTMLFormElement>
	) => {
		e.preventDefault();
		SetLoading(true);

		const arg = {
			email: formRef.current?.email.value,
			password: formRef.current?.password.value,
		};

		const response = await axiosHandler({
			method: "POST",
			url: authUrl.register,
			data: arg,
			isAuthorized: false,
		});

		SetLoading(false);

		if (response.data) {
			toast("User created succesfully", {
				type: "success",
			});
			Router.push("/login");
		}
	};

	return (
		<Auth
			onSubmit={onSubmit}
			title="Sign up"
			loading={loading}
			buttonTitle="Register"
			accountInfoText={{
				actionLink: "/login",
				actionText: "login",
				initialText: "Have an account?",
			}}
		/>
	);
};

export default withoutAuth(Register);
