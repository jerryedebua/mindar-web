export default (payload, index) => {
	return {
		type: 'EVENT_UPDATE',
		payload: payload,
		index: index
	}
};