from urllib import parse

from flask import Flask, session, json
from flask_session import Session

app = Flask(__name__)
with open('config.json') as json_file:
    data = json.load(json_file)

@app.route("/")
def init():
    authLink = "https://discordapp.com/api/oauth2/authorize?client_id={c_id}&scope={scopes}&permissions=0&redirect_uri={redirect_uri}&response_type=code".format(
        c_id=str(data['client_id']),
        scopes=str('%20'.join(data['scopes'])),
        redirect_uri=str(parse.quote(data['redirect_uri'], safe='~()*!.\''))
        )

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, debug=True)
