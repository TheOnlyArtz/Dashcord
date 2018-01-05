const express = require('express');
const querystring = require('querystring')

const config = require('../config.json');
const DB = require('../Database/Manager.js');

const {post, get} = require('unirest');
const {clientID, scopes, redirect_uri, clientSecret} = config;

const Router = new express.Router();
const Manager = new DB;

Router.get('/', function(req, res) {
  const authURI = `https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&scope=${scopes.join('%20')}&permissions=${0}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code`
  res.send(`<a href="${authURI}">Link your discord account</a>`);
});

Router.get('/oauth/redirect', async function(req, res) {
  const requestPayload = {
    redirect_uri,
    client_id: clientID,
    grant_type: "authorization_code",
    client_secret: clientSecret,
    code: req.query.code,
  }


    post("https://discordapp.com/api/oauth2/token").query(requestPayload)
      .headers({
        "Content-Type": 'application/x-www-form-urlencoded',
        "User-Agent": 'DiscordBot'
        })
      .end(function (response) {
        const {access_token, refresh_token, expires_in} = response.body;
        get("https://discordapp.com/api/users/@me").headers({'Authorization': `Bearer ${access_token}`}).end(function(user) {
          get("https://discordapp.com/api/users/@me/guilds").headers({'Authorization': `Bearer ${access_token}`}).end(function(guilds) {
            req.session.auth = response['body'];
            req.session.user = user['body'];
            req.session.user.guilds = guilds['body'];
            res.redirect('/dashboard');
          })
        })
      });
});

Router.get('/dashboard', function(req, res) {
  if (!req.session.user) {
    return res.redirect('/')
  }

  res.set(200).send({user: req.session.user, auth: req.session.auth});
});

Router.get('*', function(req, res) {
  res.set(404).send({message: "Not found!"})
})

module.exports = Router;
