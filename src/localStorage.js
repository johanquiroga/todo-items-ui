export const loadAuthState = () => {
	try {
		const serializedAuthState = localStorage.getItem('auth');
		if (serializedAuthState === null) {
			return undefined;
		}
		return JSON.parse(serializedAuthState);
	} catch (err) {
		return undefined;
	}
};

export const saveAuthState = (state) => {
	try {
		const serializedAuthState = JSON.stringify(state);
		localStorage.setItem('auth', serializedAuthState);
	} catch (err) {
		console.error(err);
	}
};

export const removeAuthState = () => {
	try {
		localStorage.removeItem('auth');
	} catch (err) {
		console.log(err);
	}
};