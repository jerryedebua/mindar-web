export default (state, action) => {
	
	let products = [
		{index:0, id:5, name: 'Hair', price: '120000'},
		{index:1, id:4, name: 'Hair style 1', price: '250000'},
		{index:2, id:3, name: 'Nails', price: '150000'},
		{index:3, id:2, name: 'Hair style 2', price: '76000'},
		{index:4, id:1, name: 'Facial', price: '120000'},
	];

	return state || products;

}