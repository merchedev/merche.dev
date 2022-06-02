const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname,  process.env.NODE_ENV + '.env')});

if (dotenv.error) throw('Error en el archivo de configuración env: ', dotenv.error);

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_NAME:process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
}
