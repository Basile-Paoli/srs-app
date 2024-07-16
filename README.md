# SRS App
Une application web qui vous aide à apprendre des trucs

## Setup locally

Running the app locally requires access to a Postgres database and google OAuth.

>env.development.local
```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXTAUTH_SECRET = {whatever}
NEXTAUTH_URL = http://localhost:3000
POSTGRES_DATABASE
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_URL
POSTGRES_USER

```
### Google Oauth
[Configuration here](https://console.developers.google.com/apis/credentials)

Don't forget to set http://localhost:3000/api/auth/callback/google as a callback URL

### Postgres DB
The required table scheme is documented in `db-archi.md`. Note that the tables required for authentication to work properly(including users) will be created automatically.

## Run locally
Just use npm install + run dev :)