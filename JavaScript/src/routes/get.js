const express = require('express');
const querystring = require('querystring')
const Router = new express.Router();

const config = require('../config.json');
const {post, get} = require('snekfetch');
const {clientID, scopes, redirect_uri, clientSecret} = config;

Router.get('/', function(req, res) {
  const authURI = `https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&scope=${scopes.join('%20')}&permissions=${0}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code}`
  res.send(`<a href="${authURI}">Link your discord account</a>`)
});

Router.get('/oauth/redirect', async function(req, res) {
  const requestPayload = {
    redirect_uri,
    client_id: clientID,
    grant_type: "authorization_code",
    client_secret: clientSecret,
    code: req.query.code,
  }

    try {
      const exchangeResponse = await post("https://discordapp.com/api/oauth2/token")
                                      .send(querystring.stringify(requestPayload))
    } catch (e) {
      console.error(e.body);
    }
});

Router.get('*', function(req, res) {
  res.header(404)
  res.send("404 not found")
})

module.exports = Router;
