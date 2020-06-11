const ping = ({simulateError}, req) => {
	if (simulateError) {
		throw new Error('Simulated error.');
	}

	return 'pong';
};

export default ping;
