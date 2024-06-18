const hbs = require("hbs");

// Define a Handlebars helper to iterate over object properties
hbs.registerHelper("pairs", function (obj, options) {
  const keys = Object.keys(obj);
  const result = keys.map((key) => {
    return { key: key, value: obj[key] };
  });

  // Use options.fn to render the block content
  return options.fn(result);
});
