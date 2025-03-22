FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production && \
    npm ls jsonwebtoken bcryptjs express sequelize pg dotenv express-validator express-openapi-validator yamljs

COPY . .

RUN node -c index.js

EXPOSE 3000

CMD ["node", "index.js"] 