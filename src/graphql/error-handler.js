const errorHandler = (error) => {
	console.error('ERROR:', error);

	return {
		message: error.message || 'Internal server error.',
		statusCode: error.statusCode || 500,
	};
};

export default errorHandler;
