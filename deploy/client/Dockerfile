FROM node:18.16.0-alpine as build

WORKDIR /app
COPY ../../client/package*.json ./
RUN npm ci --silent
COPY ../../client. .
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]