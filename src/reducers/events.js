let count = 0;
export default (state, action) => {
	
	let events = [
		{index:0, id:9, amount: '120000', description: 'Sold Braids', date:  '2018-02-14T21:00:00.000Z', is_sale:true},
		{index:1, id:8, amount: '250000', description: 'Purchased Nail accessories', date: '2018-02-8T2:00:00.000Z', is_sale:false},
		{index:2, id:7, amount: '150000', description: 'Serviced a customer', date: '2018-02-10T12:00:00.000Z', is_sale:true},
		{index:3, id:6, amount: '76000', description: 'Purchased Lotions', date: '2017-12-14T18:00:00.000Z', is_sale:false},
		{index:4, id:5, amount: '120000', description: 'Sold Novea Lotion', date:  '2017-12--1T21:00:00.000Z', is_sale:true},
		{index:5, id:4, amount: '120000', description: 'Paid Miria Kyambadde', date: '2017-11-08T2:00:00.000Z', is_sale:false},
		{index:6, id:3, amount: '70000', description: 'Serviced 2 customers', date: '2017-10-10T12:00:00.000Z', is_sale:true},
		{index:7, id:2, amount: '300000', description: 'Shop renovations', date: '2017-09-14T09:00:00.000Z', is_sale:false},
		{index:8, id:1, amount: '40000', description: 'Paid Bola Makaya', date: '2017-09-08T2:00:00.000Z', is_sale:false},
	];

	if (!count) { /* ENSURE THIS IS RUN ONLY ONCE */
		
		/* console.log(action.type); */
		
		++count;

		/* let key = window.firebase.database().ref().child('expense/1').push().key;
	    window.firebase.database().ref('expense/1/'+ key).set({
	      "on" : "1",
	      "amount" : "28000",
	      "date_incurred" : 1002190929921
	    }).then(function(e) {
	        console.log('e');
	    }, function(e) {
	        console.log('error');
	    }); */

	    /* window.firebase.database().ref('expense/1').on('child_added', function(snapshot) {
	      console.log(snapshot.key);
	    }); */

	}

	if (action.type === 'EVENT_SAVE') {
		let event = action.payload;
		event.index = events.length;
		event.id = 1+events.length;
		state.unshift(event);
	}

	if (action.type === 'EVENT_UPDATE') {
		let event = action.payload;
		event.index = state[action.index].index;
		event.id = state[action.index].id;
		state[action.index] = event;
	}

	if (action.type === 'EVENT_REMOVE') {
		console.log(action.payload);
		state.splice(action.payload, 1);
	}

	if (action.type === 'LABOURER_PAY') {
		let event = {};
		event.index = events.length;
		event.id = 1+events.length;
		event.description = 'Paid '+ action.payload.name;
		event.amount = action.payload.wage;
		event.date = action.payload.date;
		state.unshift(event);
	}

	return state || events;

};