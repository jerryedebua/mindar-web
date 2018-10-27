export default (payload, index) => {
	return {
		type: 'LABOURER_CLICKED',
		payload: payload,
		index: index
	}
};