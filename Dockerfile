FROM node:14.16.1-alpine3.13 AS npmmetje

WORKDIR /usr/src/app

# RUN npm install -g webpack webpack-cli

COPY package.json ./
COPY package-lock.json ./

RUN npm install
# RUN npm ci --only=production

COPY . ./
RUN npm run build

CMD ["npm", "run", "start"]
