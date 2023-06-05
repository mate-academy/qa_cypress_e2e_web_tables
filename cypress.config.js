const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://demoqa.com/webtables",
    "viewportWidth": 1024,
    "viewportHeight": 768
  },
});
