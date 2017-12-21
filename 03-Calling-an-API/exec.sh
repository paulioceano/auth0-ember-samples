#!/usr/bin/env bash
docker build -t auth0-ember-03-calling-an-api .
docker run -p 3000:3000 -it auth0-ember-03-calling-an-api
