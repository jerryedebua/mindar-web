export default (state, action) => {

	let defaultObject = {
		crud:false, open:false, alert:false, filter:false, pay:false, modify_setting:false,
		d:{ title:'Record',
			desc_title: 'Description',
			desc_placeholder: 'Describe',
			amount_placeholder: 'Type amount',
			date_description: 'Select date',
			date_placeholder: 'Select date'
		}, prevPayload: action.payload, labourers: (state ? (state.labourers?state.labourers:false) : false)
	};

	if (action.type === 'OUTERBAR_ITEM_CLICKED') {
		switch (action.payload) {
			default:
				defaultObject.labourers = false;
				break;
			case 'labourers':
				defaultObject.labourers = true;
				break;
			case 'settings':
				defaultObject.settings = true;
				break;
			case 'help':
				defaultObject.help = true;
				defaultObject.drawerOpen = false;
				break;
			case 'about':
				defaultObject.about = true;
				defaultObject.drawerOpen = false;
				break;
		}
		return defaultObject;
	}

	if (action.type === 'TOOLBAR_ICON_CLICKED') {
		let title, desc_placeholder, amount_placeholder, date_description = '', description = 'Description';
		switch (action.payload) {
			default:
				break;
			case 1:
				title = 'Record sale'; desc_placeholder = 'Describe sale';
				amount_placeholder = 'Type amount sold'; date_description = 'Select date sold';
				defaultObject.d.is_sale = true;
				defaultObject.open = true;
				break;
			case 2:
				title = 'Record expense'; desc_placeholder = 'Describe expense';
				amount_placeholder = 'Type amount spent'; date_description = 'Select date spent';
				defaultObject.open = true;
				defaultObject.d.is_sale = false;
				break;
			case 3:
				defaultObject.open = true;
				defaultObject.filter = true;
				break;
			case 4:
				title = state.selectedItem.is_sale?'Edit sale':'Edit expense'; 
				desc_placeholder = state.selectedItem.is_sale?'Describe sale':'Describe expense';
				amount_placeholder = state.selectedItem.is_sale?'Type amount sold':'Type amount spent'; 
				date_description = state.selectedItem.is_sale?'Select date sold':'Select date spent';
				defaultObject.open = true;
				defaultObject.editing = true;
				defaultObject.d.is_sale = state.selectedItem.is_sale;
				defaultObject.item = state.selectedItem;
				break;
			case 5:
				defaultObject.alert = true;
				defaultObject.title = state.selectedItem.is_sale?'Confirm you want to remove the sale':'Confirm you want to remove the expense';
				defaultObject.item = state.selectedItem;
				break;
			case 7:
				defaultObject.labourers = state.labourers;
				return defaultObject;
			case 8:
				title = 'New labourer'; desc_placeholder = 'Name';  description = 'Name';
				amount_placeholder = 'Wage'; date_description = 'Select date they joined';
				defaultObject.open = true;
				defaultObject.d.is_sale = false;
				break;
			case 6:
				defaultObject.alert = true;
				defaultObject.pay = true;
				defaultObject.title = 'Confirm you want to pay the labourer';
				defaultObject.item = state.selectedItem;
				break;
			case 9:
				defaultObject.alert = true;
				defaultObject.pay = true;
				defaultObject.title = 'All labourers will be paid';
				defaultObject.item = state.selectedItem;
				break;
			case 10:
				title = 'Edit labourer'; desc_placeholder = 'Name';  description = 'Name';
				amount_placeholder = 'Wage'; date_description = 'Select date they joined';
				defaultObject.open = true;
				defaultObject.editing = true;
				defaultObject.item = state.selectedItem;
				break;
			case 11:
				defaultObject.alert = true;
				defaultObject.title = 'Confirm you want to remove the labourer';
				defaultObject.item = state.selectedItem;
				break;
		}

		defaultObject.d.title = title;
		defaultObject.d.desc_title = description;
    	defaultObject.d.desc_placeholder = desc_placeholder;
    	defaultObject.d.amount_placeholder = amount_placeholder;
    	defaultObject.d.date_description = date_description;
    	defaultObject.d.date_placeholder = date_description;
    }

    if (action.type === 'LABOURER_CLICKED') {

    	/* console.log(state);
		console.log(action.payload); */

    	defaultObject.crud = 
    		(state.prevPayload !== undefined ? 
    			state.prevPayload.id : state.prevPayload) 
    		!== action.payload.id ? true : !state.crud;
    	defaultObject.pay = (state.prevPayload !== undefined ? 
    			state.prevPayload.id : state.prevPayload) 
    		!== action.payload.id ? true : !state.pay;

    	defaultObject.labourers = true;
    	defaultObject.selectedItem = action.payload;
    	defaultObject.selectedItem.index = action.index;

    	return defaultObject;
    }

    if (action.type === 'EVENT_CLICKED') {

    	/* console.log(state);
		console.log(action.payload); */

    	defaultObject.crud = 
    		(state.prevPayload !== undefined ? 
    			state.prevPayload.id : state.prevPayload) 
    		!== action.payload.id ? true : !state.crud;
    	
    	defaultObject.selectedItem = action.payload;

    	return defaultObject;
    } 

    if (action.type === 'PROCESS_COMPLETE') {
    	defaultObject.showMessage = true;
    	defaultObject.message = action.payload;
    	defaultObject.selectedItem = state.prevPayload;

    	return defaultObject;
    }

    if (action.type === 'SETTING_CLICKED') {
		defaultObject.modify_setting = true;
		defaultObject.setting = action.payload;
		defaultObject.title = action.payload.name;
	}

    /* returned on initialState */
    return defaultObject;

};