const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Cambia esto al puerto donde corre tu aplicación
    setupNodeEvents(on, config) {
      // Implementa aquí los listeners de eventos de Node si los necesitas
    },
  },
});
