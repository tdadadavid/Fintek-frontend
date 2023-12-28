import useAxiosHandler from "@/utils/axiosHandler";
import { FormEvent, useContext, useRef, useState } from "react";
import { ActionTypes, store } from "./StoreProvider";
import { transferUrl } from "@/utils/network";
import { toast } from "react-toastify";
import { read } from "fs";
import { AccountType } from "./Accounts";
import { UserType } from "./hocs/withAuth";

interface SendMoneyType {
	completeOperation: () => void;
	accounts: AccountType[];
}

const SendMoney = ({ completeOperation, accounts }: SendMoneyType) => {
	const [loading, setLoading] = useState(false);
	const { axiosHandler } = useAxiosHandler();
	const { dispatch } = useContext(store);
	const formRef = useRef<HTMLFormElement>(null);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const transferMoneyArgs = {
			from_account_id: +formRef.current?.from_account_id.value,
			amount: +formRef.current?.amount.value,
			to_account_id: parseFloat(formRef.current?.to_account_id.value),
		};

		const response = await axiosHandler<UserType>({
			method: "POST",
			url: transferUrl.transfer,
			data: transferMoneyArgs,
			isAuthorized: true,
		});

		setLoading(false);

		if (response.data) {
			toast("Transaction successful", { type: "success" });
			completeOperation();
		}
	};

	return (
		<div>
			<div className="modalHeading">
				<div className="title">Send Money</div>
			</div>
			<form ref={formRef} onSubmit={onSubmit}>
				<div className="modalBody userUpdate">
					<div className="formGroup">
						<label htmlFor="Username">From Account</label>
						<select name="from_account_id" required>
							<option value="">Select Account</option>
							{accounts.map((account, index) => (
								<option key={index} value={account.id}>{`${
									account.currency
								} - ${parseFloat(account.balance).toFixed(2)}`}</option>
							))}
						</select>
					</div>
					<div className="formGroup">
						<label htmlFor="Username">To Account</label>
						<input
							type="number"
							name="to_account_id"
							placeholder="Specify the account to send to"
							required
						/>
					</div>
					<div className="formGroup">
						<label htmlFor="Username">Amount</label>
						<input name="amount" type="number" required />
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

export default SendMoney;
