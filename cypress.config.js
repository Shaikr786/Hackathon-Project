const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://www.zigwheels.com',
    viewportWidth: 1280, 
    viewportHeight: 720,
    setupNodeEvents(on, config) {

      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
      cypressGrepPlugin(config)
      return config
      // implement node event listeners here
    },
  },

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    
  video: true,
  screenshotOnRunFailure: true
  },



});
