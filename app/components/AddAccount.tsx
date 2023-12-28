import useAxiosHandler from "@/utils/axiosHandler";
import { FormEvent, useContext, useRef, useState } from "react";
import { ActionTypes, store } from "./StoreProvider";
import { accountsUrl } from "@/utils/network";
import { UserType } from "./hocs/withAuth";
import { toast } from "react-toastify";

interface AddAccountType {
	completeOperation: () => void;
}

const AddAccount = ({ completeOperation }: AddAccountType) => {
	const [loading, SetLoading] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const { axiosHandler } = useAxiosHandler();
	const { dispatch } = useContext(store);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		SetLoading(true);

		const addAccountArgs = {
			currency: formRef.current?.currency.value,
		};

		const response = await axiosHandler<UserType>({
			method: "POST",
			url: accountsUrl.addAccounts,
			isAuthorized: true,
			data: addAccountArgs,
		});

		SetLoading(false);

		if (response.data) {
			toast("Account added successfully", { type: "success" });
			dispatch({
				type: ActionTypes.UpdateUser,
				payload: response.data,
			});
			completeOperation();
		}
	};

	return (
		<div>
			<div className="modalHeading">
				<div className="title">Add Account</div>
			</div>
			<form ref={formRef} onSubmit={onSubmit}>
				<div className="modalBody userUpdate">
					<div className="formGroup">
						<label htmlFor="currency">Currency</label>
						<select name="currency" required>
							<option value="">Choose currency</option>
							<option value="NGN">NGN</option>
							<option value="USD">USD</option>
						</select>
					</div>
				</div>
				<div className="modalFooter">
					<button type="submit" disabled={loading}>
						Submit{loading && "..."}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddAccount;
