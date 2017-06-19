/*jshint node:true*/
const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  console.error('Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file');
}

module.exports = function(app) {
  const message = {
    id: 1,
    type: 'message',
    attributes: {
      body: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
    },
  };

  router.get('/messages', function(req, res) {
    res.send({
      data: [message]
    });
  });

  const audience = process.env.AUTH0_AUDIENCE;
  const domain = process.env.AUTH0_DOMAIN;

  const checkScopes = jwtAuthz([ 'read:messages' ]);

  const checkJwt = jwt({
    issuer: `https://${domain}/`,
    audience,
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${domain}/.well-known/jwks.json`
    }),
    algorithms: ['RS256'],
  });

  app.use('/api', checkJwt, checkScopes, router);
};
