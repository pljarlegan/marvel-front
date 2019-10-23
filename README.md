# marvel-apollo-demo FRONT

Provide SPA DEMO React for Marvel api

## How to use it
- edit docker-compose.yml file > set GRAPHQL_ENDPOINT
- `docker-compose up -d`

## build prod image
- `yarn build-docker`

## How to use it (dev)
### in local
- `yarn`
- configure graphql endpoint in file (env-config.js)[public/env-config.js] 
- `yarn start`
- `yarn test` or `yarn coverage`


### with docker-compose
- `yarn`
- configure graphql endpoint in file (docker-compose.dev)[docker-compose.dev] 
- `dc -f docker-compose.dev down && dc -f docker-compose.dev up -d && dc -f docker-compose.dev logs -f`

- `dc -f docker-compose.dev exec ihm /bin/sh -c "cd /var/www && npm run test"` or `dc -f docker-compose.dev exec ihm /bin/sh -c "cd /var/www && npm run coverage"`
