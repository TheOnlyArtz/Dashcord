### Dependencies
```js
{
  "body-parser": "^1.18.2",
  "cookie-parser": "^1.4.3",
  "express": "^4.16.2", // The framework for the dashboard
  "express-mysql-session": "^1.2.3", // MySQL session store
  "express-session": "^1.15.6", // Sessions
  "helmet": "^3.9.0", // Make the backend more "secure"
  "querystring": "^0.2.0", // Make a querystring out of an object
  "unirest": "^0.5.1", // HTTP request API
}
```

##### Requirements
Node: 8.x.x

### config.json.example
As you can see there's a file called `config.json.example`<br>
Lets go by the props one by one<br>
`scopes:` This is an Array of OAuth scopes [Available scopes](https://discordapp.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes)<br>
`dash_secret:` This is the cookie secret (Don't show it to anybody!!!) this secret should be cryptographically string! can be generated using<br> [uuid](https://www.npmjs.com/package/uuid)<br>
`redirect_uri:` Where will the auth redirect you to<br>
`clientSecret:` You're [Discord](https://discordapp.com) app client secret<br>
`clientID:` You're [Discord](https://discordapp.com) app client ID

### How does it work?
So first of all we are monitoring the user to Discord's Authorization login so we can get the access_token out of the user to access other types of data,\n
Such as: `Which guilds the user is connected to`, `Overall user information`
After we've got the access_token, we are making some HTTP requests to take the: `Guilds`, `User information`\n
```js
req.session.auth = response['body'];
req.session.user = user['body'];
req.session.user.guilds = guilds['body'];
```
After we got all of the data we needed, we store this information inside our MySQL database along to the cookie/session (to keep the user be logged)\n
Then we can just monitor the user to dashboard which will showcase him his data.
**Of course ou can change and design the dashboard to your needs!!!** This is just an example of how to get data!
Happy "dashcording" everyone! *(Cringe as f_ck moment)*
