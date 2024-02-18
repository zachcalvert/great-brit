FROM node:18.16.0-alpine as build

WORKDIR /app/client
COPY ./client/package.json ./
COPY ./client/package-lock.json ./
RUN npm ci
COPY ./client/ ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/client/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]