const { describe, it, expect } = require("@jest/globals");
const {
  extractRelevantProducts,
  formatProductsData,
  formatTextMessage,
} = require("./helpers");

describe("helpers", () => {
  describe("extractRelevantProducts", () => {
    const testProducts = [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        image:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-imac-27-2020?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1643933943158",
        url: "https://www.apple.com/uk/shop/product/G0ZV9B/A/Refurbished-27-inch-iMac-31GHz-6-core-Intel-Core-i5-with-Retina-5K-display-10GB-Ethernet-nano-texture-glass",
        name: "Refurbished 27-inch iMac 3.1GHz 6-core Intel Core i5 with Retina 5K display, 10GB Ethernet, nano-texture glass",
        brand: { "@type": "Organization", name: "Apple" },
        offers: {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: 2019,
          sku: "G0ZV9B/A",
        },
        mainEntityOfPage:
          "https://www.apple.com/uk/shop/product/G0ZV9B/A/Refurbished-27-inch-iMac-31GHz-6-core-Intel-Core-i5-with-Retina-5K-display-10GB-Ethernet-nano-texture-glass",
        description:
          "Originally released August 2020 27-inch (diagonal) Retina 5K display; 5120x2880 resolution with support for one billion colours, nano-textured glass True Tone technology 32GB of 2666MHz DDR4 memory 256GB SSD1 1080p FaceTime HD camera Radeon Pro 5300 with 4GB of GDDR6 memory",
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        image:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-macbook-air-gold-m1-202010?wid=539&hei=312&fmt=jpeg&qlt=95&.v=1634145607000",
        url: "https://www.apple.com/uk/shop/product/FGND3B/A/refurbished-133-inch-macbook-air-apple-m1-chip-with-8‑core-cpu-and-7‑core-gpu-gold",
        name: "Refurbished 13.3-inch MacBook Air Apple M1 Chip with 8‑Core CPU and 7‑Core GPU - Gold",
        brand: { "@type": "Organization", name: "Apple" },
        offers: {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: 849,
          sku: "FGND3B/A",
        },
        mainEntityOfPage:
          "https://www.apple.com/uk/shop/product/FGND3B/A/refurbished-133-inch-macbook-air-apple-m1-chip-with-8‑core-cpu-and-7‑core-gpu-gold",
        description:
          "Originally released November 2020|13.3-inch (diagonal) LED-backlit display with IPS technology; 2560x1600 native resolution at 227 pixels per inch|8GB unified memory|256GB SSD 1|Touch ID sensor|720p FaceTime HD Camera",
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        image:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-imac-27-2020?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1643933943158",
        url: "https://www.apple.com/uk/shop/product/G0ZW0B/A/refurbished-27-inch-imac-33ghz-6-core-intel-core-i5-with-retina-5k-display",
        name: "Refurbished 27-inch iMac 3.3GHz 6-core Intel Core i5 with Retina 5K display",
        brand: { "@type": "Organization", name: "Apple" },
        offers: {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: 1589,
          sku: "G0ZW0B/A",
        },
        mainEntityOfPage:
          "https://www.apple.com/uk/shop/product/G0ZW0B/A/refurbished-27-inch-imac-33ghz-6-core-intel-core-i5-with-retina-5k-display",
        description:
          "Originally released August 2020 27-inch (diagonal) Retina 5K display; 5120-by-2880 resolution with support for one billion colors True Tone technology 8GB of 2666MHz DDR4 memory 1TB SSD 1080p FaceTime HD camera Radeon Pro 5300 with 4GB of GDDR6 memory",
      },
    ];

    it("Should return an empty array if there are no relevant products", () => {
      const productName = "MacBook Pro";

      const result = extractRelevantProducts(testProducts, productName);
      expect(result).toEqual([]);
    });

    it("Should return an array of relevant products", () => {
      const productName = "iMac";

      const result = extractRelevantProducts(testProducts, productName);
      expect(result).toEqual([
        {
          "@context": "https://schema.org",
          "@type": "Product",
          image:
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-imac-27-2020?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1643933943158",
          url: "https://www.apple.com/uk/shop/product/G0ZV9B/A/Refurbished-27-inch-iMac-31GHz-6-core-Intel-Core-i5-with-Retina-5K-display-10GB-Ethernet-nano-texture-glass",
          name: "Refurbished 27-inch iMac 3.1GHz 6-core Intel Core i5 with Retina 5K display, 10GB Ethernet, nano-texture glass",
          brand: { "@type": "Organization", name: "Apple" },
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: 2019,
            sku: "G0ZV9B/A",
          },
          mainEntityOfPage:
            "https://www.apple.com/uk/shop/product/G0ZV9B/A/Refurbished-27-inch-iMac-31GHz-6-core-Intel-Core-i5-with-Retina-5K-display-10GB-Ethernet-nano-texture-glass",
          description:
            "Originally released August 2020 27-inch (diagonal) Retina 5K display; 5120x2880 resolution with support for one billion colours, nano-textured glass True Tone technology 32GB of 2666MHz DDR4 memory 256GB SSD1 1080p FaceTime HD camera Radeon Pro 5300 with 4GB of GDDR6 memory",
        },
        {
          "@context": "https://schema.org",
          "@type": "Product",
          image:
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-imac-27-2020?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1643933943158",
          url: "https://www.apple.com/uk/shop/product/G0ZW0B/A/refurbished-27-inch-imac-33ghz-6-core-intel-core-i5-with-retina-5k-display",
          name: "Refurbished 27-inch iMac 3.3GHz 6-core Intel Core i5 with Retina 5K display",
          brand: { "@type": "Organization", name: "Apple" },
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: 1589,
            sku: "G0ZW0B/A",
          },
          mainEntityOfPage:
            "https://www.apple.com/uk/shop/product/G0ZW0B/A/refurbished-27-inch-imac-33ghz-6-core-intel-core-i5-with-retina-5k-display",
          description:
            "Originally released August 2020 27-inch (diagonal) Retina 5K display; 5120-by-2880 resolution with support for one billion colors True Tone technology 8GB of 2666MHz DDR4 memory 1TB SSD 1080p FaceTime HD camera Radeon Pro 5300 with 4GB of GDDR6 memory",
        },
      ]);
    });
  });

  describe("formatProductData", () => {
    const testProductsJson = [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        image:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-imac-27-2020?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1643933943158",
        url: "https://www.apple.com/uk/shop/product/G0ZV9B/A/Refurbished-27-inch-iMac-31GHz-6-core-Intel-Core-i5-with-Retina-5K-display-10GB-Ethernet-nano-texture-glass",
        name: "Refurbished 27-inch iMac 3.1GHz 6-core Intel Core i5 with Retina 5K display, 10GB Ethernet, nano-texture glass",
        brand: { "@type": "Organization", name: "Apple" },
        offers: {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: 2019,
          sku: "G0ZV9B/A",
        },
        mainEntityOfPage:
          "https://www.apple.com/uk/shop/product/G0ZV9B/A/Refurbished-27-inch-iMac-31GHz-6-core-Intel-Core-i5-with-Retina-5K-display-10GB-Ethernet-nano-texture-glass",
        description:
          "Originally released August 2020 27-inch (diagonal) Retina 5K display; 5120x2880 resolution with support for one billion colours, nano-textured glass True Tone technology 32GB of 2666MHz DDR4 memory 256GB SSD1 1080p FaceTime HD camera Radeon Pro 5300 with 4GB of GDDR6 memory",
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        image:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-imac-27-2020?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1643933943158",
        url: "https://www.apple.com/uk/shop/product/G0ZW0B/A/refurbished-27-inch-imac-33ghz-6-core-intel-core-i5-with-retina-5k-display",
        name: "Refurbished 27-inch iMac 3.3GHz 6-core Intel Core i5 with Retina 5K display",
        brand: { "@type": "Organization", name: "Apple" },
        offers: {
          "@type": "Offer",
          priceCurrency: "GBP",
          price: 1589,
          sku: "G0ZW0B/A",
        },
        mainEntityOfPage:
          "https://www.apple.com/uk/shop/product/G0ZW0B/A/refurbished-27-inch-imac-33ghz-6-core-intel-core-i5-with-retina-5k-display",
        description:
          "Originally released August 2020 27-inch (diagonal) Retina 5K display; 5120-by-2880 resolution with support for one billion colors True Tone technology 8GB of 2666MHz DDR4 memory 1TB SSD 1080p FaceTime HD camera Radeon Pro 5300 with 4GB of GDDR6 memory",
      },
    ];

    it("Should return an empty array if no products are passed in", () => {
      const result = formatProductsData([]);
      expect(result).toEqual([]);
    });

    it("Should return an array of formatted products", () => {
      const result = formatProductsData(testProductsJson);
      expect(result).toEqual([
        {
          name: "Refurbished 27-inch iMac 3.1GHz 6-core Intel Core i5 with Retina 5K display, 10GB Ethernet, nano-texture glass",
          url: "https://www.apple.com/uk/shop/product/G0ZV9B/A/Refurbished-27-inch-iMac-31GHz-6-core-Intel-Core-i5-with-Retina-5K-display-10GB-Ethernet-nano-texture-glass",
          sku: "G0ZV9B/A",
        },
        {
          name: "Refurbished 27-inch iMac 3.3GHz 6-core Intel Core i5 with Retina 5K display",
          url: "https://www.apple.com/uk/shop/product/G0ZW0B/A/refurbished-27-inch-imac-33ghz-6-core-intel-core-i5-with-retina-5k-display",
          sku: "G0ZW0B/A",
        },
      ]);
    });
  });

  describe("formatTextMessage", () => {
    it("Should return a basic message if list is empty", () => {
      const result = formatTextMessage([], "Test Product");
      expect(result).toEqual(
        "Sorry, we did not find any Apple refurbished products for Test Product"
      );
    });

    it("Should return a message detailing the products in the list", () => {
      const testProducts = [
        {
          name: "Refurbished 16-inch Test Product - Silver",
          url: "https://www.apple.com/",
          sku: "G0ZV9B/A",
        },
        {
          name: "Refurbished 16-inch Test Product - Space Grey",
          url: "https://www.apple.com/",
          sku: "G0ZW0B/A",
        },
      ];
      const result = formatTextMessage(testProducts, "Test Product");
      expect(result).toEqual(
        `We found 2 Apple refurbished products for "Test Product":\n\nItem #1\n\nRefurbished 16-inch Test Product - Silver\nhttps://www.apple.com/\nG0ZV9B/A\n\nItem #2\n\nRefurbished 16-inch Test Product - Space Grey\nhttps://www.apple.com/\nG0ZW0B/A\n\n`
      );
    });
  });
});
