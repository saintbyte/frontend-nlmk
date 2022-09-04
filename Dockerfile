FROM mhart/alpine-node:slim-16
EXPOSE 8080
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY src/package.json ./
COPY src/package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
CMD ["npm", "start"]