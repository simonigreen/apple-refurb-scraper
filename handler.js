const { request } = require("axios");
const Vonage = require("@vonage/server-sdk");
const {
  extractProductsFromHTML,
  formatProducts,
} = require("./helpers/helpers.js");
const {
  VONAGE_API_KEY,
  VONAGE_API_SECRET,
  MY_PHONE_NUMBER,
  IS_SMS_ENABLED,
} = require("./config.js");

module.exports.getRefurbishedProducts = async (event, context, callback) => {
  const productName = "16-inch MacBook Pro";
  const productUrl = "mac";

  const { data: responseHTML } = await request(
    `https://www.apple.com/uk/shop/refurbished/${productUrl}`
  );

  const refrubishedProducts = extractProductsFromHTML(
    responseHTML,
    productName
  );

  if (IS_SMS_ENABLED) {
    const vonage = new Vonage({
      apiKey: VONAGE_API_KEY,
      apiSecret: VONAGE_API_SECRET,
    });

    const text = formatProducts(refrubishedProducts, productName);

    console.log("Preparing to send SMS...");

    vonage.message.sendSms(
      MY_PHONE_NUMBER,
      MY_PHONE_NUMBER,
      text,
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]["status"] === "0") {
            console.log("Message sent successfully.");
          } else {
            console.log(
              `Message failed with error: ${responseData.messages[0]["error-text"]}`
            );
          }
        }
      }
    );
  }

  console.log(
    `We found ${refrubishedProducts.length} Apple refburbished products for ${productName}`
  );

  return refrubishedProducts;
};
