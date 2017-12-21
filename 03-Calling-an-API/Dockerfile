FROM node:8.7-alpine

# install git
RUN apk --update add \
	git openssl \
	&& rm /var/cache/apk/*

WORKDIR /home/app

ADD package.json /home/app
RUN npm install
ADD . /home/app

CMD ["npm", "start"]

EXPOSE 8080
