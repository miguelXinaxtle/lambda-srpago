"use strict";
var AWS = require("aws-sdk");

module.exports.hello = async (event) => {
  const params = {
    TableName: "Music",
  };
  AWS.config.update({ region: "us-east-1", endpoint: "http://localhost:4566" });
  var db = new AWS.DynamoDB.DocumentClient();
  // const scanResults = [];
  // const items = await db.scan(params).promise();
  // if (items && items.Items) {
  //   items.Items.forEach((item) => scanResults.push(item));
  // } else {
  // }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Localstack esta trabajando chidillo 5",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
