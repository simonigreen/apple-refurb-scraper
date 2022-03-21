# Apple Refurb Scraper

A simple [Node.js](https://nodejs.org/) scraper running on [AWS Lambda](https://aws.amazon.com/lambda/) that checks the availability of refurbished Apple products.

Uses [Vonage](https://www.vonage.co.uk/) for SMS notifactions.

## Getting started

Clone the repository and run `npm install`.

Create a `config.js` file containing the following information (some of which is optional if you do not plan on using the SMS functionality):

```
module.exports = {
    VONAGE_API_KEY: "exampleKey",
    VONAGE_API_SECRET: "exampleApiSecret",
    MY_PHONE_NUMBER: "07766123456",
    IS_SMS_ENABLED: false,
};
```

This project uses the [Serverless Framework](https://www.serverless.com/) - follow their [getting started](https://www.serverless.com/framework/docs/getting-started) guide and ensure you have an AWS account.

To test locally: `serverless invoke local --function getRefurbishedProducts`

To deploy: `serverless deploy`

One the Lambda is deployed a CloudWatch Event can be used to schedule the function to run as often as you'd like.
