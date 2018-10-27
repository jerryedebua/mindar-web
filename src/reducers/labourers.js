export default (state, action) => {

	let labourers = [
		{index:0, id:1, name: 'James Maguma', wage:"100000", date:  '2018-02-14T18:00:00.000Z'},
		{index:1, id:2, name: 'Miria Kyambadde', wage:"120000", date:  '2018-01-10T21:00:00.000Z'},
		{index:2, id:3, name: 'Bola Makaya', wage:"50000", date:  '2017-12-07T09:00:00.000Z'},
	];

	if (action.type === 'LABOURER_SAVE') {
		let labourer = action.payload;
		labourer.index = labourers.length;
		labourer.id = 1+labourers.length;
		state.unshift(labourer);
	}

	if (action.type === 'LABOURER_UPDATE') {
		let labourer = action.payload;
		labourer.index = state[action.index].index;
		labourer.id = state[action.index].id;
		state[action.index] = labourer;
	}

	if (action.type === 'LABOURER_REMOVE') {
		state.splice(action.payload, 1);
	}

	return state || labourers;
};