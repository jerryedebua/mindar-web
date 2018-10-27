export default (state, action) => {
	
	if (action.type === 'SIGN_UP_SUBMIT')
		state.authenticate = false;

	return state || { authenticate: true };
	
};