//const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");


//const express = require("express");
import * as serverless from "serverless-http";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Router from './router/router.js';
import Logger from './handlers/logger.handler.js';

const app = express();



app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

Object.keys(Router).forEach((method) => {
  Object.keys(Router[method]).forEach((path) => {
    app[method](path, async (request, response) => {
      try {
        return await Router[method][path](request, response);
      } catch (error) {
        Logger.log(JSON.stringify(error), 'error');
        return error;
      }
    })
  });
});
// app.get("/users/:userId", async function (req, res) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   };

//   try {
//     const { Item } = await dynamoDbClient.send(new GetCommand(params));
//     if (Item) {
//       const { userId, name } = Item;
//       res.json({ userId, name });
//     } else {
//       res
//         .status(404)
//         .json({ error: 'Could not find user with provided "userId"' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not retreive user" });
//   }
// });

// app.post("/users", async function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== "string") {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== "string") {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   try {
//     await dynamoDbClient.send(new PutCommand(params));
//     res.json({ userId, name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not create user" });
//   }
// });

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

const handler = serverless(app);
export default handler;