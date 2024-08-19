const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  // conecte os plugins ao PostCSS
  plugins: [
    // conecte o autoprefixer
    autoprefixer,
    // aprove um objeto com opções ao conectar cssnano:
    cssnano({ preset: "default" }), // defina as configurações de minificação padrão
  ],
};
