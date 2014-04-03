##Quickly push messages to an Iron Queue through socket.io

- Clone or Fork the repo
- Visit http://hud.iron.io
- Create a project (or use an existing one) and download the iron.json


###localhost
- Uncomment line 29 and comment out line 30 of 'public/index.html'
- Run:
```sh
$ IRON_TOKEN="<iron_token>" IRON_PROJECT_ID="<project_id>" node server.js
```
- Open localhost:8080
- Fill in a payload
- Visit you queue on http://hud.iron.io to see loaded message


###Deploy to Heroku
- Create an app on http://heroku.com or via cli
- Edit line 30 of 'public/index.html' to your app name
- Commit the change
- Run:
```sh
$ git remote add heroku <url_or_ssh>

$ git push heroku master

$ heroku config:set IRON_TOKEN="<token>" IRON_PROJECT_ID="<project_id>"

$ heroku labs:enable websockets

$ heroku open
```

Open the console in your browser to see the message ids once they've been posted.
