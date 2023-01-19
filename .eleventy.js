
const dayjs = require("dayjs");

module.exports = function(eleventyConfig) {
  // Pass-through images
  eleventyConfig.addPassthroughCopy("./_site/images");
  eleventyConfig.addPassthroughCopy("./_site/js");

  // Add Date filters
  eleventyConfig.addFilter("date", (dateObj) => {
    return dayjs(dateObj).format("MMMM D, YYYY");
  });

  eleventyConfig.addFilter("sitemapDate", (dateObj) => {
    return dayjs(dateObj).toISOString();
  });

  eleventyConfig.addFilter("year", () => {
    return dayjs().format("YYYY");
  });

  // Add pages collection
  eleventyConfig.addCollection("pages", function (collections) {
    return collections.getFilteredByTag("page").sort(function (a, b) {
      return a.data.order - b.data.order;
    });
    
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "_site",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
      output: "public",
    },
  };
};
