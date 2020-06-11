import {GraphQLSchema, GraphQLObjectType} from 'graphql';
import ping from './ping';

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQuery',
		fields: {
			ping,
		},
	}),
});

export default schema;
