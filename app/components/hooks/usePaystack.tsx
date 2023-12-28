import { useContext } from "react";
import { usePaystackPayment } from "react-paystack";
import { store } from "../StoreProvider";

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

export type Currency = "USD" | "NGN";

export interface FinTekPaystackProps {
	amount: number;
	currency: Currency;
}

export const usePaystack = ({ amount, currency }: FinTekPaystackProps) => {
	const {
		state: { activeUser },
	} = useContext(store);
	
	const initiateTransaction = usePaystackPayment({
		amount,
		currency,
		label: "FinTeek Payment",
		// @ts-ignore
		email: activeUser.user?.email as string,
		publicKey: PAYSTACK_PUBLIC_KEY as string,
	});

	return {
		initiateTransaction,
	};
};

export default usePaystack;
