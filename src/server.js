import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import dotenv from 'dotenv';
import errorHandler from './graphql/error-handler';

const isLocal = process.env.POC_ENV === 'local';

if (isLocal) {
	const envVars = dotenv.config({path: './config/environment/.env.local'});

	if (envVars.error) {
		throw envVars.error;
	}
}

const app = express();

app.use(cors());
app.use(express.json());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: resolvers,
		customFormatErrorFn: errorHandler,
		graphiql: true,
	})
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.info('API is listening on port', PORT);
});
