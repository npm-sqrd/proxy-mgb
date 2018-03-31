FROM node:carbon

RUN mkdir /ss_proxy

WORKDIR /ss_ss_proxy

ADD package.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]