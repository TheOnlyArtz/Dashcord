const express = require('express');
const querystring = require('querystring')

const config = require('../config.json');
const DB = require('../Database/Manager.js');

const {post, get} = require('unirest');
const {clientID, scopes, redirect_uri, clientSecret} = config;

const Router = new express.Router();
const Manager = new DB;

console.log(Manager);
Router.get('/', function(req, res) {
  const authURI = `https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&scope=${scopes.join('%20')}&permissions=${0}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code}`
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
      .end(function (res) {

        if (res['error']) {
          return;
        } else {
          res.cookie("logged", true)
        }


        });
});

Router.get('*', function(req, res) {
  res.header(404)
  res.send("404 not found")
})

module.exports = Router;
