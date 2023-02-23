import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from 'graphql';
import fs from "fs";
import resolvers from "@resolvers";


const router = express.Router()

var schema = buildSchema(fs.readFileSync("src\\schema\\schema.graphql", "utf8"));

router.use(
  "/",
  graphqlHTTP((request, response) => ({
    schema,
    rootValue: resolvers,
    context: {
      request,
      response,
    },
    graphiql: true,
    customFormatErrorFn: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path,
      statusCode: 403
    })
  }))
)

export default router