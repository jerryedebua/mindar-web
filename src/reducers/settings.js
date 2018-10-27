export default (state, action) => {
	let settings = [
		{id:1, name: 'Language', alts: ['English', 'Luganda'], value:0},
		{id:2, name: 'Other', alts: ['Value'], value:0},		
	];

	if (action.type === 'LANGUAGE_SELECTED') {
		state[0].value = action.payload;
	}

	return state || settings;
};