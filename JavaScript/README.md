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
