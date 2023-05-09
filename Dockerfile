FROM node:16-alpine
WORKDIR /app

#Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
RUN npm install -g ts-node

# If you are building your code for production
# RUN npm ci --omit=dev

#App source code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
