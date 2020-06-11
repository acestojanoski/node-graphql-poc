import {GraphQLString, GraphQLBoolean} from 'graphql';

const ping = {
	name: 'ping',
	type: GraphQLString,
	args: {
		simulateError: {type: GraphQLBoolean},
	},
};

export default ping;
