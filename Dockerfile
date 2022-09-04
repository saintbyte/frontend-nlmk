FROM mhart/alpine-node:slim-16
EXPOSE 3000
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY src/frontend-nlmk/ ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
CMD ["npm", "start"]