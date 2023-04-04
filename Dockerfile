FROM node:16-alpine
WORKDIR /app
COPY .env /app/
RUN yarn add reflect-metadata && yarn cache clean --all
EXPOSE 3000
CMD ["yarn", "run", "start"]