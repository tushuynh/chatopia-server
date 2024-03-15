source "$(pwd -P)/.env"

scp -r package*.json .env ./dist dockerfile docker-compose.yml $SERVER_USER@$SERVER_HOST:$SERVER_DEPLOY_PATH
scp -r ./nginx/default $SERVER_USER@$SERVER_HOST:$SERVER_NGINX_CONFIG