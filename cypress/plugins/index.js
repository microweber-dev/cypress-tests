// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

//module.exports = (on, config) => {
//  // `on` is used to hook into various events Cypress emits
//  // `config` is the resolved Cypress config
//}



const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
    initPlugin(on, config);

   // require('@cypress/code-coverage/task')(on, config)
    // include any other plugin code...

    // It's IMPORTANT to return the config object
    // with any changed environment variables

    return config;
};


