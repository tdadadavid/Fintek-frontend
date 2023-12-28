const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const authUrl = {
	register: `${BASE_URL}/auth/sign-up`,
	login: `${BASE_URL}/auth/login`,
};

export const userUrl = {
	updateUser: `${BASE_URL}/users/username`,
	me: `${BASE_URL}/users/me`,
};

export const accountsUrl = {
	getAccounts: `${BASE_URL}/accounts`,
	addAccounts: `${BASE_URL}/accounts`,
	makeDeposit: `${BASE_URL}/accounts/deposit`,
};

export const transferUrl = {
	transfer: `${BASE_URL}/transfers`,
};
