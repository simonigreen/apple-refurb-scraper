const { describe, it, expect } = require("@jest/globals");
const { formatProducts } = require("./helpers");

describe("formatProducts", () => {
  it("Should return a basic message if list is empty", () => {
    const result = formatProducts([], "Test Product");
    expect(result).toEqual(
      "Sorry, we did not find any Apple refburbished products for Test Product"
    );
  });
});
