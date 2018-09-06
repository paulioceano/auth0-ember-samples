FROM node:8.7-alpine

# install git
RUN apk --update add \
	git openssl \
	&& rm /var/cache/apk/*

RUN apk --no-cache add git

WORKDIR /home/app

ADD package.json /home/app
RUN npm install
ADD . /home/app

CMD ["npm", "start"]

EXPOSE 3000
