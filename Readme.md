# Node Boiler Plate for sequelize
 
nodejs boilerplate with sequelize for api development

# Technologies:

- Node.js & Express.js with ejs
- Mysql & Sequilize

# Architecture

Read about the architecture [here](./architecture.md)

# Getting Started

## Local Development with Docker

Ensure docker and docker-compose are installed, then run:

```bash
cp .env.example .env
# Edit credentials in .env
docker-compose up
```

## Local Development without Docker

```bash
cp .env.example .env
# Edit credentials in .env
npm install
npm start
```

## Deployment with PM2

- `pm2 start`

# Coding standards

- Prettier
- Eslint
