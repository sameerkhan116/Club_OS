import express from 'express'; // for setting up the server
import bodyParser from 'body-parser'; // required for graphql enpoint to put form data in req.body
import expressPlayground from 'graphql-playground-middleware-express'; // for testing schema
import cors from 'cors'; // for cross-origin resource sharing
import path from 'path'; // for specifying path names
import 'colors'; // to add colors to the console
import { graphqlExpress } from 'apollo-server-express'; // for creating the graphql endpoint
import { makeExecutableSchema } from 'graphql-tools'; // for creating the graphql schema
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas'; // to modularize schema

import models from './models'; // the db model we created using sequelize

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types'))); // combining types
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'))); // combining resolvers
// creating a schema using those two
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express(); // executable
const PORT = 5000; // Port on which the server will listen
const endpoint = '/graphql'; // the endpoint

app.use(cors('*')); // to allow resource sharing from any origin

app.use(endpoint, bodyParser.json(), graphqlExpress({ // the graphql endpoint
  schema, // the schema which is a combination of types and resolvers
  context: {
    models, // passing the models as context to be used in the resolvers
  },
}));
app.use('/playground', expressPlayground({ endpoint })); // the playground endpoint

// sync the db model which returns a promise. Once this is done, start the server
models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.underline.yellow);
  });
});
