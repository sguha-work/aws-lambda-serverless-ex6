//const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");


//const express = require("express");
import * as serverless from "serverless-http";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Router from './src/router/router.js';
import Logger from './src/handlers/logger.handler.js';

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

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

const handler = serverless(app);
export default handler;