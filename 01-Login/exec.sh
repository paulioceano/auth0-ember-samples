#!/usr/bin/env bash
docker build -t auth0-ember-01-login .
docker run -p 4200:4200 -it auth0-ember-01-login
