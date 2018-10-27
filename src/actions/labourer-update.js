export default (payload, index) => {
	return {
		type: 'LABOURER_UPDATE',
		payload: payload,
		index: index
	}
};