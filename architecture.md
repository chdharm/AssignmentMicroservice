# Architecture

Container driven architecture to manage dependencies in one place.

Below is the directory structure.

```
my-app
├── index.js // entry point
├── .env.example // environment variable template
├── docker-compose.yml // docker compose for local development
├── Dockerfile // prod docker file
├── Dockerfile.local // optional docker file for local
├── Readme.md
├── package.json
├── node_modules
├── .gitignore
├── .dockerignore
├── .ecosystem.config.js // pm2 configuration
├── public // static public dir
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── tests // test suite
│   └── app.spec.js
└── src
│    ├── controllers
│    │   ├── admin.js
│    │   └── index.js
│    ├── models
│    │   ├── User.js
│    │   └── index.js // model builder, reads through dir and generates list of outputs
│    ├── config
│    │   └── index.js // main config, loads from env and exports final configs
│    ├── services
│    │   └── email.js
│    ├── utils
│    │   └── createController.js // utility to require and make controllers.
│    ├── views // ejs views
│    │   └── index.ejs
│    ├── container.js // container, imports all dependencies and exports a container.
│    ├── router.js // Main router, creates controllers and connects to express router
│    └── server.js // express js app.
```

# API Documentation

Swagger and `/health` endpoints are configured in `controller/index.js`.
