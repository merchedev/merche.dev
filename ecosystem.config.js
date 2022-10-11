module.exports = {
  apps: [{
    name: "nombre-app",
    script: "./app.js",
    env: {
      NODE_ENV: "development"
    },
    env_test: {
      NODE_ENV: "test",
    },
    env_staging: {
      NODE_ENV: "staging",
    },
    env_production: {
      NODE_ENV: "production",
    },
    watch: true,
    ignore_watch: ["node_modules", "logs/requests.log", "logs/error.log"],
  }]
}