const cheerio = require("cheerio");

function extractProductsFromHTML(html, productName) {
  const $ = cheerio.load(html);

  const allRefurbishedProducts = $("div .refurbished-category-grid-no-js ul a");

  const products = [];

  allRefurbishedProducts.each((i, el) => {
    const text = $(el).text();
    const link = $(el).attr("href");
    if (text.includes(productName)) {
      const obj = { description: text, link: `https://www.apple.com/${link}` };
      products.push(obj);
    }
  });

  return products;
}

function formatProducts(list, productName) {
  if (list.length === 0) {
    return `Sorry, we did not find any Apple refburbished products for ${productName}`;
  }
  return list.reduce((acc, product, index) => {
    return `${acc}Item #${index + 1} ${product.description}\n\n${
      product.link
    }\n\n`;
  }, `We found ${list.length} Apple refburbished products for ${productName}:\n\n`);
}

module.exports = { extractProductsFromHTML, formatProducts };
