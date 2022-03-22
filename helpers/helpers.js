const cheerio = require("cheerio");

function extractProductsFromHTML(html, productName) {
  const $ = cheerio.load(html);

  const schemaData = $('script[type="application/ld+json"]');

  const productsJson = [];

  schemaData.each((i, el) => {
    const text = $(el).html();
    const parsedJson = JSON.parse(text);

    if (parsedJson["@type"] === "Product") {
      productsJson.push(parsedJson);
    }
  });

  const relevantProducts = extractRelevantProducts(productsJson, productName);

  const formattedRelevantProducts = formatProductsData(relevantProducts);

  console.log(
    `${relevantProducts.length}/${productsJson.length} products were relevant...`
  );

  return formattedRelevantProducts;
}

function extractRelevantProducts(products, productName) {
  return products.filter((product) => product["name"].includes(productName));
}

function formatProductsData(products) {
  return products.map((product) => ({
    name: product["name"],
    url: product["url"],
    sku: product["offers"]["sku"],
  }));
}

function formatTextMessage(list, productName) {
  if (list.length === 0) {
    return `Sorry, we did not find any Apple refurbished products for ${productName}`;
  }
  return list.reduce((acc, product, index) => {
    return `${acc}Item #${index + 1}\n\n${product.name}\n${product.url}\n${
      product.sku
    }\n\n`;
  }, `We found ${list.length} Apple refurbished products for "${productName}":\n\n`);
}

module.exports = {
  extractProductsFromHTML,
  extractRelevantProducts,
  formatProductsData,
  formatTextMessage,
};
