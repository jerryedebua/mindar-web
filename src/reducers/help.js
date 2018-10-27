export default (state, action) => {
	let help_menu = [
		{id:1, title:'General',
		description:['Accuracy of the app is dependant on the data you provide', 
		'Due to this, record sales and expenses soon after they\'re made']},
		{id:2, title:'Left navigation menu', 
		description:['...']},
		{id:3, title:'Toolbar actions', description:['...']},
		{id:4, title:'Settings', description:['Customise you experience here']},
	];

	return help_menu;
};