import useAxiosHandler from "@/utils/axiosHandler";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { ActionTypes, store } from "./StoreProvider";
import { accountsUrl, transferUrl } from "@/utils/network";
import { toast } from "react-toastify";
import { UserType } from "./hocs/withAuth";
import { AccountType } from "./Accounts";
import usePaystack, {
	Currency,
	FinTekPaystackProps,
} from "./hooks/usePaystack";

interface AddMoneyType {
	completeOperation: () => void;
	accounts: AccountType[];
}

const AddMoney = ({ completeOperation, accounts }: AddMoneyType) => {
	const [loading, SetLoading] = useState(false);
	const { axiosHandler } = useAxiosHandler();
	const formRef = useRef<HTMLFormElement>(null);
	const [data, SetData] = useState<FinTekPaystackProps>({
		amount: 0,
		currency: "NGN",
	});
	const { initiateTransaction } = usePaystack({
		amount: data.amount,
		currency: data.currency,
	});

	const onComplete = async (paystackResponse: any) => {
		const transferMoneyArgs = {
			reference: paystackResponse.reference,
			amount: data.amount,
			to_account_id: parseFloat(formRef.current?.to_account_id.value),
			currency: data.currency,
		};

		const response = await axiosHandler<UserType>({
			method: "POST",
			url: accountsUrl.makeDeposit,
			data: transferMoneyArgs,
			isAuthorized: true,
		});

		SetLoading(false);

		if (response.data) {
			formRef.current?.reset();
			toast("Transaction successful", { type: "success" });
			completeOperation();
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (data.amount > 0) {
			const callback: any = (resp: any) => {
				onComplete(resp);
			};

			const onClose: any = () => {
				SetLoading(false);
			};
			initiateTransaction(callback, onClose);
		}
	}, [data]);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		SetLoading(true);

		const amount = parseFloat(formRef.current?.amount.value);
		const currency = accounts.find(
			(account) =>
				account.id.toString() === formRef.current?.to_account_id.value
		)?.currency as unknown as Currency;

		SetData({ amount, currency });
	};

	return (
		<div>
			<div className="modalHeading">
				<div className="title">Send Money</div>
			</div>
			<form ref={formRef} onSubmit={onSubmit}>
				<div className="modalBody userUpdate">
					<div className="formGroup">
						<label htmlFor="Username">To Account</label>
						<select name="to_account_id" required>
							<option value="">Select Account</option>
							{accounts.map((account, index) => (
								<option key={index} value={account.id}>{`${
									account.currency
								} - ${parseFloat(account.balance).toFixed(2)}`}</option>
							))}
						</select>
					</div>
					<div className="formGroup">
						<label htmlFor="Username">Amount</label>
						<input name="amount" type="number" required />
					</div>
				</div>
				<div className="modalFooter">
					<button type="submit" disabled={loading}>
						Submit{loading && "ing..."}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddMoney;
